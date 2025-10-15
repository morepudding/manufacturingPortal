import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "@/shared/components/organisms/HeaderWrapper";

import { getServerSession } from "next-auth/next";
import { AuthProvider } from "@/contexts/auth";
import authOptions from "../../auth.config";
// import SignInRedirect from "./SignInRedirect"; // DÉSACTIVÉ TEMPORAIREMENT

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
    // Désactiver l'authentification si la variable d'environnement est définie
    const disableAuth = process.env.NEXT_PUBLIC_DISABLE_AUTH === "true";
    
    const session = disableAuth ? null : await getServerSession(authOptions);

    return (
        <html lang="en">
            <body>
                <AuthProvider session={session}>
                    <HeaderWrapper />
                    {/* Authentification désactivée pour les tests */}
                    {/* {process.env.NODE_ENV!=='development' && !session && <SignInRedirect />} */}
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
