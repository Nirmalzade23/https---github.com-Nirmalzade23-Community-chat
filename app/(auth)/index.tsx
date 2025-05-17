
import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import { isClerkAPIResponseError, useSignIn, useSSO } from "@clerk/clerk-expo";
import { ClerkAPIError } from "@clerk/types";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

WebBrowser.maybeCompleteAuthSession();


export default function Index() {

  const {startSSOFlow} = useSSO();
  const {setActive,signIn} = useSignIn();
  const  [errors,setErrors] = useState<ClerkAPIError[]>([]);

  const handleSignInWithGoogle = async () => {
    try{
      const {createdSessionId, setActive} = await startSSOFlow({
        strategy:"oauth_google",
        redirectUrl: AuthSession.makeRedirectUri()
      });

      if (createdSessionId) {
        setActive!({session: createdSessionId});
      }else{
        // there is no session
      }
    }catch (error){
      if(isClerkAPIResponseError(error)){
        setErrors((error.errors));
      }else{
        console.error(error);
      }
    }
  }


  const handleSignInWithPasskey = async () => {
  try{
      const signInAttempt = await signIn?.authenticateWithPasskey({
        flow: "discoverable"
      });

      if (signInAttempt?.status === "complete"){
        await setActive!({session: signInAttempt.createdSessionId});
      }else{

      }
}catch (error){
  if(isClerkAPIResponseError(error)){
    setErrors((error.errors));
  }else{
    console.error(error);
  }
}
  };

  
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
        <View style={{
          flex:1,
          alignItems:"center",
          justifyContent:"center",
          padding:16
        }}>

      <View style={{ flex:0.1}}/>
      <View style={{gap:20, alignItems:"center"}}>
      <Image
        source={require("@/assets/images/logo1.png")}
        style={{width: 100, height: 100}}
        resizeMode="contain"
      />
        <Text style={{fontSize: 32,
           fontWeight: "bold"}}>
            Community chat</Text>
        <Text>Stay connected with community</Text>

          {errors.map((error) =>(
            <Text key={error.code} style={{color:"red"}}>
              (error.message)</Text>
          ))}

        </View>

          <View style={{ flex:1}}/>
        <Button style={{marginBottom:20}}
        onPress={handleSignInWithPasskey}
        >Signin with passkey</Button>


        <Button style={{gap:10,
           alignItems:"center",
            flexDirection:"row",
            justifyContent:"center",
            marginBottom:20,
            }}>
          <Image 
          source={require("@/assets/images/icon-google.png")}
          style={{width:20, height:20}}
          />
          <Text style={{color:"black", fontWeight:"500"}}
          onPress={handleSignInWithGoogle}
          > continue with google</Text>
        </Button>
        </View>
    </SafeAreaView>
  );
}
