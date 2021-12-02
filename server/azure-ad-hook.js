const unleash = require("unleash-server");
const msal = require("@azure/msal-node");
const session = require("express-session");
const config = require("./config");

const azureADHook = (app, unleashAppConfig, services) => {
  const { baseUriPath } = unleashAppConfig.server;
  const { userService } = services;
  const cca = new msal.ConfidentialClientApplication(config.msalConfig);

  app.use(session());

  app.get("/auth/azure/login", (req, res) => {
    const authCodeUrlParameters = {
      scopes: ["user.read"],
      redirectUri: config.redirectUrl,
    };

    // get url to sign user in and consent to scopes needed for application
    cca
      .getAuthCodeUrl(authCodeUrlParameters)
      .then((response) => {
        res.redirect(response);
      })
      .catch((error) => console.log(JSON.stringify(error)));
  });

  app.get("/api/auth/callback", async (req, res, next) => {
    const tokenRequest = {
      code: req.query.code,
      scopes: ["user.read"],
      redirectUri: config.redirectUrl,
    };

    cca
      .acquireTokenByCode(tokenRequest)
      .then(async (response) => {
        // aqui o login com o Azure AD teve sucesso
        console.log("\nResponse: \n:", response);

        const users = {
          ADMIN: "Admin", // Cria/edita usuários, feature toggles, estratégias, gerencia tokens de API e acessa histórico
          EDITOR: "Editor", // Cria/edita feature toggles, estratégias
          VIEWER: "Viewer", // Somente visualiza
        };

        // aqui cria o user do Unleash
        const user = await userService.loginUserSSO({
          email: response.account.username,
          rootRole: users.ADMIN,
          autoCreate: true,
        });

        req.session.user = user;

        // Usuário logado, redireciona pra home do Unleash
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  });

  app.use("/api/admin/", (req, res, next) => {
    if (req.user) {
      next();
    } else if (req.session.user) {
      req.user = req.session.user;
      next();
    } else {
      return res
        .status("401")
        .json(
          new unleash.AuthenticationRequired({
            path: "/auth/azure/login",
            type: "custom",
            message: `You have to identify yourself in order to use Unleash. Click the button and follow the instructions.`,
          })
        )
        .end();
    }
  });
};

module.exports = azureADHook;
