require("dotenv").config();
const msal = require("@azure/msal-node");

const tenantGUID = process.env.AZURE_AD_TENANT;
const clientID = process.env.AZURE_AD_CLIENT;
const hostUrl = process.env.UNLEASH_HOST_URL;
const redirectUrl = `${hostUrl}${process.env.AZURE_AD_REDIRECT_URL}`;
const clientSecret = process.env.AZURE_AD_SECRET;
const allowHttp = process.env.AZURE_AD_ALLOW_HTTP === "true";
const identityMetadata = `https://login.microsoftonline.com/${tenantGUID}/v2.0/.well-known/openid-configuration`;

const passportConfig = {
  identityMetadata,
  loggingNoPII: true,
  responseType: "code",
  responseMode: "form_post",
  passReqToCallback: false,
  allowHttpForRedirectUrl: allowHttp,
  scope: ["profile", "email", "user.read"],
  loggingLevel: "debug",
  clientID,
  redirectUrl,
  clientSecret,
  cookieSameSite: true,
};

const msalConfig = {
  auth: {
    clientId: clientID,
    authority: "https://login.microsoftonline.com/organizations",
    clientSecret,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

module.exports = {
  msalConfig,
  passportConfig,
  redirectUrl,
  hostUrl,
};
