// let helper = require("../helper/response/respons.helper");
let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/referensi.model");
const axios = require("axios");
const https = require("https");
let CONF = require("../config/config");
// let valid = require("../helper/response/validation.helper");

function getdepartemen(req, res) {
  let entitas = req.body.entitas;
  let query = model.getdepartemen(entitas);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
      // console.log(error);
    });
}

function getentitas(req, res) {
  let query = model.getentitas();
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
      console.log(error);
    });
}

function insdepartemen(req, res) {
  let entitas = req.body.entitas;
  let nama_depart = req.body.nama_depart;
  let rubrik = req.body.rubrik;
  let userid = req.body.userid;
  let kode_depart = req.body.kode_depart;
  let query = model.insdepartemen(
    entitas,
    nama_depart,
    rubrik,
    userid,
    kode_depart
  );
  query
    .then((result) => {
      // console.log(result);
      if (result === "1Tambah") {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Simpan",
        });
      } else if (result >= 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function insentitas(req, res) {
  let kdentitas = req.body.kdentitas;
  let nama_entitas = req.body.nama_entitas;
  let userid = req.body.userid;
  let query = model.insentitas(kdentitas, nama_entitas, userid);
  query
    .then((result) => {
      console.log(result);
      if (result === "1Tambah") {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Simpan",
        });
      } else if (result >= 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function updatedepartemen(req, res) {
  let id = req.body.id;
  let nama_depart = req.body.nama_depart;
  let entitas = req.body.entitas;
  let kddepart = req.body.kddepart;
  let userid = req.body.userid;
  let status = req.body.status;
  let query = model.updatedepartemen(
    id,
    nama_depart,
    entitas,
    kddepart,
    userid,
    status
  );
  query
    .then((result) => {
      console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Diupdate",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function updateentitas(req, res) {
  let id = req.body.id;
  let kdentitas = req.body.kdentitas;
  let nama_entitas = req.body.nama_entitas;
  let userid = req.body.userid;
  let status = req.body.status;
  let query = model.updateentitas(id, kdentitas, nama_entitas, userid, status);
  query
    .then((result) => {
      console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Diupdate",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function updatekelmatanggaran(req, res) {
  let id = req.body.id;
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let nama_kelmatanggaran = req.body.nama_kelmatanggaran;
  let userid = req.body.userid;
  let status = req.body.status;
  let query = model.updatekelmatanggaran(
    id,
    kdkelmatanggaran,
    nama_kelmatanggaran,
    userid,
    status
  );
  query
    .then((result) => {
      console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Diupdate",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function deldepartemen(req, res) {
  let id = req.body.id;
  let query = model.deldepartemen(id);
  query
    .then((result) => {
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Dihapus",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function delentitas(req, res) {
  let id = req.body.id;
  let query = model.delentitas(id);
  query
    .then((result) => {
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Dihapus",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function delkelmatanggaran(req, res) {
  let id = req.body.id;
  let query = model.delkelmatanggaran(id);
  query
    .then((result) => {
      console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Dihapus",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function getkelmatanggaran(req, res) {
  let query = model.getkelmatanggaran();
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
      // console.log(error);
    });
}

function inskelmatanggaran(req, res) {
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let nama_kelmatanggaran = req.body.nama_kelmatanggaran;
  let userid = req.body.userid;
  let query = model.inskelmatanggaran(
    kdkelmatanggaran,
    nama_kelmatanggaran,
    userid
  );
  query
    .then((result) => {
      console.log(result);
      if (result === "1Tambah") {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Simpan",
        });
      } else if (result >= 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function getmatanggaran(req, res) {
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let query = model.getmatanggaran(kdkelmatanggaran);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
      // console.log(error);
    });
}

function insmatanggaran(req, res) {
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let kdmatanggaran = req.body.kdmatanggaran;
  let nmmatanggaran = req.body.nmmatanggaran;
  let userid = req.body.userid;
  let query = model.insmatanggaran(
    kdkelmatanggaran,
    kdmatanggaran,
    nmmatanggaran,
    userid
  );
  query
    .then((result) => {
      console.log(result);
      if (result === "1Tambah") {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Simpan",
        });
      } else if (result >= 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}
function updatematanggaran(req, res) {
  let id = req.body.id;
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let kdmatanggaran = req.body.kdmatanggaran;
  let nmmatanggaran = req.body.nmmatanggaran;
  let userid = req.body.userid;
  let status = req.body.status;
  let query = model.updatematanggaran(
    id,
    kdkelmatanggaran,
    kdmatanggaran,
    nmmatanggaran,
    userid,
    status
  );
  query
    .then((result) => {
      console.log(result);
      if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Diupdate",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function delmatanggaran(req, res) {
  let id = req.body.id;
  let query = model.delmatanggaran(id);
  query
    .then((result) => {
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Dihapus",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function getsubmatanggaran(req, res) {
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let kdmatanggaran = req.body.kdmatanggaran;
  let query = model.getsubmatanggaran(kdkelmatanggaran, kdmatanggaran);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
      // console.log(error);
    });
}

function inssubmatanggaran(req, res) {
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let kdmatanggaran = req.body.kdmatanggaran;
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let nmsubmatanggaran = req.body.nmsubmatanggaran;
  let userid = req.body.userid;
  let query = model.inssubmatanggaran(
    kdkelmatanggaran,
    kdmatanggaran,
    kdsubmatanggaran,
    nmsubmatanggaran,
    userid
  );
  query
    .then((result) => {
      console.log(result);
      if (result === "1Tambah") {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Simpan",
        });
      } else if (result >= 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}
function updatesubmatanggaran(req, res) {
  let id = req.body.id;
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let kdmatanggaran = req.body.kdmatanggaran;
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let nmsubmatanggaran = req.body.nmsubmatanggaran;
  let userid = req.body.userid;
  let status = req.body.status;
  let query = model.updatesubmatanggaran(
    id,
    kdkelmatanggaran,
    kdmatanggaran,
    kdsubmatanggaran,
    nmsubmatanggaran,
    userid,
    status
  );
  query
    .then((result) => {
      console.log(result);
      if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Diupdate",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function delsubmatanggaran(req, res) {
  let id = req.body.id;
  let query = model.delsubmatanggaran(id);
  query
    .then((result) => {
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Dihapus",
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: result.sqlMessage,
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function updatestatusdepart(req, res) {
  let id = req.body.id;
  let status = req.body.status;
  let query = model.updatestatusdepart(id, status);
  query
    .then((result) => {
      // console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result >= 1) {
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

function updatestatusentitas(req, res) {
  let id = req.body.id;
  let status = req.body.status;
  let query = model.updatestatusentitas(id, status);
  query
    .then((result) => {
      // console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
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

function updatestatusklpmataanggaran(req, res) {
  let id = req.body.id;
  let status = req.body.status;
  let query = model.updatestatusklpmataanggaran(id, status);
  query
    .then((result) => {
      // console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
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

function updatestatusmatanggaran(req, res) {
  let id = req.body.id;
  let status = req.body.status;
  let query = model.updatestatusmatanggaran(id, status);
  query
    .then((result) => {
      // console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
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

function updatestatusubmatanggaran(req, res) {
  let id = req.body.id;
  let status = req.body.status;
  let query = model.updatestatusubmatanggaran(id, status);
  query
    .then((result) => {
      // console.log(result);
      if (result == "Doubledata") {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada Dalam Transaksi",
        });
      } else if (result == 1) {
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

function getjabatan(req, res) {
  let query = model.getjabatan();
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
      // console.log(error);
    });
}

module.exports = {
  getdepartemen,
  getentitas,
  getmatanggaran,
  insdepartemen,
  insentitas,
  updatedepartemen,
  updateentitas,
  updatekelmatanggaran,
  deldepartemen,
  delentitas,
  getkelmatanggaran,
  inskelmatanggaran,
  delkelmatanggaran,
  insmatanggaran,
  updatematanggaran,
  delmatanggaran,
  getsubmatanggaran,
  inssubmatanggaran,
  updatesubmatanggaran,
  delsubmatanggaran,
  updatestatusdepart,
  updatestatusentitas,
  updatestatusklpmataanggaran,
  updatestatusmatanggaran,
  updatestatusubmatanggaran,
  getjabatan,
};
