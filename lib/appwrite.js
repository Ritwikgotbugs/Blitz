import { Avatars, Client, Databases, ID } from 'react-native-appwrite';
import { Account } from 'react-native-appwrite';
import { Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.expo.aora',
    projectId: '665ebf65001f3bdb850a',
    databaseId: '665ec834002731796ef0',
    userCollectionId: '665ec9460003ae99df79',
    videosCollectionId: '665ec94c00255c3edcb9',
    storageID: '665ecbe10019ac02da5f'
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars= new Avatars(client);
const databases= new Databases(client);
// Register User
export async function createUser(email, password, username) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await LoginUser(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

//Login User

export const LoginUser = async (email,password) => {
    try {
        const session = await account.createEmailPasswordSession(email,password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}


//Get posts
export const getPosts =  async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}