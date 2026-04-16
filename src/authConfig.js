export const authConfig = {
  clientId: "fitness-app",
  authorizationEndpoint:
    "https://keycloak-deploy-st9e.onrender.com/realms/fitness-oauth2/protocol/openid-connect/auth",
  tokenEndpoint:
    "https://keycloak-deploy-st9e.onrender.com/realms/fitness-oauth2/protocol/openid-connect/token",
  redirectUri: "https://fitness-frontend-6ogz.onrender.com/",
  scope: "openid profile email",  // ← keep as string for this library
  onRefreshTokenExpire: (event) => event.logIn(),

};