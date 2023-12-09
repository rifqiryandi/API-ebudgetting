let db = require("../config/database");
let helper = require("../helper/prefix/prefix.helper");

let inslampiran = (idpengajuan, namafile, namafolder) => {
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  console.log(idpengajuan + "-" + namafile + "-" + namafolder);
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .insert([
          {
            id_pengajuan: idpengajuan,
            lampiran: namafile,
            kode_unik: namafolder,
            create_date: dateTime,
            update_date: null,
          },
        ])
        .into("h_lampiran");
      resolve(data);
    } catch (error) {
      // console.log("asd");
      resolve(error);
    }
  });
};

let inslampiranrealisasi = (
  kode_pengajuan,
  id_realisasi,
  jnsdokumen,
  namafile
) => {
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .insert([
          {
            id_realisasi: id_realisasi,
            jenis_dokumen: jnsdokumen,
            create_at: dateTime,
            update_at: null,
            kode_unik: kode_pengajuan,
            lampiran: namafile,
          },
        ])
        .into("h_lampiran_realisasi");
      resolve(data);
    } catch (error) {
      // console.log("asd");
      resolve(error);
    }
  });
};

let listfile = (idpengajuan) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_unik", "lampiran")
        .from("h_lampiran")
        .where({
          id_pengajuan: idpengajuan,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let listfilerealisasi = (id_realisasi, jenis_dokumen) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_unik", "lampiran", "jenis_dokumen")
        .from("h_lampiran_realisasi")
        .where({
          id_realisasi: id_realisasi,
          // jenis_dokumen: jenis_dokumen,
        })
        .orderBy([{ column: "jenis_dokumen", order: "asc" }]);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

module.exports = {
  inslampiran,
  listfile,
  inslampiranrealisasi,
  listfilerealisasi,
};
