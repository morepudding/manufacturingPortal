import AzureADProvider from "next-auth/providers/azure-ad";

export const authOptions = {
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID as string,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
            tenantId: process.env.AZURE_AD_TENANT_ID as string,
        }),

      
    ],
};

export default authOptions;
