const unleash = require("unleash-server");
const azureHookPassport = require("./azure-hook-passport");
const azureADHook = require("./azure-ad-hook");

unleash
  .start({
    db: {
      ssl: false,
      host: "localhost",
      port: 5432,
      database: "unleash",
      user: "unleash_user",
      password: "some_password",
    },
    authentication: {
      type: "custom",
      customAuthHandler: azureADHook,
    },
    logLevel: "debug",
    server: {
      port: 4242,
    },
  })
  .then((unleash) => {
    console.log(
      `Unleash started on http://localhost:${unleash.app.get("port")}`
    );
  });
