// let helper = require("../helper/response/respons.helper");
let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/upload_file.model");
const axios = require("axios");
const https = require("https");
let CONF = require("../config/config");
const Minio = require("minio");
const path = require("path");

exports.upload_file = (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  let rubrik = req.body.rubrik;
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let nominal = req.body.nominal;
  let file = req.files.myFile;
  let jnspengajuan = req.body.jnspengajuan;
  let idpengajuan = req.body.idpengajuan;
  let namafile = file.name;
  let namafolder =
    rubrik + "-" + kdsubmatanggaran + "-" + nominal + "-" + jnspengajuan;
  let query = model.inslampiran(idpengajuan, namafile, namafolder);
  query
    .then(async(result) => {
      // console.log(result);
      if (result >= 1) {
        const path = "uploads/" + namafolder + "/" + file.name;
        await file.mv(path, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          // return res.send({ status: "success", path: path });
          res.status(200).json({
            responCode: 200,
            Msg: "Simpan Data Berhasil",
          });
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
};

exports.upload_file_realisasi = (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }
  let kode_pengajuan = req.body.kode_pengajuan;
  let id_realisasi = req.body.id_realisasi;
  let jnsdokumen = req.body.jnsdokumen;
  let file = req.files.myFile;
  let namafile = file.name;
  let namafolder = kode_pengajuan;
  let query = model.inslampiranrealisasi(
    kode_pengajuan,
    id_realisasi,
    jnsdokumen,
    namafile
  );
  query
    .then(async(result) => {
      // console.log(result);
      if (result >= 1) {
        const path = "uploads/realisasi/" + namafolder + "/" + file.name;
        await file.mv(path, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
          // return res.send({ status: "success", path: path });
          res.status(200).json({
            responCode: 200,
            Msg: "Simpan Data Berhasil",
          });
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
};

exports.getfile = (req, res) => {

    let kode_unik = req.body.kode_unik;
    let lampiran = req.body.lampiran;
  
    res.download('./uploads/'+kode_unik+'/'+lampiran+'')
    // console.log('asdasda');
  
  // var kodeunik = req.body.kodeunik;
  // var nmfile = req.body.nmfile;
  // const file = "uploads/" + kodeunik + "/" + nmfile;
  // res.download(file);
};

exports.getfilerealisasi = (req, res) => {

  let kode_unik = req.body.kode_unik;
  let lampiran = req.body.lampiran;

  res.download('./uploads/realisasi/'+kode_unik+'/'+lampiran+'')
  // console.log('asdasda');

// var kodeunik = req.body.kodeunik;
// var nmfile = req.body.nmfile;
// const file = "uploads/" + kodeunik + "/" + nmfile;
// res.download(file);
};

exports.listfile = (req, res) => {
  let idpengajuan = req.body.idpengajuan;
  let query = model.listfile(idpengajuan);
  let folder = path.join(__dirname, "../../uploads");
  let folderupload = (__dirname, "/uploads");
  let folderawal = path.basename(path.join(path.dirname(__dirname),"../"));
  let ha = req.protocol + '://' + req.get('host') + '/' + folderawal + folderupload;
  // var fullUrl = folder+ "/";
  
  query
    .then((result) => {
      // console.log(result.length);
      var data_arr = [];
      for (let i = 0; i < result.length; i++) {
        // console.log(folder);
        let kodeunik = result[i].kode_unik;
        let lampiran = result[i].lampiran;
        let berkas =
        ha + "/" + kodeunik + "/" + lampiran;
        data_arr.push({
          kode_unik: result[i].kode_unik,
          lampiran: result[i].lampiran,
          link: berkas,
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
};

exports.listfilerealisasi = (req, res) => {
  let id_realisasi = req.body.id_realisasi;
  let jenis_dokumen = req.body.jenis_dokumen;
  let query = model.listfilerealisasi(id_realisasi, jenis_dokumen);
  let folder = path.join(__dirname, "../../uploads");
  let folderupload = (__dirname, "/uploads");
  let folderawal = path.basename(path.join(path.dirname(__dirname),"../"));
  let ha = req.protocol + '://' + req.get('host') + '/' + folderawal + folderupload;
  query
    .then((result) => {
      // console.log(result.length);
      var data_arr = [];
      for (let i = 0; i < result.length; i++) {
        // console.log(folder);
        let kodeunik = result[i].kode_unik;
        let lampiran = result[i].lampiran;
        // let berkas = folder + "/" + kodeunik + "/" + lampiran;
        // let berkas =
        //   "http://10.60.64.55/web-npp-tes/uploads/realisasi/" +
        //   kodeunik +
        //   "/" +
        //   lampiran;
        let berkas =
        ha + "/" + kodeunik + "/" + lampiran;
        data_arr.push({
          kode_unik: result[i].kode_unik,
          lampiran: result[i].lampiran,
          jenis_dokumen: result[i].jenis_dokumen,
          link: berkas,
        });
        // console.log(bsu_keg);
      }
      // console.log(data_arr);
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
};
