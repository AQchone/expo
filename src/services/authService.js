import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { useAuthStore } from "./authStore";

WebBrowser.maybeCompleteAuthSession();

const useStravaAuth = () => {
  const { setTokens } = useAuthStore();

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: process.env.STRAVA_CLIENT_ID,
      scopes: ["activity:read_all"],
      redirectUri: AuthSession.makeRedirectUri({ scheme: "stravatracker" }),
    },
    {
      authorizationEndpoint: "https://www.strava.com/oauth/authorize",
      tokenEndpoint: "https://www.strava.com/oauth/token",
      revocationEndpoint: "https://www.strava.com/oauth/deauthorize",
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setTokens(
        authentication.accessToken,
        authentication.refreshToken,
        authentication.additionalParameters.athlete
      );
    }
  }, [response]);

  return { promptAsync, request };
};

export default useStravaAuth;
