import { Client, Databases } from 'node-appwrite';

// Safety: prevent accidental client-side import of admin SDK
if (typeof window !== 'undefined') {
    throw new Error('Admin Appwrite client must only be used on the server. Do not import this from client code.');
}

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (!endpoint || !projectId || !apiKey) {
    throw new Error(
        'Missing Appwrite admin env vars. Set NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID and APPWRITE_API_KEY in server environment.'
    );
}

// Admin client with API key (server-side only)
const adminClient = new Client();

adminClient.setEndpoint(endpoint).setProject(projectId).setKey(apiKey);

export const adminDatabases = new Databases(adminClient);