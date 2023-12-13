let db = require("../config/database");
let helper = require("../helper/prefix/prefix.helper");

let reportrealisasi = (kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_sub_mata_anggaran", "a.nama_sub_mata_anggaran")
        .from("r_sub_mata_anggaran as a")
        .where("a.kode_mata_anggaran", kdmatanggaran);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumtopupanggaran = (kode_sub_mata_anggaran, entitas1) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("a.tahun", year)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("c.tahun", year)
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
  let year = today.getFullYear();

  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.presentasi as presentasi")
        .from("m_presentasi_anggaran as a")
        .where("a.tahun", year)

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

let totalrealisasi = (opexs) => {
  var d = new Date();
  let year = d.getFullYear();
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal")
        .from("h_realisasi as a")
        .leftJoin("h_pengajuan as b", "a.id_pengajuan", "b.id")
        .leftJoin("m_anggaran as c", "b.id_anggaran", "c.id")
        .leftJoin(
          "r_sub_mata_anggaran as ca",
          "c.kode_sub_mata_anggaran",
          "ca.kode_sub_mata_anggaran"
        )
        .where("ca.opex", opexs)
        .andWhereRaw(`YEAR(a.validasi_date) = ?`, year)
        .where("a.status_pengajuan", 2);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let totalanggaran = (opexs) => {
  var d = new Date();
  let year = d.getFullYear();
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .sum("a.nominal as nominal_anggaran")
        .sum("a.sisa_pengajuan as sisa_anggaran")
        .from("m_anggaran as a")
        .leftJoin(
          "r_sub_mata_anggaran as c",
          "c.kode_sub_mata_anggaran",
          "a.kode_sub_mata_anggaran"
        )
        .where("c.opex", opexs)
        .where("a.tahun", year)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .andWhereRaw(`MONTH(validasi_date) = ?`, u)
        .andWhereRaw(`YEAR(validasi_date) = ?`, year);
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
  var d = new Date();
  let year = d.getFullYear();
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
        .andWhereRaw(`YEAR(a.validasi_date) = ?`, year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("a.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
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
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
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
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) = '1' and YEAR(a.validasi_date) = YEAR(now())) AS januari, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '2' and YEAR(a.validasi_date) = YEAR(now())) AS febuari, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '3' and YEAR(a.validasi_date) = YEAR(now())) AS maret, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '4' and YEAR(a.validasi_date) = YEAR(now())) AS april, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '5' and YEAR(a.validasi_date) = YEAR(now())) AS mei, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '6' and YEAR(a.validasi_date) = YEAR(now())) AS juni, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) = '7' and YEAR(a.validasi_date) = YEAR(now())) AS juli, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '8' and YEAR(a.validasi_date) = YEAR(now())) AS agutus, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '9' and YEAR(a.validasi_date) = YEAR(now())) AS september, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '10' and YEAR(a.validasi_date) = YEAR(now())) AS oktober, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '11' and YEAR(a.validasi_date) = YEAR(now())) AS november, " +
              "(SELECT ifnull(sum( a.nominal ),0)FROM h_realisasi a " +
              "LEFT JOIN h_pengajuan b ON a.id_pengajuan = b.id " +
              "LEFT JOIN m_anggaran c ON b.id_anggaran = c.id  " +
              "WHERE c.kode_sub_mata_anggaran = ai.kode_sub_mata_anggaran and MONTH(a.validasi_date) <= '12' and YEAR(a.validasi_date) = YEAR(now())) AS desember "
          )
        )
        .whereIn(
          "ai.kode_sub_mata_anggaran",
          [550009, 550017, 550401, 550506, 550507]
        );
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getmataanggaran = (kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_mata_anggaran", "a.nama_mata_anggaran")
        .from("r_mata_anggaran as a")
        .where("a.kode_mata_anggaran", kdmatanggaran);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getkelmataanggaran = (kdkelmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select(
          "a.kode_kelompok_mata_anggaran",
          "a.nama_kelompok_mata_anggaran"
        )
        .from("r_kelompok_mata_anggaran as a")
        .where("a.kode_kelompok_mata_anggaran", kdkelmatanggaran);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getotalkelmataanggaran = (entitas1, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .andWhereRaw(`YEAR(a.validasi_date) = ?`, year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("b.kode_entitas", entitas1);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getkelmataanggaranfy = (entitas1, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("a.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("b.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getsumtopupkelmataanggaran = (entitas1, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
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

let getsumswitchkelmatanggarankurang = (entitas1, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("c.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchkelmatanggarantambah = (entitas1, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("c.kode_entitas", entitas1);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getanggaranfydepart = (kode_sub_mata_anggaran, kddepartemen) => {
  var d = new Date(),
  year = d.getFullYear();
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
        .where("a.tahun", year)
        .where("a.status_anggaran", 2)
        .where("a.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("b.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getsumtopupanggarandepart = (kode_sub_mata_anggaran, kddepartemen) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("b.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("c.kode_departement", kddepartemen);
      // .groupBy("a.id_anggaran");

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let anggaranswitchcsemindepart = (kode_sub_mata_anggaran, kddepartemen) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("b.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("c.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let anggaranswitchcseplusdepart = (kode_sub_mata_anggaran, kddepartemen) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("b.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("c.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let realisasidepart = (kode_sub_mata_anggaran, kddepartemen) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .andWhereRaw(`YEAR(a.validasi_date) = ?`, year)
        .where("c.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("b.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let realisasidepartmata = (kddepartemen, kdmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .andWhereRaw(`YEAR(a.validasi_date) = ?`, year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
        .where("b.kode_departement", kddepartemen);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let anggaranfydepartmata = (kddepartemen, kdmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("a.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
        .where("b.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getsumtopupmataanggarandepart = (kddepartemen, kdmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
        .where("c.kode_departement", kddepartemen);
      // .groupBy("a.id_anggaran");

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchmatanggarankurangdepart = (kddepartemen, kdmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
        .where("c.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchmatanggarantambahdepart = (kddepartemen, kdmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_mata_anggaran", kdmatanggaran)
        .where("c.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getotalkelmataanggarandepart = (kddepartemen, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .andWhereRaw(`YEAR(a.validasi_date) = ?`, year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("b.kode_departement", kddepartemen);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getkelmataanggaranfydepart = (kddepartemen, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("a.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("b.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getsumtopupkelmataanggarandepart = (kddepartemen, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("c.kode_departement", kddepartemen);
      // .groupBy("a.id_anggaran");

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchkelmatanggarankurangdepart = (kddepartemen, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("c.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchkelmatanggarantambahdepart = (kddepartemen, kdkelmatanggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        .where("c.kode_departement", kddepartemen);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getkodesubsponsorshiplist = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_sub_mata_anggaran", "a.nama_sub_mata_anggaran")
        .from("r_sub_mata_anggaran as a")
        .whereIn(
          "a.kode_sub_mata_anggaran",
          [550009, 550017, 550401, 550506, 550507,580804]
        );
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let realisasisponsor = (opex, kode_sub_mata_anggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .andWhereRaw(`YEAR(a.validasi_date) = ?`, year)
        .where("e.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("e.opex", opex);
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let anggaranfysponsor = (opex, kode_sub_mata_anggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("a.tahun", year)
        .where("e.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("e.opex", opex);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getsumtopupanggaransponsor = (opex, kode_sub_mata_anggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("e.opex", opex);
      // .groupBy("a.id_anggaran");

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchanggarankurangsponsor = (opex, kode_sub_mata_anggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("e.opex", opex);

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsumswitchanggarantambahsponsor = (opex, kode_sub_mata_anggaran) => {
  var d = new Date();
  let year = d.getFullYear();
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
        .where("b.tahun", year)
        .where("e.kode_sub_mata_anggaran", kode_sub_mata_anggaran)
        .where("e.opex", opex);

      // console.log(data);
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
  getmataanggaran,
  getotalkelmataanggaran,
  getkelmataanggaranfy,
  getsumtopupkelmataanggaran,
  getsumswitchkelmatanggarankurang,
  getsumswitchkelmatanggarantambah,
  getkelmataanggaran,
  getanggaranfydepart,
  getsumtopupanggarandepart,
  anggaranswitchcsemindepart,
  anggaranswitchcseplusdepart,
  realisasidepart,
  realisasidepartmata,
  anggaranfydepartmata,
  getsumtopupmataanggarandepart,
  getsumswitchmatanggarankurangdepart,
  getsumswitchmatanggarantambahdepart,
  getotalkelmataanggarandepart,
  getkelmataanggaranfydepart,
  getsumtopupkelmataanggarandepart,
  getsumswitchkelmatanggarankurangdepart,
  getsumswitchkelmatanggarantambahdepart,
  getkodesubsponsorshiplist,
  realisasisponsor,
  anggaranfysponsor,
  getsumtopupanggaransponsor,
  getsumswitchanggarankurangsponsor,
  getsumswitchanggarantambahsponsor
  
};
