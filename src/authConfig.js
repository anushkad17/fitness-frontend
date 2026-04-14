export const authConfig = {
   clientId: "oauth2-pkce-client",
  authorizationEndpoint: "/realms/fitness-oauth2/protocol/openid-connect/auth",
  tokenEndpoint: "/realms/fitness-oauth2/protocol/openid-connect/token",
  redirectUri: "http://localhost:5179",
  scope: "openid profile email",
    onRefreshTokenExpire: (event) => event.logIn(),
  }