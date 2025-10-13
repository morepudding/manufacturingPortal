"use client";
import {
    useBoat,
    useModel,
    useOptionStructure,
    useSbom,
    useStructure,
} from "@/client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/atoms/Breadcrumb";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type pathType = {
    key: string;
    label: string;
    value: string;
    href: string;
    index: number;
};

function buildBreadcrumbs(pathTableInput: string[]): pathType[] {
    const pathsBreadcrumb: pathType[] = pathTableInput.map((path, index) => {
        if (index === 0 && index < pathTableInput.length) {
            return {
                key: index.toString(),
                label: "Home",
                value: "/",
                href: "/",
                index: index,
            };
        }
        return {
            key: index.toString(),
            label: path,
            value: path,
            href: pathTableInput.slice(0, index + 1).join("/"),
            index: index,
        };
    });
    return pathsBreadcrumb;
}

function buildIdIndex(pathTable: string[]) {
    const result = pathTable
        .map((path, index) => {
            switch (path) {
                case "models":
                    return { modelIndex: index + 1 };
                case "boats":
                    return { boatIndex: index + 1 };
                case "structures":
                    return { structureIndex: index + 1 };
                case "sbom":
                    return { sbomIndex: index + 1 };
                case "option":
                    return { optionIndex: index + 1 };
            }
        })
        .filter(Boolean);

    return result;
}

export default function DynamicBreadcrumb() {
    const pathname = usePathname();
    const pathTable = pathname.split("/");
    const urlIdIndex = buildIdIndex(pathTable);
    const urlIdIndexMerged = Object.assign({}, ...urlIdIndex);

    const modelId = pathTable[urlIdIndexMerged.modelIndex];
    const boatId = pathTable[urlIdIndexMerged.boatIndex];
    const structureId = pathTable[urlIdIndexMerged.structureIndex] ?? "";
    const sbomId = pathTable[urlIdIndexMerged.sbomIndex] ?? "";
    const optionId = pathTable[urlIdIndexMerged.optionIndex] ?? "";

    const pathsLength = pathTable.length;

    const [paths, setPaths] = useState(buildBreadcrumbs(pathTable));

    const { data: modelResult, isLoading: modelLoading } = useModel(
        parseInt(modelId),
    );

    const { data: boatResult, isLoading: boatLoading } = useBoat(
        parseInt(boatId),
    );

    const { data: structureResult, isLoading: structureLoading } = useStructure(
        parseInt(structureId),
    );

    const { data: sbomResult, isLoading: sbomLoading } = useSbom(
        parseInt(sbomId),
    );

    const { data: optionResult, isLoading: optionLoading } = useOptionStructure(
        parseInt(optionId),
    );

    const resourceUrlMap: Record<
        string,
        {
            label: string;
            baseHref: string;
            fetchLabel: string | null;
            id?: string | null;
            position: number;
        }
    > = {
        home: {
            label: "Home",
            baseHref: `/`,
            fetchLabel: null,
            id: null,
            position: 1,
        },
        models: {
            label: "Models",
            baseHref: `/models`,
            fetchLabel: modelResult?.modelName || null,
            id: modelId || null,
            position: 2,
        },
        boats: {
            label: "Boats",
            baseHref: `/models/${modelId}/boats`,
            fetchLabel: boatResult?.boatDescription || null,
            id: boatId || null,
            position: 3,
        },
        structures: {
            label: "Structures",
            baseHref: `/models/${modelId}/boats/${boatId}/structures`,
            fetchLabel: structureResult?.structureDescFr || null,
            id: structureId || null,
            position: 4,
        },
        option: {
            label: "Option",
            baseHref: `/models/${modelId}/boats/${boatId}/structures/${structureId}/option`,
            fetchLabel: optionResult?.structureDescFr || null,
            id: optionId || null,
            position: 6,
        },

        sbom: {
            label: "Sbom",
            baseHref: `/models/${modelId}/boats/${boatId}/structures/${structureId}/sbom`,
            fetchLabel: sbomResult?.componentPartDescriptionEn || null,
            id: sbomId || null,
            position: 7,
        },
    };

    useEffect(() => {
        setPaths(buildBreadcrumbs(pathname.split("/")));
    }, [pathname]);

    useEffect(() => {
        const newPathsWithData: pathType[] = [];

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const prevPath = paths[i - 1];

            if (prevPath) {
                const resourceUrlFind =
                    resourceUrlMap[path.value.toLocaleLowerCase()];

                if (resourceUrlFind) {
                    const newPathPart: pathType = {
                        key: resourceUrlFind.id ?? "0",
                        label: resourceUrlFind.fetchLabel
                            ? resourceUrlFind.fetchLabel
                            : resourceUrlFind.label,
                        value: resourceUrlFind.label,
                        href: resourceUrlFind.baseHref,
                        index: prevPath.index,
                    };
                    newPathsWithData.push(newPathPart);
                }
            } else if (path.index === 0) {
                newPathsWithData.push(path);
            }
        }

        setPaths(newPathsWithData);
    }, [modelResult, boatResult, structureResult, sbomResult, optionResult]);

    return (
        <>
            {modelLoading &&
                boatLoading &&
                structureLoading &&
                sbomLoading &&
                optionLoading && (
                    <>
                        <Breadcrumb>
                            <BreadcrumbItem></BreadcrumbItem>
                        </Breadcrumb>
                    </>
                )}
            {!modelLoading &&
                !boatLoading &&
                !structureLoading &&
                !sbomLoading &&
                !optionLoading && (
                    <>
                        <Breadcrumb className="mx-8">
                            <BreadcrumbList>
                                {paths.map((item) => (
                                    <React.Fragment key={item.value + item.key}>
                                        <BreadcrumbItem>
                                            <BreadcrumbLink
                                                href={item.href}
                                                onClick={() => setPaths([])}
                                            >
                                                {item.label}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {item.index <= pathsLength && (
                                            <BreadcrumbSeparator />
                                        )}
                                    </React.Fragment>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </>
                )}
        </>
    );
}
