let model = require("../model/auth.model");
// let helper = require("../helper/response/respons.helper");
let helper = require("../helper/prefix/prefix.helper");
let CONF = require("../config/config");
var jwt = require("jsonwebtoken");
const axios = require("axios");
const https = require("https");
var crypto = require("crypto");

function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let nippass = username + ":" + password;
  var hash = crypto.createHash("md5").update(nippass).digest("hex");

  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  let query = model.login(username, password);
  query
    .then((result) => {
      // console.log(result);
      if (result.length == 0) {
        res.status(400).json({
          responCode: 400,
          Msg: "Login Gagal Username Tidak Aktif atau belum terdaftar",
        });
      } else if (result[0].status_online == 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "User Sudah Login",
        });
      } else {
        let query2 = model.updatelogin(username);
        const user = {
          id: username,
        };
        var timeexpjwt = 150;
        const todaysDate = new Date(new Date().getTime() + timeexpjwt * 60000);
        let dates = helper.formatDates(todaysDate);
        const accessToken = jwt.sign(
          user,
          CONF.ENV.SECRET.ACCESS_TOKEN_SECRET,
          {
            expiresIn: timeexpjwt + "m",
          }
        );
        res.status(200).json({
          responCode: 200,
          Msg: "Login Berhasil",
          accessToken: accessToken,
          data: result[0],
          expiresIn: dates,
        });
      }
    })

    .catch((err) => {
      res.status(400).json({
        responCode: 400,
        Msg: "erorr database",
      });
      console.log(err);
    });
}

function logout(req, res) {
  let username = req.body.username;
  let query = model.logout(username);
  query
    .then((result) => {
      // console.log(result);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Logout Berhasil",
        });
      } else {
        res.status(400).json({
          responCode: 400,

          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Error Server",
      });
    });
}

module.exports = { login, logout };
