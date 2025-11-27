// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import { NextResponse } from "next/server";
import type { NextAuthOptions } from "next-auth";

// Groupe Azure AD autorisé à accéder à l'application
const ALLOWED_GROUP_ID = process.env.AZURE_AD_ALLOWED_GROUP_ID; // ManufPortal_PRD_Users

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
      // Récupérer les groupes de l'utilisateur
      profile(profile) {
        return {
          id: profile.sub || profile.oid,
          name: profile.name,
          email: profile.email || profile.preferred_username,
          groups: profile.groups || [],
        };
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
      // Stocker les groupes de l'utilisateur
      if (profile) {
        token.groups = (profile as any).groups || [];
      }
      return token;
    },
    async session({ session, token }) {
      // ajouter des champs session.user pour le client
      if (token && session.user) {
        (session.user as any).accessToken = (token as any).accessToken;
        (session.user as any).idToken = (token as any).idToken;
        (session.user as any).groups = (token as any).groups || [];
      }
      return session;
    },
    // Vérifier si l'utilisateur appartient au groupe autorisé (si configuré)
    async signIn({ user, account, profile }) {
      // Si aucun groupe requis n'est configuré, autoriser tous les utilisateurs
      if (!ALLOWED_GROUP_ID) {
        return true;
      }
      
      // Vérifier l'appartenance au groupe
      const userGroups = (profile as any)?.groups || [];
      const isAllowed = userGroups.includes(ALLOWED_GROUP_ID);
      
      if (!isAllowed) {
        console.log(`❌ Accès refusé pour ${(profile as any)?.email}: non membre de ManufPortal_PRD_Users`);
        return false;
      }
      
      console.log(`✅ Accès autorisé pour ${(profile as any)?.email}: membre de ManufPortal_PRD_Users`);
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
