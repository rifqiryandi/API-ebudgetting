const { authJwt } = require("../helper");
const controller = require("../controller/dashboard.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/dashboard/listdashboard",
    [authJwt.verifyToken],
    controller.listdashboard
  );
  app.post(
    "/dashboard/listdashboardetail",
    [authJwt.verifyToken],
    controller.listdashboardetail
  );
};
