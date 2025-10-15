// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import { NextResponse } from "next/server";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID || "",
      authorization: {
        params: {
          scope: process.env.AZURE_AD_SCOPE || "openid profile email",
        },
      },
    }),
  ],
  // session strategy: "jwt"
  session: { strategy: "jwt" },
  jwt: {
    // secret is already in NEXTAUTH_SECRET
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // si nouvel account, on peut stocker token d'accès
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      // tu peux mapper d'autres propriétés depuis `profile`
      return token;
    },
    async session({ session, token }) {
      // ajouter des champs session.user pour le client
      if (token && session.user) {
        (session.user as any).accessToken = (token as any).accessToken;
        (session.user as any).idToken = (token as any).idToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
