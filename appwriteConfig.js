import { Account, Client, Databases, ID, Query } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6950b3e20007a9e537d5"); // your Appwrite project ID

const account = new Account(client);
const databases = new Databases(client);

export { account, client, databases, ID, Query };

