
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.expo.aora',
    projectId: '665ebf65001f3bdb850a',
    databaseId: '665ec834002731796ef0',
    userCollectionId: '665ec9460003ae99df79',
    videosCollectionId: '665ec94c00255c3edcb9',
    storageId: '665ecbe10019ac02da5f'
}

import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) 
    .setProject(appwriteConfig.projectId) 
    .setPlatform(appwriteConfig.platform) 
;

const account = new Account(client);
const avatars= new Avatars(client);
const databases= new Databases(client);
const storage= new Storage(client);
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
      appwriteConfig.videosCollectionId,
      [Query.orderDesc('$createdAt')]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export const getLatest =  async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc('$createdAt',Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const searchPosts =  async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.search('title',query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}
export const getUserPosts =  async (userId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.equal('creator',userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}




export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }

};

// Delete Post
export async function deletePost(postId) {
  try {
    const deletedPost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      postId
    );
    return deletedPost;
  } catch (error) {
    throw new Error(error);
  }
}

// Change Avatar
export async function changeAvatar(file) {
  try {
    const avatarUrl = await uploadFile(file, "image");
    console.log(getCurrentUser().$id)
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      getCurrentUser().$id,
      {
        avatar: avatarUrl,
      }
    );

    return updatedUser;
  } catch (error) {
    throw new Error(error);
  }
}