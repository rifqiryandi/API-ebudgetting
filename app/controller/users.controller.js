// let helper = require("../helper/response/respons.helper");
let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/users.model");
const axios = require("axios");
const https = require("https");
let CONF = require("../config/config");
var crypto = require("crypto");
// let valid = require("../helper/response/validation.helper");

function insusers(req, res) {
  let username = req.body.username;
  let nama = req.body.nama;
  let gender = req.body.gender;
  let departemen = req.body.departemen;
  let jabatan = req.body.jabatan;
  let email = req.body.email;
  let nohp = req.body.nohp;
  let leveluser = req.body.leveluser;
  let statususer = req.body.statususer;
  let password = req.body.password;
  let nippass = password;
  var hash = crypto.createHash("md5").update(nippass).digest("hex");
  let query = model.insusers(
    username,
    nama,
    gender,
    departemen,
    jabatan,
    email,
    nohp,
    leveluser,
    statususer,
    hash
  );
  query
    .then((result) => {
      //console.log(result);
      if (result === "1Tambah") {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Simpan",
        });
      } else if (result >= 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "User Sudah Ada",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Data Gagal Simpan",
      });
    });
}

function listuser(req, res) {
  let query = model.listuser();
  query
    .then((result) => {
      // console.log(result);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
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

function edituser(req, res) {
  let id = req.body.id;
  let username = req.body.username;
  let nama = req.body.nama;
  let gender = req.body.gender;
  let departemen = req.body.departemen;
  let jabatan = req.body.jabatan;
  let email = req.body.email;
  let nohp = req.body.nohp;
  let leveluser = req.body.leveluser;
  let statususer = req.body.statususer;
  // let password = req.body.password;
  // let nippass = password;
  // var hash = crypto.createHash("md5").update(nippass).digest("hex");
  let query = model.edituser(
    id,
    username,
    nama,
    gender,
    departemen,
    jabatan,
    email,
    nohp,
    leveluser,
    statususer
    // hash
  );
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Diubah",
        });
      } else {
        console.log(result);
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Data Gagal Diubah",
      });
    });
}

function updatepass(req, res) {
  let id = req.body.id;
  let username = req.body.username;
  let password = req.body.password;
  let query = model.updatepass(id, username, password);
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Diubah",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Data Gagal Diubah",
      });
    });
}

function deluser(req, res) {
  let id = req.body.id;
  let query = model.deluser(id);
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Dihapus",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Data Gagal Diubah",
      });
    });
}

function updatestatus(req, res) {
  let id = req.body.id;
  let status = req.body.status;
  let query = model.updatestatus(id, status);
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil DiUpdate",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Data Gagal Diubah",
      });
    });
}

module.exports = {
  listuser,
  insusers,
  edituser,
  deluser,
  updatestatus,
  updatepass,
};
