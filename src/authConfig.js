export const authConfig = {
  clientId: "fitness-app",

  authorizationEndpoint:
    "https://keycloak-deploy-st9e.onrender.com/realms/fitness-oauth2/protocol/openid-connect/auth",

  tokenEndpoint:
    "https://keycloak-deploy-st9e.onrender.com/realms/fitness-oauth2/protocol/openid-connect/token",

  redirectUri: import.meta.env.VITE_REDIRECT_URI,

  scope: "openid profile email",

  //  REQUIRED for Keycloak
  extraAuthParameters: {
    response_type: "code",
  },

  onRefreshTokenExpire: (event) => event.logIn(),
};