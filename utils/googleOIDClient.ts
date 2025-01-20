import {
  GoogleSignin,
  SignInResponse,
} from "@react-native-google-signin/google-signin";

export class GoogleOIDClient {
  constructor() {
    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/userinfo.email"],
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }

  async signIn(): Promise<SignInResponse> {
    await GoogleSignin.hasPlayServices();
    return GoogleSignin.signIn();
  }
}
