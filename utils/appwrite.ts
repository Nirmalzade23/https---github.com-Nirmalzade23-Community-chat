import { Client, Databases } from "react-native-appwrite";

if (!process.env.EXPO_PUBLIC_APPWRITE_APP_ID) {
  throw new Error("EXPO_PUBLIC_APPWRITE_APP_ID is not set");
}

/**
 * Create a db in appwrite and add your collections
 */
const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_APP_ID,
  platform: "com.anonymous.communitychat",
  db:"",
  col: {
    chatRooms: "682859010032f371609d",
    messages: "682858e3002a0bf41896",
   
  },
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const database = new Databases(client);
export { database, appwriteConfig, client };