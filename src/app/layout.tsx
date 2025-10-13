import type { Metadata } from "next";
import "./globals.css";
import HeaderWrapper from "@/components/organisms/HeaderWrapper";

import { getServerSession } from "next-auth/next";
import { AuthProvider } from "@/contexts/auth";
import authOptions from "../../auth.config";
import SignInRedirect from "./SignInRedirect";

export const metadata: Metadata = {
    title: "Back Office SpareParts",
    description:
        "Application back office pour administrer les pièces détachées chez Bénéteau",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
            <body>
                <AuthProvider session={session}>
                    <HeaderWrapper />
                    {process.env.NODE_ENV!=='development' && !session && <SignInRedirect />}
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
