const { authJwt } = require("../helper");
const controller = require("../controller/histori.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/histori/historikantorkc",
    [authJwt.verifyToken],
    controller.historikantorkc
  );
};
