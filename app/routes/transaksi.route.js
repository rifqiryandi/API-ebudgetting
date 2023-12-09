const { authJwt } = require("../helper");
const controller = require("../controller/transaksi.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/transaksi/inputanggaran",
    [authJwt.verifyToken],
    controller.inputanggaran
  );

  app.post(
    "/transaksi/inputpresenanggaran",
    [authJwt.verifyToken],
    controller.inputpresenanggaran
  );

  app.post(
    "/transaksi/listtransaksi",
    [authJwt.verifyToken],
    controller.listtransaksi
  );

  app.post(
    "/transaksi/getidanggaran",
    [authJwt.verifyToken],
    controller.getidanggaran
  );

  app.post(
    "/transaksi/listpresentasianggaran",
    [authJwt.verifyToken],
    controller.listpresentasianggaran
  );

  app.post(
    "/transaksi/validasialokasi",
    [authJwt.verifyToken],
    controller.validasialokasi
  );

  app.post(
    "/transaksi/validasikegiatan",
    [authJwt.verifyToken],
    controller.validasikegiatan
  );

  app.post(
    "/transaksi/inskegiatan",
    [authJwt.verifyToken],
    controller.inskegiatan
  );

  app.post(
    "/transaksi/listkegiatan",
    [authJwt.verifyToken],
    controller.listkegiatan
  );

  app.post(
    "/pengajuan/getidkegiatan",
    [authJwt.verifyToken],
    controller.getidkegiatan
  );

  app.post(
    "/pengajuan/getidpengajuan",
    [authJwt.verifyToken],
    controller.getidpengajuan
  );

  app.post(
    "/pengajuan/inspengajuan",
    [authJwt.verifyToken],
    controller.inspengajuan
  );

  app.post(
    "/pengajuan/inspengajuanpb",
    [authJwt.verifyToken],
    controller.inspengajuanpb
  );

  app.post(
    "/transaksi/getpengajuanpk",
    [authJwt.verifyToken],
    controller.getpengajuanpk
  );

  app.post(
    "/transaksi/listpengajaun",
    [authJwt.verifyToken],
    controller.listpengajaun
  );

  app.post(
    "/transaksi/validasipengajuan",
    [authJwt.verifyToken],
    controller.validasipengajuan
  );

  app.post(
    "/transaksi/validasipengajuanpk",
    [authJwt.verifyToken],
    controller.validasipengajuanpk
  );

  app.post(
    "/pengajuan/inspengajuanpk",
    [authJwt.verifyToken],
    controller.inspengajuanpk
  );

  app.post(
    "/transaksi/listpengajaunpk",
    [authJwt.verifyToken],
    controller.listpengajaunpk
  );

  app.post("/transaksi/listretur", [authJwt.verifyToken], controller.listretur);

  app.post("/transaksi/retur", [authJwt.verifyToken], controller.retur);

  app.post("/transaksi/returpk", [authJwt.verifyToken], controller.returpk);

  app.post("/transaksi/realisasi", [authJwt.verifyToken], controller.realisasi);

  app.post(
    "/transaksi/getpengajuan",
    [authJwt.verifyToken],
    controller.getpengajuan
  );

  app.post(
    "/transaksi/listrealisasi",
    [authJwt.verifyToken],
    controller.listrealisasi
  );

  app.post(
    "/transaksi/topupanggaran",
    [authJwt.verifyToken],
    controller.topupanggaran
  );

  app.post(
    "/transaksi/listopupanggaran",
    [authJwt.verifyToken],
    controller.listopupanggaran
  );

  app.post(
    "/transaksi/validasitopup",
    [authJwt.verifyToken],
    controller.validasitopup
  );

  app.post(
    "/transaksi/switchanggaran",
    [authJwt.verifyToken],
    controller.switchanggaran
  );

  app.post(
    "/transaksi/listswitchanggaran",
    [authJwt.verifyToken],
    controller.listswitchanggaran
  );

  app.post(
    "/transaksi/validasiswitchanggaran",
    [authJwt.verifyToken],
    controller.validasiswitchanggaran
  );

  app.post(
    "/transaksi/validasirealisasi",
    [authJwt.verifyToken],
    controller.validasirealisasi
  );
};
