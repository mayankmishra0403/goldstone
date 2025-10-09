import { Client, Databases } from 'node-appwrite';

// Admin client with API key (server-side only)
const adminClient = new Client();

adminClient
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!); // Admin API key

export const adminDatabases = new Databases(adminClient);