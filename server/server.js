const unleash = require("unleash-server");
const azureADHook = require("./azure-hook");

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
    server: {
      port: 4242,
    },
  })
  .then((unleash) => {
    console.log(
      `Unleash started on http://localhost:${unleash.app.get("port")}`
    );
  });
