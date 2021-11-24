const passport = require("passport");
const passportAD = require("passport-azure-ad");
const OIDCStrategy = passportAD.OIDCStrategy;
const config = require("./config");

function regenerateSessionAfterAuthentication(req, res, next) {
  var passportInstance = req.session.passport;
  return req.session.regenerate(function (err) {
    if (err) {
      return next(err);
    }
    req.session.passport = passportInstance;
    return req.session.save(next);
  });
}

function enableAzureAd(app, unleashAppConfig, services) {
  const { baseUriPath } = unleashAppConfig.server;
  const { userService } = services;
  passport.use(
    new OIDCStrategy(config.passportConfig, function (profile, done) {
      if (!profile.oid) {
        return done(new Error("Sem acesso ao perfil."), null);
      }
      // asynchronous verification, for effect...
      process.nextTick(async function () {
        const email = profile._json.preferred_username;
        const user = await userService.loginUserWithoutPassword(email, true);
        done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  app.use(passport.initialize());
  app.use(passport.session());

  app.post(
    "/api/auth/callback",
    passport.authenticate("azuread-openidconnect", {
      failureRedirect: "/api/admin/error-login",
    }),
    regenerateSessionAfterAuthentication,
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get(
    "/api/admin/login",
    passport.authenticate("azuread-openidconnect", {
      failureRedirect: "/api/admin/error-login",
    }),
    regenerateSessionAfterAuthentication,
    (req, res) => {
      res.redirect("/");
    }
  );

  app.get("/api/admin/error-login", (req, res, done) => {
    return res.status(401).send("Algo deu errado no login");
  });

  app.use("/api/admin/", (req, res, next) => {
    if (req.user) {
      next();
    } else {
      // Instruct unleash-frontend to pop-up auth dialog
      return res
        .status(401)
        .json({
          path: "/api/admin/login",
          type: "custom",
          message: `Para continuar você precisa fazer login`,
        })
        .end();
    }
  });
}

module.exports = enableAzureAd;
