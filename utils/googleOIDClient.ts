import {
  GoogleSignin,
  SignInResponse,
} from "@react-native-google-signin/google-signin";

export class GoogleOIDClient {
  constructor() {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/userinfo.email"],
      webClientId:
        "",
      offlineAccess: true,
    });
  }

  async signIn(): Promise<SignInResponse> {
    console.log("Signing in with Google from GoogleOIDClient");
    await GoogleSignin.hasPlayServices();
    console.log("Google Play Services are available");
    const userInfo = await GoogleSignin.signIn().catch((error) => {
      console.error("Error Signing on google", JSON.stringify(error));
      return error;
    });
    return userInfo;
  }
}
