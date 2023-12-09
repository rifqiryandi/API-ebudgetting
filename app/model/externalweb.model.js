// const { default: knex } = require("knex");
let db = require("../config/database");

let carikantor = (perPage, currentPage, cari, jnsktr) => {
  // var reqData = req.query;
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  var jnsktr_p = jnsktr;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .modify(function (queryBuilder) {
        if (jnsktr_p == "Agen") {
          queryBuilder.from("ffp_view_agen as a");
        } else if (jnsktr_p == "Kantor") {
          queryBuilder.from("ffp_view_kantor as a");
        } else {
          queryBuilder.from("ffp_view as a");
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("id_dirian", `%${params || ""}%`)
              .orWhereILike("nama_dirian", `%${params || ""}%`)
              .orWhereILike("kabupaten", `%${params || ""}%`)
              .orWhereILike("kodepos", `%${params || ""}%`)
              .orWhereILike("alamat", `%${params || ""}%`)
          );
        }
      })
      .first(),
    db.knex1
      .select(
        "a.nama_dirian",
        "a.kabupaten",
        "a.alamat",
        "a.id_dirian",
        "a.jenis",
        "b.deskripsi as jenisktr"
      )
      .modify(function (queryBuilder) {
        if (jnsktr_p == "Agen") {
          queryBuilder.from("ffp_view_agen as a");
        } else if (jnsktr_p == "Kantor") {
          queryBuilder.from("ffp_view_kantor as a");
        } else {
          queryBuilder.from("ffp_view as a");
        }
      })
      .leftJoin("r_jenisdirian as b", "a.jenis", "b.id")
      .offset(offset)
      .limit(per_page)
      .modify(function (queryBuilder) {
        if (jnsktr_p !== "Agen" && jnsktr_p !== "Kantor" && jnsktr_p !== "") {
          queryBuilder.where("a.jenis", jnsktr_p);
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("a.id_dirian", `%${params || ""}%`)
              .orWhereILike("a.nama_dirian", `%${params || ""}%`)
              .orWhereILike("a.kabupaten", `%${params || ""}%`)
              .orWhereILike("a.kodepos", `%${params || ""}%`)
              .orWhereILike("a.alamat", `%${params || ""}%`)
          );
        }
      }),
  ])
    .then(([total, rows]) => {
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      return pagination;
    })
    .catch(function (error) {
      resolve(error);
      // console.log(error);
    });
};

let carikantorbyregen = (
  perPage,
  currentPage,
  kelurahan,
  kecamatan,
  kabupaten,
  provinsi,
  jnsktr
) => {
  // var reqData = req.query;
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var kd_kelurahan = kelurahan;
  var kd_kecamatan = kecamatan;
  var kd_kabupaten = kabupaten;
  var kd_provinsi = provinsi;
  var jnsktr_p = jnsktr;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .modify(function (queryBuilder) {
        if (jnsktr_p == "Agen") {
          queryBuilder.from("ffp_view_agen as a");
        } else if (jnsktr_p == "Kantor") {
          queryBuilder.from("ffp_view_kantor as a");
        } else {
          queryBuilder.from("ffp_view as a");
        }
      })
      .leftJoin("r_jenisdirian as b", "a.jenis", "b.id")
      .modify(function (queryBuilder) {
        if (kd_kelurahan) {
          queryBuilder.where("a.kode_kelurahan", kd_kelurahan);
        } else if (kd_kecamatan) {
          queryBuilder.where("a.kode_kecamatan", kd_kecamatan);
        } else if (kd_kabupaten) {
          queryBuilder.where("a.kode_kabupaten", kd_kabupaten);
        } else {
          queryBuilder.where("a.kode_propinsi", kd_provinsi);
        }
      })
      .first(),

    db.knex1
      .select(
        "a.nama_dirian",
        "a.kabupaten",
        "a.alamat",
        "a.id_dirian",
        "a.jenis",
        "b.deskripsi as jenisktr"
      )
      .modify(function (queryBuilder) {
        if (jnsktr_p == "Agen") {
          queryBuilder.from("ffp_view_agen as a");
        } else if (jnsktr_p == "Kantor") {
          queryBuilder.from("ffp_view_kantor as a");
        } else {
          queryBuilder.from("ffp_view as a");
        }
      })
      .offset(offset)
      .limit(per_page)
      .leftJoin("r_jenisdirian as b", "a.jenis", "b.id")
      .modify(function (queryBuilder) {
        if (kd_kelurahan) {
          queryBuilder.where("a.kode_kelurahan", kd_kelurahan);
        } else if (kd_kecamatan) {
          queryBuilder.where("a.kode_kecamatan", kd_kecamatan);
        } else if (kd_kabupaten) {
          queryBuilder.where("a.kode_kabupaten", kd_kabupaten);
        } else {
          queryBuilder.where("a.kode_propinsi", kd_provinsi);
        }
      }),
  ])
    .then(([total, rows]) => {
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      return pagination;
    })
    .catch(function (error) {
      resolve(error);
      // console.log(error);
    });
};

let detailktr = (id_dirian) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("ffp as a")
        .select(
          "a.nama_dirian",
          "a.alamat",
          "a.telpon_old",
          "a.latitude",
          "a.longitude",
          "b.deskripsi as jenis"
        )
        .leftJoin("r_jenisdirian as b", "a.jenis", "b.id")
        .where({
          id_dirian: id_dirian,
          "a.status": 1,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      resolve(false);
    }
  });
};

let detailayanan = (iddirian) => {
  let params = iddirian;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("ffp_layanan as a")
        .distinct(
          db.knex1.raw(
            "b.deskripsi, " +
              "( SELECT CONCAT(b.jamlayanan,'|',c.real_loket)  FROM ffp_layanan b " +
              "left join ffp_layanan_otlet c on b.id_layanan = c.id_layanan and b.id_dirian = c.id_dirian " +
              "WHERE b.id_dirian = a.id_dirian AND b.hari = '1' AND b.id_layanan = a.id_layanan  ) AS senin," +
              "( SELECT CONCAT(b.jamlayanan,'|',c.real_loket)  FROM ffp_layanan b " +
              "left join ffp_layanan_otlet c on b.id_layanan = c.id_layanan and b.id_dirian = c.id_dirian " +
              "WHERE b.id_dirian = a.id_dirian AND b.hari = '2' AND b.id_layanan = a.id_layanan  ) AS selasa," +
              "( SELECT CONCAT(b.jamlayanan,'|',c.real_loket)  FROM ffp_layanan b " +
              "left join ffp_layanan_otlet c on b.id_layanan = c.id_layanan and b.id_dirian = c.id_dirian " +
              "WHERE b.id_dirian = a.id_dirian AND b.hari = '3' AND b.id_layanan = a.id_layanan  ) AS rabu," +
              "( SELECT CONCAT(b.jamlayanan,'|',c.real_loket)  FROM ffp_layanan b " +
              "left join ffp_layanan_otlet c on b.id_layanan = c.id_layanan and b.id_dirian = c.id_dirian " +
              "WHERE b.id_dirian = a.id_dirian AND b.hari = '4' AND b.id_layanan = a.id_layanan  ) AS kamis," +
              "( SELECT CONCAT(b.jamlayanan,'|',c.real_loket)  FROM ffp_layanan b " +
              "left join ffp_layanan_otlet c on b.id_layanan = c.id_layanan and b.id_dirian = c.id_dirian " +
              "WHERE b.id_dirian = a.id_dirian AND b.hari = '5' AND b.id_layanan = a.id_layanan  ) AS jumat," +
              "( SELECT CONCAT(b.jamlayanan,'|',c.real_loket)  FROM ffp_layanan b " +
              "left join ffp_layanan_otlet c on b.id_layanan = c.id_layanan and b.id_dirian = c.id_dirian " +
              "WHERE b.id_dirian = a.id_dirian AND b.hari = '6' AND b.id_layanan = a.id_layanan  ) AS sabtu," +
              "( SELECT CONCAT(b.jamlayanan,'|',c.real_loket)  FROM ffp_layanan b " +
              "left join ffp_layanan_otlet c on b.id_layanan = c.id_layanan and b.id_dirian = c.id_dirian " +
              "WHERE b.id_dirian = a.id_dirian AND b.hari = '7' AND b.id_layanan = a.id_layanan  ) AS minggu "
          )
        )
        .leftJoin("r_layanan as b", "a.id_layanan", "b.id")
        .where(db.knex1.raw("a.id_dirian = ?", params));

      resolve(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let detailayanantop1 = (id_dirian) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("ffp_layanan as a")
        .distinct("b.deskripsi as layanan")
        .leftJoin("r_layanan as b", "a.id_layanan", "b.id")
        .where({
          id_dirian: id_dirian,
        });
      resolve(data);
    } catch (error) {
      console.log(error);
      resolve(false);
    }
  });
};

let detaijamlayanantop1 = (id_dirian) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("ffp_layanan as a")
        .limit(1)
        .select("a.jamlayanan")
        .where({
          id_dirian: id_dirian,
        })
        .orderBy("a.hari", "asc");
      resolve(data);
    } catch (error) {
      console.log(error);
      resolve(false);
    }
  });
};

let detailayananall = (id_dirian, hari) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("ffp_layanan as a")
        .select("a.jamlayanan")
        // .leftJoin("r_layanan as b", "a.id_layanan", "b.id")
        .where({
          id_dirian: id_dirian,
          hari: hari,
        })
        .orderBy("a.hari", "asc");
      resolve(data);
    } catch (error) {
      console.log(error);
      // resolve(false);
    }
  });
};

let getkantor = (kotakab) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("ffp as a")
        .select(
          "a.nama_dirian",
          "a.id_dirian",
          "a.alamat",
          "a.id_dirian",
          "a.longitude",
          "a.latitude",
          "b.Nama_Kelurahan_Desa",
          "c.Nama_Kecamatan",
          "d.Nama_Kabupaten_Kota",
          "e.Nama_Propinsi"
        )
        .leftJoin(
          "kelurahandesa as b",
          "a.kode_kelurahan",
          "b.Kode_Kelurahan_Desa"
        )
        .leftJoin("kecamatan as c", "a.kode_kecamatan", "c.Kode_Kecamatan")
        .leftJoin(
          "kabupatenkota as d",
          "a.kode_kabupaten",
          "d.Kode_Kabupaten_Kota"
        )
        .leftJoin("propinsi as e", "a.kode_propinsi", "e.Kode_Propinsi")
        .where({
          kode_kabupaten: kotakab,
        })
        .whereIn("a.jenis", [7, 8, 11, 12, 13, 14]);

      resolve(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getkantorbyname = (kotakab) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex3
        .from("masterkantor as a")
        .select(
          "a.Nama_Pos_Dirian as nama_dirian",
          "a.Nomor_Dirian as id_dirian",
          "a.Alamat as alamat",
          "b.Lon as longitude",
          "b.Lat as latitude",
          "a.Kelurahan as kelurahan",
          "a.Kecamatan as kecamatan",
          "a.Kabupaten as kabupaten",
          "c.Nama_Propinsi as propinsi",
          "a.Kodepos as kodepos",
          "a.Tanggal_Buka as tgl_berlaku",
          "a.jenis as kode_cabang"
        )
        .leftJoin("posisikantor as b", "a.Nomor_Dirian", "b.ID_Kantor")
        .leftJoin("propinsi as c", "a.Propinsi", "c.Kode_Propinsi")
        .whereILike("a.Kabupaten", `%${kotakab || ""}%`)
        .whereIn("a.jenis", ["KC", "KCU", "KpcDk", "KpcLk", "Kpd", "Kprk"]);

      resolve(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

// let getkantorbyname = (kotakab) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .from("ffp as a")
//         .select(
//           "a.nama_dirian",
//           "a.id_dirian",
//           "a.alamat",
//           "a.id_dirian",
//           "a.longitude",
//           "a.latitude",
//           "a.kelurahan",
//           "a.kecamatan",
//           "a.kabupaten",
//           "a.propinsi"
//         )
//         .whereILike("kabupaten", `%${kotakab || ""}%`)
//         .whereIn("a.jenis", [7, 8, 11, 12, 13, 14]);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// SELECT a.Nama_Pos_Dirian,a.Nomor_Dirian,a.Alamat,b.Lat,b.Lon,a.Kelurahan,a.Kecamatan,a.Kabupaten,c.Nama_Propinsi from masterkantor a
// left join posisikantor b on a.Nomor_Dirian = b.ID_Kantor
// left join propinsi c on a.Propinsi = c.Kode_Propinsi
// where a.Propinsi = 'ID-JT'

module.exports = {
  carikantor,
  carikantorbyregen,
  detailktr,
  detailayanan,
  detailayanantop1,
  detaijamlayanantop1,
  detailayananall,
  getkantor,
  getkantorbyname,
};
