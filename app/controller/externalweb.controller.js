// let helper = require("../helper/response/respons.helper");
let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/externalweb.model");
var jwt = require("jsonwebtoken");
let CONF = require("../config/config");
// let valid = require("../helper/response/validation.helper");

function carikantor(req, res) {
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let jnsktr = req.body.jnsktr;
  let query = model.carikantor(perPage, currentPage, cari, jnsktr);
  query
    .then(async (result) => {
      // console.log(result);
      var data_arr = [];
      // var data_arr2 = [];
      let jam_layanan;
      for (let i = 0; i < result.data.length; i++) {
        let id_dirian = result.data[i].id_dirian;
        let getlayanan = await model.detailayanantop1(id_dirian);
        let getjamlayanan = await model.detaijamlayanantop1(id_dirian);
        // console.log(getjamlayanan);
        let alamat = result.data[i].alamat;
        if (getjamlayanan == "") {
          jam_layanan = "-";
        } else {
          jam_layanan = getjamlayanan[0].jamlayanan;
        }
        let isialamat = alamat.substr(0, 20);
        // var data = [];
        // for (var o in getlayanan) {
        //   data_arr2.push(getlayanan[o]);
        // }

        data_arr.push({
          nama_dirian: result.data[i].nama_dirian,
          kabupaten: result.data[i].kabupaten,
          alamat: isialamat + "....",
          // jamlayanan: getjamlayanan[0].jamlayanan,
          jamlayanan: jam_layanan,
          layanan: getlayanan,
          // layanan: "Pembayaran,Pengiriman,Penarikan",
          id_dirian: result.data[i].id_dirian,
          jnskantor: result.data[i].jenisktr,
        });
      }
      // console.log(result);
      if (result.total_data >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          total_data: result.total_data,
          current_page: result.current_page,
          total_page: result.total_page,
          data: data_arr,
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

function carikantorbyregen(req, res) {
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let kelurahan = req.body.kelurahan;
  let kecamatan = req.body.kecamatan;
  let kabupaten = req.body.kabupaten;
  let provinsi = req.body.provinsi;
  let jnsktr = req.body.jnsktr;
  let query = model.carikantorbyregen(
    perPage,
    currentPage,
    kelurahan,
    kecamatan,
    kabupaten,
    provinsi,
    jnsktr
  );
  query
    .then(async (result) => {
      var data_arr = [];
      // var data_arr2 = [];
      let jam_layanan;
      for (let i = 0; i < result.data.length; i++) {
        let id_dirian = result.data[i].id_dirian;
        let getlayanan = await model.detailayanantop1(id_dirian);
        let getjamlayanan = await model.detaijamlayanantop1(id_dirian);
        // console.log(getlayanan);
        let alamat = result.data[i].alamat;
        if (getjamlayanan == "") {
          jam_layanan = "-";
        } else {
          jam_layanan = getjamlayanan[0].jamlayanan;
        }
        let isialamat = alamat.substr(0, 20);
        // var data = [];
        // for (var o in getlayanan) {
        //   data_arr2.push(getlayanan[o]);
        // }

        data_arr.push({
          nama_dirian: result.data[i].nama_dirian,
          kabupaten: result.data[i].kabupaten,
          alamat: isialamat + "....",
          // jamlayanan: getjamlayanan[0].jamlayanan,
          jamlayanan: jam_layanan,
          layanan: getlayanan,
          // layanan: "Pembayaran,Pengiriman,Penarikan",
          id_dirian: result.data[i].id_dirian,
          jnskantor: result.data[i].jenisktr,
        });
      }
      // console.log(result);
      if (result.total_data >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          total_data: result.total_data,
          current_page: result.current_page,
          total_page: result.total_page,
          data: data_arr,
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

function detailktr(req, res) {
  let id_dirian = req.body.id_dirian;
  let query = model.detailktr(id_dirian);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length >= 1) {
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

function detailayanan(req, res) {
  let iddirian = req.body.iddirian;
  let query = model.detailayanan(iddirian);
  var data_arr = [];
  query
    .then((result) => {
      console.log(result);
      // for (let i = 0; i < result.length; i++) {
      //   let idhari = result[i].id;
      //   let hari = result[i].deskripsi;
      //   // let getlayanan = await model.detailayananall(id_dirian, idhari);
      //   // console.log(getlayanan);
      //   data_arr.push({
      //     hari: hari,
      //     // layanan: getlayanan,
      //   });
      // }
      // console.log(data_arr);
      if (result.length >= 1) {
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

// function getkantor(req, res) {
//   const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET2, {
//     expiresIn: "150m",
//   });
// }

function getkantor(req, res) {
  let kotakab = req.body.kotakab;
  let query = model.getkantor(kotakab);
  var data_arr = [];
  query
    .then(async (result) => {
      // console.log(result);
      // console.log(result);
      for (let i = 0; i < result.length; i++) {
        // console.log(getlayanan);
        let longitude = result[i].longitude;
        let latitude = result[i].latitude;
        let geolocations = longitude + "," + latitude;
        data_arr.push({
          namadirian: result[i].nama_dirian,
          nomordirian: result[i].id_dirian,
          alamat: result[i].alamat,
          geolocation: geolocations,
          kelurahan: result[i].Nama_Kelurahan_Desa,
          kecamatan: result[i].Nama_Kecamatan,
          kotakab: result[i].Nama_Kabupaten_Kota,
          provinsi: result[i].Nama_Propinsi,
        });
      }
      if (result.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: data_arr,
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
      // console.log(error);
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Error Server",
      });
    });
}

function getkantorbyname(req, res) {
  let kotakab = req.body.kotakab;
  let query = model.getkantorbyname(kotakab);
  var data_arr = [];
  query
    .then(async (result) => {
      // console.log(result);
      // console.log(result);
      for (let i = 0; i < result.length; i++) {
        // console.log(getlayanan);
        let longitude = result[i].longitude;
        let latitude = result[i].latitude;
        let geolocations = longitude + "," + latitude;
        data_arr.push({
          namadirian: result[i].nama_dirian,
          nomordirian: result[i].id_dirian,
          alamat: result[i].alamat,
          geolocation: geolocations,
          kelurahan: result[i].kelurahan,
          kecamatan: result[i].kecamatan,
          kotakab: result[i].kabupaten,
          provinsi: result[i].propinsi,
          kodepos: result[i].kodepos,
          pic_nama: "Contact Center Pos Indonesia",
          pic_email: "halopos@posindonesia.co.id",
          tgl_berlaku: result[i].tgl_berlaku,
          kode_cabang: result[i].kode_cabang,
        });
      }
      if (result.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: data_arr,
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
      // console.log(error);
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Error Server",
      });
    });
}

module.exports = {
  carikantor,
  carikantorbyregen,
  detailktr,
  detailayanan,
  getkantor,
  getkantorbyname,
};
