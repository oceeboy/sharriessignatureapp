import { Client, Account, Databases, Query, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6697f7ac0026a753c6c6");

const account = new Account(client);
const databases = new Databases(client);

export { account, databases, client, Query, ID }; // Export Query directly
