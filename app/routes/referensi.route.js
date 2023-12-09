const { authJwt } = require("../helper");
const controller = require("../controller/referensi.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/referensi/insdepartemen",
    [authJwt.verifyToken],
    controller.insdepartemen
  );

  app.post(
    "/referensi/getdepartemen",
    [authJwt.verifyToken],
    controller.getdepartemen
  );

  app.post(
    "/referensi/updatedepartemen",
    [authJwt.verifyToken],
    controller.updatedepartemen
  );

  app.post(
    "/referensi/deldepartemen",
    [authJwt.verifyToken],
    controller.deldepartemen
  );

  app.post(
    "/referensi/insentitas",
    [authJwt.verifyToken],
    controller.insentitas
  );

  app.get(
    "/referensi/getentitas",
    [authJwt.verifyToken],
    controller.getentitas
  );

  app.post(
    "/referensi/updateentitas",
    [authJwt.verifyToken],
    controller.updateentitas
  );

  app.post(
    "/referensi/delentitas",
    [authJwt.verifyToken],
    controller.delentitas
  );

  app.post(
    "/referensi/inskelmatanggaran",
    [authJwt.verifyToken],
    controller.inskelmatanggaran
  );

  app.get(
    "/referensi/getkelmatanggaran",
    [authJwt.verifyToken],
    controller.getkelmatanggaran
  );

  app.post(
    "/referensi/updatekelmatanggaran",
    [authJwt.verifyToken],
    controller.updatekelmatanggaran
  );

  app.post(
    "/referensi/delkelmatanggaran",
    [authJwt.verifyToken],
    controller.delkelmatanggaran
  );

  app.post(
    "/referensi/getmatanggaran",
    [authJwt.verifyToken],
    controller.getmatanggaran
  );

  app.post(
    "/referensi/insmatanggaran",
    [authJwt.verifyToken],
    controller.insmatanggaran
  );

  app.post(
    "/referensi/updatematanggaran",
    [authJwt.verifyToken],
    controller.updatematanggaran
  );

  app.post(
    "/referensi/delmatanggaran",
    [authJwt.verifyToken],
    controller.delmatanggaran
  );

  app.post(
    "/referensi/getsubmatanggaran",
    [authJwt.verifyToken],
    controller.getsubmatanggaran
  );

  app.post(
    "/referensi/inssubmatanggaran",
    [authJwt.verifyToken],
    controller.inssubmatanggaran
  );

  app.post(
    "/referensi/updatesubmatanggaran",
    [authJwt.verifyToken],
    controller.updatesubmatanggaran
  );

  app.post(
    "/referensi/delsubmatanggaran",
    [authJwt.verifyToken],
    controller.delsubmatanggaran
  );

  app.post(
    "/referensi/updatestatusdepart",
    [authJwt.verifyToken],
    controller.updatestatusdepart
  );

  app.post(
    "/referensi/updatestatusentitas",
    [authJwt.verifyToken],
    controller.updatestatusentitas
  );

  app.post(
    "/referensi/updatestatusklpmataanggaran",
    [authJwt.verifyToken],
    controller.updatestatusklpmataanggaran
  );

  app.post(
    "/referensi/updatestatusmatanggaran",
    [authJwt.verifyToken],
    controller.updatestatusmatanggaran
  );

  app.post(
    "/referensi/updatestatusubmatanggaran",
    [authJwt.verifyToken],
    controller.updatestatusubmatanggaran
  );

  app.get(
    "/referensi/getjabatan",
    [authJwt.verifyToken],
    controller.getjabatan
  );
};
