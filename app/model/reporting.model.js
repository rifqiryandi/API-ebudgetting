let db = require("../config/database");
let helper = require("../helper/prefix/prefix.helper");

let reportrealisasi = (kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_sub_mata_anggaran", "a.nama_sub_mata_anggaran")
        .from("r_sub_mata_anggaran as a")
        .where("a.kode_mata_anggaran", "BK");
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumtopupanggaran = (kode_sub_mata_anggaran, entitas1) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal_topup as nominaltopup")
        .from("h_topup_anggaran as a")
        .leftJoin("m_anggaran as b", "a.id_anggaran", "b.id")
        .leftJoin(
          "r_departemen as c",
          "b.kode_departemen",
          "c.kode_departement"
        )
        .where("a.status", 2)
        .where("b.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("c.kode_entitas", entitas1);
      // .groupBy("a.id_anggaran");

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchanggarankurang = (kode_sub_mata_anggaran, entitas1) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.bsu_inout as bsu_inout")
        .from("h_m_anggaran as a")
        .leftJoin("m_anggaran as b", "a.id_anggaran_awal", "b.id")
        .leftJoin(
          "r_departemen as c",
          "b.kode_departemen",
          "c.kode_departement"
        )
        .where("a.status_anggaran", 2)
        .where("b.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("c.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchanggarantambah = (kode_sub_mata_anggaran, entitas1) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.bsu_inout as bsu_inout")
        .from("h_m_anggaran as a")
        .leftJoin("m_anggaran as b", "a.id_anggaran_final", "b.id")
        .leftJoin(
          "r_departemen as c",
          "b.kode_departemen",
          "c.kode_departement"
        )
        .where("a.status_anggaran", 2)
        .where("b.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("c.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getanggaranfy = (kode_sub_mata_anggaran, entitas1) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal")
        .from("m_anggaran as a")
        .leftJoin(
          "r_departemen as b",
          "a.kode_departemen",
          "b.kode_departement"
        )
        .where("a.tahun", 2023)
        .where("a.status_anggaran", 2)
        .where("a.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("b.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getrealisasi = (kode_sub_mata_anggaran, entitas1) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal")
        .from("h_realisasi as a")
        .leftJoin("h_pengajuan as d", "a.id_pengajuan", "d.id")
        .leftJoin("m_anggaran as c", "d.id_anggaran", "c.id")
        .leftJoin(
          "r_departemen as b",
          "c.kode_departemen",
          "b.kode_departement"
        )
        .where("a.status_pengajuan", 2)
        .where("c.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("b.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getpresentaseanggaran = () => {
  var today = new Date();
  let month = today.getMonth() + 2;
  let bulan = month;

  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.presentasi as presentasi")
        .from("m_presentasi_anggaran as a")

        .where("a. bulan", "<", bulan);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let updatestatusnotif = (id) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("h_notifikasi")
        .where({
          id: id_p,
        })
        .update({
          status: 1,
          update_at: dateTime,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let listnotifikasi = (departemen) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("b.keterangan", "b.jenis_switchanggaran", "a.id")
        .from("h_notifikasi as a")
        .leftJoin("h_m_anggaran as b", "a.id_pengajuan", "b.id")
        // .leftJoin("m_anggaran as c", "b.id_anggaran_final", "c.id")
        .leftJoin("m_anggaran as c", "b.id_anggaran_awal", "c.id")
        .where("c.kode_departemen", departemen)
        .where("a.status", 0)
        .whereNot("b.status_anggaran", 2)
        .orderBy("a.create_at", "desc");
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let countnotifikasi = (departemen) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .count("* as count")
        .from("h_notifikasi as a")
        .leftJoin("h_m_anggaran as b", "a.id_pengajuan", "b.id")
        .leftJoin("m_anggaran as c", "b.id_anggaran_final", "c.id")
        .where("c.kode_departemen", departemen)
        .whereNot("b.status_anggaran", 2)
        .where("a.status", 0)
        .orderBy("a.create_at", "desc");
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let reportrealisasidepart = (kode_sub_mata_anggaran, kode_entitas) => {
  // let valOne = kode_entitas;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("b.kode_sub_mata_anggaran", "a.kode_departement")
        .from("r_departemen as a")
        .leftJoin("m_anggaran as b", "a.kode_departement", "b.kode_departemen")
        .where("b.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("a.kode_entitas", kode_entitas);
      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
    // try {
    //   // let data = db.knex1.raw("CALL cek('1')");
    //   // console.log(data);
    //   resolve(data);
    // } catch (error) {
    //   // console.log(error);
    //   resolve(false);
    // }
  });
};

let getdepartmen = (kode_entitas) => {
  // let valOne = kode_entitas;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_departement")
        .from("r_departemen as a")
        .where("a.kode_entitas", kode_entitas);
      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
    // try {
    //   // let data = db.knex1.raw("CALL cek('1')");
    //   // console.log(data);
    //   resolve(data);
    // } catch (error) {
    //   // console.log(error);
    //   resolve(false);
    // }
  });
};

let totalrealisasi = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal")
        .from("h_realisasi as a")
        .where("a.status_pengajuan", 2);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let totalanggaran = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal_anggaran")
        .sum("a.sisa_pengajuan as sisa_anggaran")
        .from("m_anggaran as a")
        .where("a.status_anggaran", 2);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let bulan = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1.select("*").from("r_bulan");
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsponsorship = (kode, u) => {
  // let monthVariable = bulan;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal ")
        // .select(
        //   // "e.nama_entitas",
        //   // "ba.nama_departement",
        //   // "f.nama_kelompok_mata_anggaran",
        //   // "d.nama_mata_anggaran",
        //   // "ca.nama_sub_mata_anggaran",
        //   // "a.kode_buku",
        //   "a.nominal"
        //   // "a.tanggal_realisasi",
        //   // "a.pkp"
        // )
        .from("h_realisasi as a")
        .leftJoin("h_pengajuan as b", "a.id_pengajuan", "b.id")
        .leftJoin("m_anggaran as c", "b.id_anggaran", "c.id")
        // .leftJoin(
        //   "r_sub_mata_anggaran as ca",
        //   "c.kode_sub_mata_anggaran",
        //   "ca.kode_sub_mata_anggaran"
        // )
        // .leftJoin(
        //   "r_mata_anggaran as d",
        //   "ca.kode_mata_anggaran",
        //   "d.kode_mata_anggaran"
        // )
        // .leftJoin(
        //   "r_kelompok_mata_anggaran as f",
        //   "ca.kode_kelompok_mata_anggaran",
        //   "f.kode_kelompok_mata_anggaran"
        // )
        // .leftJoin(
        //   "r_departemen as ba",
        //   "c.kode_departemen",
        //   "ba.kode_departement"
        // )
        // .leftJoin("r_entitas as e", "e.kode_entitas", "ba.kode_entitas")
        .where("a.status_pengajuan", 2)
        .where("a.status_validasi", 1)
        .where("c.kode_sub_mata_anggaran", kode)
        .andWhereRaw(`MONTH(validasi_date) = ?`, u);
      // .orderBy("a.nominal", "desc")
      // .limit(10);

      // .where(db.knex1.raw("EXTRACT(MONTH FROM validasi_date::date) = ?", 1));
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};
let getotalmataanggaran = (entitas1, kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal")
        .from("h_realisasi as a")
        .leftJoin("h_pengajuan as d", "a.id_pengajuan", "d.id")
        .leftJoin("m_anggaran as c", "d.id_anggaran", "c.id")
        .leftJoin(
          "r_departemen as b",
          "c.kode_departemen",
          "b.kode_departement"
        )
        .leftJoin(
          "r_sub_mata_anggaran as e",
          "c.kode_sub_mata_anggaran",
          "e.kode_sub_mata_anggaran"
        )
        .where("a.status_pengajuan", 2)
        .where("e.kode_mata_anggaran", "BK")
        .where("b.kode_entitas", entitas1);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getmataanggaranfy = (entitas1, kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal")
        .from("m_anggaran as a")
        .leftJoin(
          "r_departemen as b",
          "a.kode_departemen",
          "b.kode_departement"
        )
        .leftJoin(
          "r_sub_mata_anggaran as e",
          "a.kode_sub_mata_anggaran",
          "e.kode_sub_mata_anggaran"
        )
        .where("a.status_anggaran", 2)
        .where("e.kode_mata_anggaran", "BK")
        .where("b.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getsumtopupmataanggaran = (entitas1, kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal_topup as nominaltopup")
        .from("h_topup_anggaran as a")
        .leftJoin("m_anggaran as b", "a.id_anggaran", "b.id")
        .leftJoin(
          "r_departemen as c",
          "b.kode_departemen",
          "c.kode_departement"
        )
        .leftJoin(
          "r_sub_mata_anggaran as e",
          "b.kode_sub_mata_anggaran",
          "e.kode_sub_mata_anggaran"
        )
        .where("a.status", 2)
        .where("e.kode_mata_anggaran", "BK")
        .where("c.kode_entitas", entitas1);
      // .groupBy("a.id_anggaran");

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchmatanggarankurang = (entitas1, kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.bsu_inout as bsu_inout")
        .from("h_m_anggaran as a")
        .leftJoin("m_anggaran as b", "a.id_anggaran_awal", "b.id")
        .leftJoin(
          "r_departemen as c",
          "b.kode_departemen",
          "c.kode_departement"
        )
        .leftJoin(
          "r_sub_mata_anggaran as e",
          "b.kode_sub_mata_anggaran",
          "e.kode_sub_mata_anggaran"
        )
        .where("a.status_anggaran", 2)
        .where("e.kode_mata_anggaran", "BK")
        .where("c.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchmatanggarantambah = (entitas1, kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.bsu_inout as bsu_inout")
        .from("h_m_anggaran as a")
        .leftJoin("m_anggaran as b", "a.id_anggaran_final", "b.id")
        .leftJoin(
          "r_departemen as c",
          "b.kode_departemen",
          "c.kode_departement"
        )
        .leftJoin(
          "r_sub_mata_anggaran as e",
          "b.kode_sub_mata_anggaran",
          "e.kode_sub_mata_anggaran"
        )
        .where("a.status_anggaran", 2)
        .where("e.kode_mata_anggaran", "BK")
        .where("c.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getkodesubsponsorship = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_sub_mata_anggaran as ai")
        .distinct(
          db.knex1.raw(
            "	ai.kode_sub_mata_anggaran,ai.nama_sub_mata_anggaran, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) = '1') AS januari, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '2') AS febuari, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '3') AS maret, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '4') AS april, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '5') AS mei, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '6') AS juni, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) = '7') AS juli, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '8') AS agutus, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '9') AS september, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '10') AS oktober, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '11') AS november, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '12') AS desember "
          )
        )
        .whereIn(
          "ai.kode_sub_mata_anggaran",
          [550011, 550001, 550012, 550002, 550016]
        );
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

module.exports = {
  reportrealisasi,
  getanggaranfy,
  getsumswitchanggarankurang,
  getsumswitchanggarantambah,
  getsumtopupanggaran,
  getpresentaseanggaran,
  updatestatusnotif,
  listnotifikasi,
  countnotifikasi,
  getrealisasi,
  reportrealisasidepart,
  getdepartmen,
  totalrealisasi,
  totalanggaran,
  bulan,
  getsponsorship,
  getotalmataanggaran,
  getmataanggaranfy,
  getsumtopupmataanggaran,
  getsumswitchmatanggarankurang,
  getsumswitchmatanggarantambah,
  getkodesubsponsorship,
};
