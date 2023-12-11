const { authJwt } = require("../helper");
const controller = require("../controller/reporting.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/reporting/realisasi",
    [authJwt.verifyToken],
    controller.reportrealisasi
  );

  app.post(
    "/reporting/updatestatusnotif",
    [authJwt.verifyToken],
    controller.updatestatusnotif
  );

  app.post(
    "/reporting/listnotifikasi",
    [authJwt.verifyToken],
    controller.listnotifikasi
  );

  app.post(
    "/reporting/countnotifikasi",
    [authJwt.verifyToken],
    controller.countnotifikasi
  );

  app.post(
    "/reporting/reportrealisasidepart",
    [authJwt.verifyToken],
    controller.reportrealisasidepart
  );

  app.post(
    "/reporting/totalrealisasi",
    [authJwt.verifyToken],
    controller.totalrealisasi
  );

  app.post(
    "/reporting/totalanggaran",
    [authJwt.verifyToken],
    controller.totalanggaran
  );

  app.post(
    "/reporting/sponsorship",
    [authJwt.verifyToken],
    controller.sponsorship
  );

  app.post(
    "/reporting/tesarray",
    [authJwt.verifyToken],
    controller.tesarray
  );
};
