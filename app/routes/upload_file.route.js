const { authJwt } = require("../helper");
const controller = require("../controller/upload_file.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/upload/pengajuan", [authJwt.verifyToken], controller.upload_file);
  app.post(
    "/upload/realisasi",
    [authJwt.verifyToken],
    controller.upload_file_realisasi
  );
  app.post("/download", controller.getfile);
  // Return the generated file for download
  app.get("/download", controller.getfile);
  app.post("/upload/getfile", [authJwt.verifyToken], controller.getfile);
  app.post("/upload/listfile", [authJwt.verifyToken], controller.listfile);
  app.post(
    "/upload/listfilerealisasi",
    [authJwt.verifyToken],
    controller.listfilerealisasi
  );
  // app.post("/upload/getfile", [authJwt.verifyToken], controller.getfile);
  // app.post("/upload/listfile", [authJwt.verifyToken], controller.listfile);
  // app.post("/upload", (req, res) => {
  //   if (!req.files) {
  //     return res.status(400).send("No files were uploaded.");
  //   }

  //   const file = req.files.myFile;
  //   const path = __dirname + "/files/" + file.name;

  //   file.mv(path, (err) => {
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
  //     return res.send({ status: "success", path: path });
  //   });
  // });
};
