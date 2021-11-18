const port = 3000;
require("dotenv").config();
const { createApp } = require("@unleash/proxy");

const app = createApp({
  unleashUrl:
    process.env.UNLEASH_URL || "https://app.unleash-hosted.com/demo/api/",
  unleashApiToken:
    process.env.UNLEASH_API_TOKEN ||
    "56907a2fa53c1d16101d509a10b78e36190b0f918d9f122d",
  proxySecrets: process.env.UNLEASH_PROXY_SECRETS?.split(",") ?? [
    "proxy-secret",
    "another-proxy-secret",
    "s1",
  ],
  refreshInterval: 1000,
  // logLevel: 'info',
  // projectName: 'order-team',
  // environment: 'development',
});

app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`Unleash Proxy listening on http://localhost:${port}/proxy`)
);
