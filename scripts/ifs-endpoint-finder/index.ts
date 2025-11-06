#!/usr/bin/env ts-node
import { readdir, readFile, stat, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import args from "args";

type Section = {
  filePath: string;
  heading: string;
  content: string;
};

type ScoredSection = Section & {
  score: number;
};

const DEFAULT_ROOTS = [
  "docs/api",
  "docs/tools",
  "src/tools",
  "src/lib",
];

const SKIP_DIRECTORIES = new Set([
  "node_modules",
  ".git",
  ".next",
  ".turbo",
  "out",
  "dist",
  ".cache",
]);

const ALLOWED_EXTENSIONS = new Set([".md", ".mdx"]);

type OutputFormat = "console" | "markdown";

const flags = args
  .option("query", "Search keywords (default: use remaining CLI args)", "")
  .option("limit", "Number of results to show (default: 8)", 8)
  .option(
    "roots",
    "Comma separated list of relative directories to scan",
    DEFAULT_ROOTS.join(","),
  )
  .option(
    "showFiles",
    "Print the files scanned (useful for debugging configuration)",
    false,
  )
  .option(
    "output",
    "Optional path for a Markdown report (directories created automatically)",
    "",
  )
  .option(
    "title",
    "Optional title for the generated Markdown report",
    "",
  )
  .option(
    "format",
    "How to present console output: console | markdown",
    "console",
  )
  .parse(process.argv);

const positionalQuery = Array.isArray(flags._)
  ? (flags._ as string[]).join(" ").trim()
  : "";
const explicitQuery =
  typeof flags.query === "string" ? flags.query.trim() : "";
const query = explicitQuery || positionalQuery;

if (!query) {
  console.error("❌ Missing query. Provide it via --query or positional args.");
  process.exit(1);
}

const parsedLimit = Number(flags.limit);
const limit = Number.isFinite(parsedLimit) && parsedLimit > 0 ? parsedLimit : 8;

const roots = String(flags.roots || "")
  .split(",")
  .map((dir) => dir.trim())
  .filter(Boolean);

const tokens = tokenize(query);
const queryLower = query.toLowerCase();
const formatFlag = String(flags.format || "console").toLowerCase();
const format: OutputFormat =
  formatFlag === "markdown" ? "markdown" : "console";
const outputPath =
  typeof flags.output === "string" ? flags.output.trim() : "";
const reportTitle =
  typeof flags.title === "string" && flags.title.trim().length
    ? flags.title.trim()
    : `IFS API lookup – ${query}`;

async function main() {
  const files = (
    await Promise.all(
      roots.map(async (root) => {
        const absRoot = path.resolve(process.cwd(), root);
        try {
          const stats = await stat(absRoot);
          if (!stats.isDirectory()) {
            return [];
          }
        } catch {
          return [];
        }
        return collectMarkdownFiles(absRoot);
      }),
    )
  ).flat();

  if (flags.showFiles) {
    console.log("📚 Scanning files:");
    files.forEach((file) => console.log(` - ${file}`));
    console.log();
  }

  const sections = (
    await Promise.all(
      files.map(async (filePath) => {
        try {
          const content = await readFile(filePath, "utf-8");
          return extractSections(filePath, content);
        } catch {
          return [];
        }
      }),
    )
  ).flat();

  const scored = sections
    .map((section) => ({
      ...section,
      score: scoreSection(section, tokens, queryLower),
    }))
    .filter((section) => section.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (!scored.length) {
    console.log(`🤷 No matches found for "${query}".`);
    console.log("Try using different keywords or broaden the scan roots.");
    return;
  }

  if (format === "markdown") {
    printMarkdown(scored, query, reportTitle);
  } else {
    printConsole(scored, query);
  }

  if (outputPath) {
    await writeMarkdownReport(scored, reportTitle, outputPath);
    console.log(`📝 Markdown report saved to ${outputPath}`);
  }
}

async function collectMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRECTORIES.has(entry.name)) {
        continue;
      }
      files.push(...(await collectMarkdownFiles(path.join(dir, entry.name))));
    } else if (entry.isFile()) {
      const extension = path.extname(entry.name).toLowerCase();
      if (ALLOWED_EXTENSIONS.has(extension)) {
        files.push(path.join(dir, entry.name));
      }
    }
  }

  return files;
}

function extractSections(filePath: string, content: string): Section[] {
  const lines = content.split(/\r?\n/);
  const sections: Section[] = [];

  let heading = deriveDefaultHeading(filePath);
  let buffer: string[] = [];

  const pushSection = () => {
    const text = buffer.join("\n").trim();
    if (text) {
      sections.push({
        filePath,
        heading,
        content: text,
      });
    }
  };

  for (const line of lines) {
    const headingMatch = line.match(/^#{1,6}\s+(.*)$/);
    if (headingMatch) {
      pushSection();
      heading = headingMatch[1].trim();
      buffer = [];
    } else {
      buffer.push(line);
    }
  }

  pushSection();
  return sections;
}

function deriveDefaultHeading(filePath: string): string {
  const base = path.basename(filePath, path.extname(filePath));
  return base.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function tokenize(phrase: string): string[] {
  return phrase
    .toLowerCase()
    .split(/[\s,;:/]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function scoreSection(
  section: Section,
  tokens: string[],
  queryLower: string,
): number {
  const heading = section.heading.toLowerCase();
  const body = section.content.toLowerCase();
  const filePath = section.filePath.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    if (!token) continue;
    if (heading.includes(token)) {
      score += 6;
    }
    if (filePath.includes(token)) {
      score += 2;
    }
    score += occurrences(body, token) * 2;
  }

  if (heading.includes(queryLower)) {
    score += 10;
  }

  if (body.includes(queryLower)) {
    score += 8;
  }

  // prefer sections belonging to API docs directories
  if (filePath.includes("/api/") || filePath.includes("endpoint")) {
    score += 3;
  }

  return score;
}

function occurrences(haystack: string, needle: string): number {
  if (!needle.length) return 0;
  let count = 0;
  let startIndex = 0;

  while (true) {
    const index = haystack.indexOf(needle, startIndex);
    if (index === -1) break;
    count += 1;
    startIndex = index + needle.length;
  }

  return count;
}

function buildSnippet(text: string, tokens: string[], limit = 220): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) {
    return normalized;
  }

  const lower = normalized.toLowerCase();
  let bestIndex = -1;
  for (const token of tokens) {
    const index = lower.indexOf(token);
    if (index !== -1) {
      bestIndex = index;
      break;
    }
  }

  if (bestIndex === -1) {
    return `${normalized.slice(0, limit - 3)}...`;
  }

  const halfLimit = Math.floor(limit / 2);
  const start = Math.max(0, bestIndex - halfLimit);
  const end = Math.min(normalized.length, bestIndex + halfLimit);
  const prefix = start > 0 ? "..." : "";
  const suffix = end < normalized.length ? "..." : "";
  return `${prefix}${normalized.slice(start, end)}${suffix}`;
}

function printConsole(results: ScoredSection[], query: string) {
  console.log(`🔎 Top ${results.length} matches for "${query}":\n`);

  results.forEach((result, index) => {
    const relativePath = path.relative(process.cwd(), result.filePath);
    console.log(
      `${index + 1}. ${result.heading || "(no heading)"}  —  ${result.score.toFixed(2)}`,
    );
    console.log(`   File: ${relativePath}`);
    console.log(
      `   Snippet: ${buildSnippet(result.content, tokens, 220).trim()}\n`,
    );
  });
}

function printMarkdown(results: ScoredSection[], query: string, title: string) {
  console.log(`# ${title}`);
  console.log();
  console.log(`**Recherche** : \`${query}\``);
  console.log();
  console.log(`Top ${results.length} correspondances :`);
  console.log();

  results.forEach((result, index) => {
    const relativePath = path.relative(process.cwd(), result.filePath);
    console.log(`### ${index + 1}. ${result.heading || "(sans titre)"}`);
    console.log(`- Score : ${result.score.toFixed(2)}`);
    console.log(`- Fichier : \`${relativePath}\``);
    console.log();
    console.log(`> ${buildSnippet(result.content, tokens, 240).trim()}`);
    console.log();
  });
}

async function writeMarkdownReport(
  results: ScoredSection[],
  title: string,
  output: string,
) {
  const lines: string[] = [];
  lines.push(`# ${title}`, "");
  lines.push(
    `> Rapport généré automatiquement pour analyser les endpoints liés à la recherche \`${query}\`.`,
    "",
  );
  lines.push(`Top ${results.length} correspondances :`, "");

  results.forEach((result, index) => {
    const relativePath = path.relative(process.cwd(), result.filePath);
    lines.push(`## ${index + 1}. ${result.heading || "(sans titre)"}`);
    lines.push(`- Score : ${result.score.toFixed(2)}`);
    lines.push(`- Fichier : \`${relativePath}\``);
    lines.push("");
    lines.push("```text");
    lines.push(buildSnippet(result.content, tokens, 600).trim());
    lines.push("```", "");
  });

  const absoluteOutput = path.resolve(process.cwd(), output);
  const dir = path.dirname(absoluteOutput);
  await mkdir(dir, { recursive: true });
  await writeFile(absoluteOutput, lines.join("\n"), "utf-8");
}

main().catch((error) => {
  console.error("Unexpected error while scanning IFS docs:", error);
  process.exit(1);
});
