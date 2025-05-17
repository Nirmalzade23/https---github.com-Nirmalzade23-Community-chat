import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo";


const createToken = (): TokenCache =>{
    return{
        getToken: async (key:string) =>{
            try{
               const item = await SecureStore.getItemAsync(key);
               if (item){
                console.log(`${key} we use\n`);
               }else{
                console.log("no value store under key:" + key);
               }
               return item;
            }catch(error){
                console.log("secure store get item reeor:" , error);
                await SecureStore.deleteItemAsync(key);
                return null;
            }
        },
        saveToken :(key:string, token: string)=> {
            return SecureStore.setItemAsync(key, token);
        },
    };
};

// SecureStore is not supported on the web

export const tokenCache =
Platform.OS !== "web"? createToken (): undefined;