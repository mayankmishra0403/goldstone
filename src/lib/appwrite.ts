import { Client, Databases, Account } from 'appwrite';

// 1. Initialize the Appwrite Client
const client = new Client();

// 2. Configure the Client
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// 3. Export the services you need
export const account = new Account(client);
export const databases = new Databases(client);

// Export the client for other uses if needed
export default client;
