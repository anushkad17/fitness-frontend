export const authConfig = {
  clientId: "fitness-app",

  authorizationEndpoint:
    "https://keycloak-deploy-st9e.onrender.com/realms/fitness-oauth2/protocol/openid-connect/auth",

  tokenEndpoint:
    "https://keycloak-deploy-st9e.onrender.com/realms/fitness-oauth2/protocol/openid-connect/token",

  redirectUri: import.meta.env.VITE_REDIRECT_URI,

  scope: "openid profile email",

  
  getAuthUrl: (codeChallenge) => {
    return `${authConfig.authorizationEndpoint}?response_type=code` +
      `&client_id=${authConfig.clientId}` +
      `&redirect_uri=${encodeURIComponent(authConfig.redirectUri)}` +
      `&scope=${encodeURIComponent(authConfig.scope)}` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`;
  },

  
  onRefreshTokenExpire: (event) => event.logIn(),
};