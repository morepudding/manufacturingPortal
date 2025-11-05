import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "@/shared/components/organisms/HeaderWrapper";

// ⚠️ AUTHENTIFICATION DÉSACTIVÉE - Décommenter pour réactiver
// import { getServerSession } from "next-auth/next";
// import { AuthProvider } from "@/contexts/auth";
// import authOptions from "../../auth.config";

export const metadata: Metadata = {
    title: "Manufacturing Portal - Bénéteau",
    description:
        "Plateforme de gestion des outils de production pour Bénéteau",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <HeaderWrapper />
                {children}
            </body>
        </html>
    );
}
