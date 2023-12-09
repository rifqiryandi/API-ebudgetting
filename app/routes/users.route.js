const { authJwt } = require("../helper");
const controller = require("../controller/users.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/users/insusers", [authJwt.verifyToken], controller.insusers);
  app.post("/users/listuser", [authJwt.verifyToken], controller.listuser);
  app.post("/users/deluser", [authJwt.verifyToken], controller.deluser);
  app.post("/users/edituser", [authJwt.verifyToken], controller.edituser);
  app.post(
    "/users/updatestatus",
    [authJwt.verifyToken],
    controller.updatestatus
  );
  app.post("/users/updatepass", [authJwt.verifyToken], controller.updatepass);
};
