import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.oceeboy.SharriesSignatureApp",
  projectId: "669bbe7d003c4102aeaf",
  databaseId: "669bbf57000596ba3ccc",
  userCollectionId: "669bbf6f0015d618a25c",
  ordersCollectionId: "669bd2d2002497b2f6d7",
};

const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, name) {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Account creation failed");

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        name: name,
      }
    );
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Sign In
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw new Error("Account not found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0)
      throw new Error("User not found");

    return currentUser.documents[0];
  } catch (error) {
    console.log(error); // Debugging purpose
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Move to Ordered Items
export async function moveToOrderedItems(
  cart,
  setOrderedItems,
  clearCart,
  email
) {
  try {
    const newOrderedItems = cart.map((item) => ({
      id: item.unique_id.toString(),
      name: item.name,
      quantity: item.quantity.toString(),
      price: item.current_price[0].NGN[0].toString(),
      total: item.total.toString(),
      image: item.photos[0].url,
    }));

    const payload = {
      orderedItems: newOrderedItems.map((item) => JSON.stringify(item)),
      orderDate: new Date().toISOString(),
      email: email,
    };

    console.log("Payload to be sent to Appwrite: ", payload); // Debugging purpose

    const response = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      ID.unique(),
      payload
    );
    console.log("Ordered items saved to Appwrite: ", response);

    // Update the state and clear the cart
    setOrderedItems((prevOrderedItems) => [...prevOrderedItems, ...cart]);
    clearCart();
  } catch (error) {
    console.log("Error saving ordered items: ", error); // Error handling
  }
}

// getting all data from apprite that just got posted there by user

export const fetchOrderedItems = async (setOrderedItems, user, email) => {
  if (!user) {
    throw new Error("User is not authenticated.");
  }
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.ordersCollectionId,
      [Query.equal("email", email)]
    );
    console.log(response);
    const fetchedOrderedItems = response.documents.map((doc) => ({
      ...doc,
      orderedItems: doc.orderedItems.map((item) => JSON.parse(item)),
    }));

    setOrderedItems(fetchedOrderedItems);
    console.log("Fetched ordered items: ", fetchedOrderedItems);
  } catch (error) {
    console.error("Error fetching ordered items from Appwrite: ", error);
  }
};
