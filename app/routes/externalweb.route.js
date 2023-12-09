const { authJwt } = require("../helper");
const controller = require("../controller/externalweb.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/externalweb/carikantor", controller.carikantor);

  app.post("/externalweb/carikantorbyregen", controller.carikantorbyregen);

  app.post("/externalweb/detailktr", controller.detailktr);

  app.post("/externalweb/detailayanan", controller.detailayanan);

  app.post("/externalweb/getkantor", controller.getkantor);

  app.post("/externalweb/getkantorbyname", controller.getkantorbyname);
};
