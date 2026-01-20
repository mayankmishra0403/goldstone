import { Client, Databases, Account } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
    throw new Error(
        'Missing Appwrite client env vars. Set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID.'
    );
}

// 1. Initialize the Appwrite Client
const client = new Client();

// 2. Configure the Client
client.setEndpoint(endpoint).setProject(projectId);

// 3. Export the services you need
export const account = new Account(client);
export const databases = new Databases(client);

// Export the client for other uses if needed
export default client;
