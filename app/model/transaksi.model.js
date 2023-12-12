let db = require("../config/database");
let helper = require("../helper/prefix/prefix.helper");

let inputanggaran = (
  kdsubmatanggaran,
  kddepartemen,
  nominal,
  userid,
  tahun,
  keterangan,
  status
) => {
  var kdsubmatanggaran_p = kdsubmatanggaran;
  var kddepartemen_p = kddepartemen;
  var nominal_p = nominal;
  var userid_p = userid;
  var tahun_p = tahun;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_departemen")
        .from("m_anggaran")
        .where("kode_sub_mata_anggaran", kdsubmatanggaran_p)
        .where("kode_departemen", kddepartemen_p)
        .where("tahun", tahun_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) === 0) {
            return db.knex1
              .insert([
                {
                  kode_sub_mata_anggaran: kdsubmatanggaran_p,
                  kode_departemen: kddepartemen_p,
                  tahun: tahun_p,
                  nominal: nominal_p,
                  create_by: userid_p,
                  create_date: dateTime,
                  update_date: null,
                  keterangan: keterangan,
                  status_anggaran: status,
                  susunan_anggaran: nominal_p,
                  sisa_pengajuan: nominal_p,
                },
              ])
              .into("m_anggaran")
              .then((newUserId) => {
                // console.log("inserted user", newUserId);
                let response = newUserId.length + "Tambah";
                resolve(response);
                console.log(response);
              })
              .catch(function (error) {
                resolve(error);
              });
          } else {
            resolve(userNameList.length);
          }
        });
    } catch (error) {
      // console.log("asd");
      resolve(error);
    }
    // try {
    //   let data = db.knex1
    //     .insert([
    //       {
    //         kode_sub_mata_anggaran: kdsubmatanggaran_p,
    //         kode_departemen: kddepartemen_p,
    //         tahun: tahun_p,
    //         nominal: nominal_p,
    //         create_by: userid_p,
    //         create_date: dateTime,
    //         update_date: null,
    //         keterangan: keterangan,
    //         status_anggaran: status,
    //         susunan_anggaran: nominal_p,
    //         sisa_pengajuan: nominal_p,
    //       },
    //     ])
    //     .into("m_anggaran");
    //   resolve(data);
    // } catch (error) {
    //   // console.log("asd");
    //   resolve(error);
    // }
  });
};

let listtransaksi = (
  kdsubmatanggaran,
  kddepartemen,
  kelmatanggaran,
  matanggaran,
  status,
  perPage,
  currentPage,
  cari,
  tahun
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("m_anggaran as a")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "a.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "a.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "a.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (matanggaran !== "") {
          queryBuilder.whereILike(
            "c.kode_mata_anggaran",
            `%${matanggaran || ""}%`
          );
        }  else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "a.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else if (kelmatanggaran !== "") {
          queryBuilder.whereILike(
            "c.kode_kelompok_mata_anggaran",
            `%${kelmatanggaran || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("a.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("a.status_anggaran", `%${status || ""}%`)
      .whereILike("a.tahun", `%${tahun || ""}%`)
      .first(),
    db.knex1
      .select(
        "e.kode_entitas",
        "b.kode_departement",
        "f.kode_kelompok_mata_anggaran",
        "c.kode_mata_anggaran",
        "c.kode_sub_mata_anggaran",
        "a.id as id_anggaran",
        "e.nama_entitas",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "a.nominal",
        "a.tahun",
        "a.keterangan",
        "a.status_anggaran",
        "a.sisa_pengajuan as sisa_anggaran"
      )
      .from("m_anggaran as a")
      .offset(offset)
      .limit(per_page)
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "a.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "a.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "a.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (matanggaran !== "") {
          queryBuilder.whereILike(
            "c.kode_mata_anggaran",
            `%${matanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "a.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else if (kelmatanggaran !== "") {
          queryBuilder.whereILike(
            "c.kode_kelompok_mata_anggaran",
            `%${kelmatanggaran || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("a.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("a.status_anggaran", `%${status || ""}%`)
      .whereILike("a.tahun", `%${tahun || ""}%`)
      .orderBy([{ column: "a.create_date", order: "desc" }]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      resolve(error);
      // console.log(error);
    });
};

let inputpresenanggaran = (
  // id_anggaran,
  bulan,
  userid,
  presentasi,
  tahun
  // nominal,
  // sisanominal
) => {
  // var id_anggaran_p = id_anggaran;
  var bulan_p = bulan;
  var userid_p = userid;
  var presentasi_p = presentasi;
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
            //id_anggaran: id_anggaran_p,
            bulan: bulan_p,
            tahun: tahun,
            create_by: userid_p,
            create_date: dateTime,
            update_date: null,
            presentasi: presentasi_p,
            // nominal: nominal,
          },
        ])
        .into("m_presentasi_anggaran");
      resolve(data);
    } catch (error) {
      // console.log("asd");
      resolve(error);
    }

    // db.knex1
    //   .transaction(function (trx) {
    //     db.knex1
    //       .insert([
    //         {
    //           // id_anggaran: id_anggaran_p,
    //           bulan: bulan_p,
    //           tahun: tahun,
    //           create_by: userid_p,
    //           create_date: dateTime,
    //           update_date: null,
    //           presentasi: presentasi_p,
    //           // nominal: nominal,
    //         },
    //       ])
    //       .into("m_presentasi_anggaran")
    //       .then(async function (trx) {
    //         return await db
    //           .knex1("m_anggaran")
    //           .where({
    //             id: id_anggaran_p,
    //             // id_pengajuan: id_pengajuan_p,
    //           })
    //           .update({
    //             susunan_anggaran: sisanominal,
    //           });
    //       })
    //       .then(trx.commit)
    //       .catch(trx.rollback);
    //   })
    //   .then(function (inserts) {
    //     resolve(inserts);
    //     // console.log(inserts);
    //   })
    //   .catch(function (error) {
    //     resolve(error);
    //     // console.log(error);
    //   });
  });
};

const getidanggaran = (
  idanggaran,
  status,
  kddepartemen,
  kdmatanggaran,
  idanggaranawal
) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("m_anggaran as a")
        .select("a.*", "c.nama_sub_mata_anggaran", "b.nama_departement")
        .leftJoin(
          "r_sub_mata_anggaran as c",
          "a.kode_sub_mata_anggaran",
          "c.kode_sub_mata_anggaran"
        )
        .leftJoin(
          "r_departemen as b",
          "a.kode_departemen",
          "b.kode_departement"
        )
        .whereILike("a.id", `%${idanggaran || ""}%`)
        .whereILike("a.status_anggaran", `%${status || ""}%`)
        .whereILike("a.kode_departemen", `%${kddepartemen || ""}%`)
        .whereILike("c.kode_mata_anggaran", `%${kdmatanggaran || ""}%`)
        .modify(function (queryBuilder) {
          if (idanggaranawal !== "") {
            queryBuilder.where((whereBuilder) =>
              whereBuilder.whereNot("a.id", idanggaranawal)
            );
          }
        });

      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

const getidkegiatan = (idkegiatan, status, kddepartemen, kdsubmatanggaran,bulan) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("h_kegiatan as a")
        .select(
          "a.*",
          "c.nama_sub_mata_anggaran",
          "b.nama_departement",
          "c.kode_sub_mata_anggaran",
          "b.kode_departement",
          "h.sisa_pengajuan"
        )
        .leftJoin("m_anggaran as h", "a.id_anggaran", "h.id")
        .leftJoin(
          "r_sub_mata_anggaran as c",
          "h.kode_sub_mata_anggaran",
          "c.kode_sub_mata_anggaran"
        )
        .leftJoin(
          "r_departemen as b",
          "h.kode_departemen",
          "b.kode_departement"
        )
        // .whereNot("h.status_anggaran", 3)
        .where("a.bulan_kegiatan", bulan)
        
        .where("h.kode_sub_mata_anggaran", kdsubmatanggaran)
        // .whereNot("a.status", 2)
        .whereILike("a.id", `%${idkegiatan || ""}%`)
        .whereILike("a.status", `%${status || ""}%`)
        .whereILike("h.kode_departemen", `%${kddepartemen || ""}%`);

      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

const getsisanggarankegiatan = (id_anggaran) => {
  console.log(id_anggaran);
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("m_anggaran as a")
        .select("a.id", "a.nominal as nominal_a")
        .sum("c.nominal as nominal_k")
        .leftJoin("h_kegiatan as c", "a.id", "c.id_anggaran")
        .where("a.id", id_anggaran);
      // .whereILike("a.id", `%${idanggaran || ""}%`)
      // .whereILike("a.status_anggaran", `%${status || ""}%`);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

let listpresentasianggaran = (
  // kdsubmatanggaran,
  // kddepartemen,
  perPage,
  currentPage,
  cari
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;

  return Promise.all([
    db.knex1
      .count("* as count")
      .from("m_presentasi_anggaran as a")
      // .leftJoin("m_anggaran as d", "a.id_anggaran", "d.id")
      // .leftJoin(
      //   "r_sub_mata_anggaran as c",
      //   "d.kode_sub_mata_anggaran",
      //   "c.kode_sub_mata_anggaran"
      // )
      // .leftJoin("r_departemen as b", "d.kode_departemen", "b.kode_departement")
      .leftJoin("r_bulan as e", "a.bulan", "e.id_bulan")
      // .modify(function (queryBuilder) {
      //   if (kdsubmatanggaran !== "") {
      //     queryBuilder.whereILike(
      //       "d.kode_sub_mata_anggaran",
      //       `%${kdsubmatanggaran || ""}%`
      //     );
      //   } else if (kddepartemen !== "") {
      //     queryBuilder.whereILike(
      //       "d.kode_departemen",
      //       `%${kddepartemen || ""}%`
      //     );
      //   } else {
      //   }
      // })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              // .whereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              // .orWhereILike("b.nama_departement", `%${params || ""}%`)
              // .orWhereILike("e.deskripsi", `%${params || ""}%`)
              // .orWhereILike("d.nominal", `%${params || ""}%`)
              .whereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("e.deskripsi", `%${params || ""}%`)
          );
        }
      })
      .first(),
    db.knex1
      .select(
        "a.*",
        // "a.*",
        // "c.nama_sub_mata_anggaran",
        // "b.nama_departement",
        "e.deskripsi as bulan"
        // "d.nominal as nominal_fy"
      )
      .from("m_presentasi_anggaran as a")
      .offset(offset)
      .limit(per_page)
      // .leftJoin("m_anggaran as d", "a.id_anggaran", "d.id")
      // .leftJoin(
      //   "r_sub_mata_anggaran as c",
      //   "d.kode_sub_mata_anggaran",
      //   "c.kode_sub_mata_anggaran"
      // )
      // .leftJoin("r_departemen as b", "d.kode_departemen", "b.kode_departement")
      .leftJoin("r_bulan as e", "a.bulan", "e.id_bulan")
      // .modify(function (queryBuilder) {
      //   if (kdsubmatanggaran !== "") {
      //     queryBuilder.whereILike(
      //       "d.kode_sub_mata_anggaran",
      //       `%${kdsubmatanggaran || ""}%`
      //     );
      //   } else if (kddepartemen !== "") {
      //     queryBuilder.whereILike(
      //       "d.kode_departemen",
      //       `%${kddepartemen || ""}%`
      //     );
      //   } else {
      //   }
      // })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              // .whereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              // .orWhereILike("b.nama_departement", `%${params || ""}%`)
              // .orWhereILike("e.deskripsi", `%${params || ""}%`)
              // .orWhereILike("d.nominal", `%${params || ""}%`)
              .whereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("e.deskripsi", `%${params || ""}%`)
          );
        }
      }),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
};

let validasialokasi = (id_anggaran, status) => {
  let id_p = id_anggaran;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("m_anggaran")
        .where({
          id: id_p,
        })
        .update({
          status_anggaran: status,
          update_date: dateTime,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let validasikegiatan = (id_kegiatan, status) => {
  let id_p = id_kegiatan;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("h_kegiatan")
        .where({
          id: id_p,
        })
        .update({
          status: status,
          update_date: dateTime,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let inskegiatan = (id_anggaran, kegiatan, nominal, userid, bulan) => {
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
            id_anggaran: id_anggaran,
            kegiatan: kegiatan,
            nominal: nominal,
            create_by: userid,
            create_date: dateTime,
            update_date: null,
            bulan_kegiatan: bulan,
            status: 0,
          },
        ])
        .into("h_kegiatan");
      resolve(data);
    } catch (error) {
      // console.log("asd");
      resolve(error);
    }
  });
};

let listkegiatan = (
  kdsubmatanggaran,
  kddepartemen,
  status,
  perPage,
  currentPage,
  cari,
  bulan
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("h_kegiatan as a")
      .leftJoin("m_anggaran as h", "a.id_anggaran", "h.id")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "h.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "h.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .leftJoin("r_bulan as g", "a.bulan_kegiatan", "g.id_bulan")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "h.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "h.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .whereILike("a.status", `%${status || ""}%`)
      .where("a.bulan_kegiatan", bulan)
      .andWhereRaw(`YEAR(a.create_date) = year(now())`)
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("h.tahun", `%${params || ""}%`)
              .orWhereILike("h.keterangan", `%${params || ""}%`)
              .orWhereILike("h.status_anggaran", `%${params || ""}%`)
              .orWhereILike("a.kegiatan", `%${params || ""}%`)
              .orWhereILike("h.nominal", `%${params || ""}%`)
              .orWhereILike("g.deskripsi", `%${params || ""}%`)
              .orWhereILike("a.id", `%${params || ""}%`)
              .orWhereILike("h.susunan_anggaran", `%${params || ""}%`)
          );
        }
      })
      .first(),
    db.knex1
      .select(
        // "e.kode_entitas",
        // "b.kode_departement",
        // "f.kode_kelompok_mata_anggaran",
        // "c.kode_mata_anggaran",
        // "c.kode_sub_mata_anggaran",
        "e.nama_entitas",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "a.nominal as nonimal_anggaran",
        "h.tahun",
        "h.keterangan",
        "h.status_anggaran",
        "a.kegiatan",
        "h.nominal as nominal_kegiatan",
        "g.deskripsi as bulan",
        "a.id as id_kegiatan",
        "h.susunan_anggaran as sisa_anggaran",
        "a.status as status_kegiatan"
      )
      .from("h_kegiatan as a")
      .offset(offset)
      .limit(per_page)
      .leftJoin("m_anggaran as h", "a.id_anggaran", "h.id")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "h.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "h.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .leftJoin("r_bulan as g", "a.bulan_kegiatan", "g.id_bulan")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "h.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "h.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .whereILike("a.status", `%${status || ""}%`)
      .where("a.bulan_kegiatan", bulan)
      .andWhereRaw(`YEAR(a.create_date) = year(now())`)
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("h.tahun", `%${params || ""}%`)
              .orWhereILike("h.keterangan", `%${params || ""}%`)
              .orWhereILike("h.status_anggaran", `%${params || ""}%`)
              .orWhereILike("a.kegiatan", `%${params || ""}%`)
              .orWhereILike("h.nominal", `%${params || ""}%`)
              .orWhereILike("g.deskripsi", `%${params || ""}%`)
              .orWhereILike("a.id", `%${params || ""}%`)
              .orWhereILike("h.susunan_anggaran", `%${params || ""}%`)
          );
        }
      })
      .orderBy([{ column: "a.id", order: "desc" }]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
  // return new Promise(async function (resolve) {
  //   try {
  //     let data = db.knex1
  //       .from("h_kegiatan as a")
  //       .select(
  //         // "e.kode_entitas",
  //         // "b.kode_departement",
  //         // "f.kode_kelompok_mata_anggaran",
  //         // "c.kode_mata_anggaran",
  //         // "c.kode_sub_mata_anggaran",
  //         "e.nama_entitas",
  //         "b.nama_departement",
  //         "f.nama_kelompok_mata_anggaran",
  //         "d.nama_mata_anggaran",
  //         "c.nama_sub_mata_anggaran",
  //         "a.nominal as nonimal_anggaran",
  //         "h.tahun",
  //         "h.keterangan",
  //         "h.status_anggaran",
  //         "a.kegiatan",
  //         "h.nominal as nominal_kegiatan"
  //       )
  //       .leftJoin("m_anggaran as h", "a.id_anggaran", "h.id")
  //       .leftJoin(
  //         "r_sub_mata_anggaran as c",
  //         "h.kode_sub_mata_anggaran",
  //         "c.kode_sub_mata_anggaran"
  //       )
  //       .leftJoin(
  //         "r_mata_anggaran as d",
  //         "c.kode_mata_anggaran",
  //         "d.kode_mata_anggaran"
  //       )
  //       .leftJoin(
  //         "r_kelompok_mata_anggaran as f",
  //         "c.kode_kelompok_mata_anggaran",
  //         "f.kode_kelompok_mata_anggaran"
  //       )
  //       .leftJoin(
  //         "r_departemen as b",
  //         "h.kode_departemen",
  //         "b.kode_departement"
  //       )
  //       .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
  //       .modify(function (queryBuilder) {
  //         if (kdsubmatanggaran !== "") {
  //           queryBuilder.whereILike(
  //             "a.kode_sub_mata_anggaran",
  //             `%${kdsubmatanggaran || ""}%`
  //           );
  //         } else if (kddepartemen !== "") {
  //           queryBuilder.whereILike(
  //             "a.kode_departemen",
  //             `%${kddepartemen || ""}%`
  //           );
  //         } else {
  //         }
  //       })
  //       .whereILike("h.status_anggaran", `%${status || ""}%`);

  //     // console.log(data);
  //     resolve(data);
  //   } catch (error) {
  //     resolve(error);
  //   }
  // });
};

let inspengajuan = (
  id_anggaran,
  jnspengajuan,
  id_kegiatan,
  nominal,
  userid,
  uraian_kegiatan,
  sisa_nominal,
  bulan_pengajuan
  // lampiran
) => {
  var id_anggaran_p = id_anggaran;
  var jnspengajuan_p = jnspengajuan;
  var id_kegiatan_p = id_kegiatan;
  var userid_p = userid;
  var nominal_p = nominal;
  // var lampiran_p = lampiran;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  let stat;
  /*  if (jnspengajuan_p == "PK") {
    stat = 2;
  } else {
    stat = 3;
  } */
  // return new Promise(async function (resolve) {
  //   try {
  //     let data = db.knex1
  //       .insert([
  //         {
  //           id_anggaran: id_anggaran_p,
  //           jenis_pengajuan: jnspengajuan_p,
  //           id_kegiatan: id_kegiatan_p,
  //           nominal: nominal_p,
  //           create_date: dateTime,
  //           update_date: null,
  //           user_id: userid_p,
  //           status_pengajuan: 0,
  //           prefix_kegiatan: 1,
  //           uraian_kegiatan: uraian_kegiatan,
  //         },
  //       ])
  //       .into("h_pengajuan");
  //     resolve(data);
  //   } catch (error) {
  //     // console.log("asd");
  //     resolve(error);
  //   }
  // });
  return new Promise(async function (resolve) {
    db.knex1
      .transaction(function (trx) {
        db.knex1
          .insert([
            {
              id_anggaran: id_anggaran_p,
              jenis_pengajuan: jnspengajuan_p,
              id_kegiatan: id_kegiatan_p,
              nominal: nominal_p,
              create_date: dateTime,
              update_date: null,
              user_id: userid_p,
              status_pengajuan: 0,
              prefix_kegiatan: 1,
              uraian_kegiatan: uraian_kegiatan,
              bulan_pengajuan: bulan_pengajuan,
            },
          ])
          .into("h_pengajuan")
          .then(async function (trx) {
            let id_peng = trx[0];
            resolve(id_peng);
            // console.log(id_peng);

            return await db
              .knex1("m_anggaran")
              .where({
                id: id_anggaran_p,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                sisa_pengajuan: sisa_nominal,
                status_anggaran: 2,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback)
          .then(async function (trx) {
            return await db
              .knex1("h_kegiatan")
              .where({
                id: id_kegiatan_p,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                status: 2,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function (inserts) {
        // let id_peng = trx[0];
        resolve(inserts);
        // console.log(id_peng);
      })
      .catch(function (error) {
        resolve(error);
        // console.log(error);
      });
  });
};

const getpengajuanpk = (id_pengajuan,kddepartemen) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("h_pengajuan as a")

        .select(
          "a.jenis_pengajuan",
          "a.nominal",
          "c.nama_sub_mata_anggaran",
          "b.nama_departement",
          "b.kode_departement",
          "c.kode_sub_mata_anggaran",
          "a.id as id_pengajuan",
          "a.id_anggaran ",
          "i.id_pengajuan ",
          "a.id as id_pengajuan "
        )
        .sum("i.nominal as nominal_realisasi")
        .leftJoin("h_pengajuan_pk as i", "a.id", "i.id_pengajuan")
        .leftJoin("m_anggaran as h", "a.id_anggaran", "h.id")
        .leftJoin(
          "r_sub_mata_anggaran as c",
          "h.kode_sub_mata_anggaran",
          "c.kode_sub_mata_anggaran"
        )
        .leftJoin(
          "r_departemen as b",
          "h.kode_departemen",
          "b.kode_departement"
        )
        .where("a.status_pengajuan", 1)
        .where("a.jenis_pengajuan", "PK")
        .whereILike("h.kode_departemen", `%${kddepartemen || ""}%`)
        .whereILike("a.id", `%${id_pengajuan || ""}%`)
        .groupBy(
          "a.nominal",
          "i.id_pengajuan",
          "a.id_anggaran",
          "a.jenis_pengajuan",
          "c.nama_sub_mata_anggaran",
          "b.nama_departement",
          "h.sisa_pengajuan",
          "a.id"
        )
        .orderBy([{ column: "a.id", order: "desc" }]);

      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

const getsisanggaranpengajuan = (id_anggaran) => {
  // console.log(id_anggaran);
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("m_anggaran as a")
        .select("a.id", "a.nominal as nominal_a")
        .sum("c.nominal as nominal_k")
        .leftJoin("h_pengajuan as c", "a.id", "c.id_anggaran")
        .where("a.id", id_anggaran);
      // .whereILike("a.id", `%${idanggaran || ""}%`)
      // .whereILike("a.status_anggaran", `%${status || ""}%`);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

const getsisanggaranpengajuanpk = (id_pengajuan) => {
  // console.log(id_anggaran);
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("h_pengajuan_pk as a")
        .sum("a.nominal as total_nominal")
        .where("a.id_pengajuan", id_pengajuan)
        .whereNot("a.status_pengajuan", 2);

      // console.log(data);
      resolve(data);
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

let listpengajaun = (
  kdsubmatanggaran,
  kddepartemen,
  status_anggaran,
  status_pengajuan,
  jenis_pengajuan,
  perPage,
  currentPage,
  cari
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("h_pengajuan as a")
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("g.status_anggaran", `%${status_anggaran || ""}%`)
      .whereILike("a.status_pengajuan", `%${status_pengajuan || ""}%`)
      .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
      .first(),
    db.knex1
      .select(
        // "e.kode_entitas",
        "b.kode_departement",
        // "f.kode_kelompok_mata_anggaran",
        // "c.kode_mata_anggaran",
        "c.kode_sub_mata_anggaran",
        "a.id",
        "a.jenis_pengajuan",
        "a.id_anggaran",
        "a.id_kegiatan",
        "k.kegiatan as uraian_kegiatan",
        "e.nama_entitas",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "g.nominal",
        "g.tahun",
        "a.status_pengajuan",
        "a.uraian_kegiatan as uraian_pengajuan",
        "a.nominal as nominal_pengajuan",
        "g.sisa_pengajuan as sisanominal_pengajuan",
        "a.prefix_kegiatan"
      )
      // .sum("a.nominal as nominal_pengajuan")
      .from("h_pengajuan as a")
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
      .offset(offset)
      .limit(per_page)
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("g.status_anggaran", `%${status_anggaran || ""}%`)
      .whereILike("a.status_pengajuan", `%${status_pengajuan || ""}%`)
      .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
      .orderBy([
        { column: "a.create_date", order: "desc" },
        { column: "g.tahun", order: "desc" },
        { column: "e.kode_entitas", order: "asc" },
        { column: "b.nama_departement", order: "asc" },
        { column: "f.kode_kelompok_mata_anggaran", order: "asc" },
        { column: "d.kode_mata_anggaran", order: "asc" },
        { column: "c.kode_sub_mata_anggaran", order: "asc" },
      ]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
};

let listrealisasi = (
  kdsubmatanggaran,
  kddepartemen,
  jenis_pengajuan,
  perPage,
  currentPage,
  cari,
  status_pengajuan,
  tanggalawal,
  tanggalakhir
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      // .from("h_realisasi as i")
      // .leftJoin("h_pengajuan as a", "i.id_pengajuan", "a.id")
      .modify(function (queryBuilder) {
        if (jenis_pengajuan !== "PK") {
          queryBuilder
            .from("h_realisasi as i")
            .leftJoin("h_pengajuan as a", "i.id_pengajuan", "a.id");
        } else {
          queryBuilder
            .from("h_realisasi as i")
            .leftJoin("h_pengajuan_pk as j", "i.id_pengajuan", "j.id")
            .leftJoin("h_pengajuan as a", "j.id_pengajuan", "a.id");
        }
      })
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .modify(function (queryBuilder) {
        if (tanggalawal !== "" || tanggalakhir !== "") {
          queryBuilder.whereBetween("i.create_date", [
            tanggalawal,
            tanggalakhir,
          ]);
        } else {
        }
      })
      // .whereBetween("i.create_date", [tanggalawal, tanggalakhir])
      .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
      .whereILike("i.status_pengajuan", `%${status_pengajuan || ""}%`)
      .first(),
    db.knex1
      .select(
        // "e.kode_entitas",
        "b.kode_departement",
        // "f.kode_kelompok_mata_anggaran",
        // "c.kode_mata_anggaran",
        "c.kode_sub_mata_anggaran",
        "a.id",
        "a.jenis_pengajuan",
        "a.id_anggaran",
        "a.id_kegiatan",
        "k.kegiatan as uraian_kegiatan",
        "e.nama_entitas",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "g.nominal",
        "g.tahun",
        "a.status_pengajuan",
        "a.uraian_kegiatan as uraian_pengajuan",
        "i.nominal",
        "i.kode_pengajuan",
        "i.kode_buku",
        "i.tanggal_pengajuan",
        "i.tanggal_realisasi",
        "i.keterangan",
        "i.id as id_realisasi",
        "i.status_pengajuan as status_realisasi",
        "i.pkp",
        "i.status_validasi",
        "i.validasi_date",
        "i.nomor_faktur",
        "i.tanggal_faktur"
      )
      // .sum("a.nominal as nominal_pengajuan")
      .modify(function (queryBuilder) {
        if (jenis_pengajuan !== "PK") {
          queryBuilder
            .from("h_realisasi as i")
            .leftJoin("h_pengajuan as a", "i.id_pengajuan", "a.id");
        } else {
          queryBuilder
            .from("h_realisasi as i")
            .leftJoin("h_pengajuan_pk as j", "i.id_pengajuan", "j.id")
            .leftJoin("h_pengajuan as a", "j.id_pengajuan", "a.id");
        }
      })
      // .from("h_realisasi as i")
      // .leftJoin("h_pengajuan as a", "i.id_pengajuan", "a.id")
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
      .offset(offset)
      .limit(per_page)
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .modify(function (queryBuilder) {
        if (tanggalawal !== "" || tanggalakhir !== "") {
          queryBuilder.whereBetween("i.create_date", [
            tanggalawal,
            tanggalakhir,
          ]);
        } else {
        }
      })
      // .whereBetween("i.create_date", [tanggalawal, tanggalakhir])
      .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
      .whereILike("i.status_pengajuan", `%${status_pengajuan || ""}%`)
      .orderBy([{ column: "i.id", order: "desc" }]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
};

let listpengajaunid = (
  idpengajuan,
  kddepartemen,
  status_pengajuan,
  jenis_pengajuan
) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select(
          "b.kode_departement",
          "c.kode_sub_mata_anggaran",
          "a.id",
          "a.jenis_pengajuan",
          "a.id_anggaran",
          "a.id_kegiatan",
          "k.kegiatan as uraian_kegiatan",
          "e.nama_entitas",
          "b.nama_departement",
          "f.nama_kelompok_mata_anggaran",
          "d.nama_mata_anggaran",
          "c.nama_sub_mata_anggaran",
          "g.nominal",
          "g.tahun",
          "a.status_pengajuan",
          "a.uraian_kegiatan as uraian_pengajuan",
          "a.nominal as nominal_pengajuan",
          "g.sisa_pengajuan as sisanominal_pengajuan",
          "a.prefix_kegiatan"
        )
        .from("h_pengajuan as a")
        .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
        .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
        .leftJoin(
          "r_sub_mata_anggaran as c",
          "g.kode_sub_mata_anggaran",
          "c.kode_sub_mata_anggaran"
        )
        .leftJoin(
          "r_mata_anggaran as d",
          "c.kode_mata_anggaran",
          "d.kode_mata_anggaran"
        )
        .leftJoin(
          "r_kelompok_mata_anggaran as f",
          "c.kode_kelompok_mata_anggaran",
          "f.kode_kelompok_mata_anggaran"
        )
        .leftJoin(
          "r_departemen as b",
          "g.kode_departemen",
          "b.kode_departement"
        )
        .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
        .modify(function (queryBuilder) {
          if (kddepartemen !== "") {
            queryBuilder.whereILike(
              "g.kode_departemen",
              `%${kddepartemen || ""}%`
            );
          } else {
          }
        })
        .whereILike("a.id", `%${idpengajuan || ""}%`)
        .whereILike("a.status_pengajuan", `%${status_pengajuan || ""}%`)
        .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
        .orderBy([
          { column: "g.tahun", order: "desc" },
          { column: "e.kode_entitas", order: "asc" },
          { column: "b.nama_departement", order: "asc" },
          { column: "f.kode_kelompok_mata_anggaran", order: "asc" },
          { column: "d.kode_mata_anggaran", order: "asc" },
          { column: "c.kode_sub_mata_anggaran", order: "asc" },
        ]);
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

let validasipengajuan = (
  rubrik,
  kdsubmatanggaran,
  nominal,
  lengtlasid,
  id_pengajuan,
  id_anggaran,
  status,
  alasan,
  idkeg
) => {
  // let id_p = id_pengajuan;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var tahun = dateNow.substring(0, 4);
  var bulan = dateNow.substring(5, 7);
  var hari = dateNow.substring(8, 10);
  var tanggal = tahun + "" + bulan + "" + hari;
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  var prefix =
    rubrik +
    "-" +
    kdsubmatanggaran +
    "-" +
    tanggal +
    "-" +
    nominal +
    "-" +
    lengtlasid;
  // console.log(
  //   rubrik +
  //     "-" +
  //     kdsubmatanggaran +
  //     "-" +
  //     tanggal +
  //     "-" +
  //     nominal +
  //     "-" +
  //     lengtlasid
  // );
  return new Promise(async function (resolve) {
    try {
      if (status == 1) {
        let data = db
          .knex1("h_pengajuan")
          .where({
            id: id_pengajuan,
            // id_anggaran: id_anggaran,
          })
          .update({
            status_pengajuan: status,
            update_date: dateTime,
            prefix_kegiatan: prefix,
          });
        // console.log(data);
        resolve(data);
      } else {
        // let data = db
        //   .knex1("h_pengajuan")
        //   .where({
        //     // id: id_p,
        //     id_anggaran: id_anggaran,
        //   })
        //   .update({
        //     status_pengajuan: status,
        //     update_date: dateTime,
        //     alasan: alasan,
        //   });
        // // console.log(data);
        // resolve(data);
        db.knex1
          .transaction(function (trx) {
            db.knex1("h_pengajuan")
              .where({
                id: id_pengajuan,
                // id_anggaran: id_anggaran,
              })
              .update({
                status_pengajuan: status,
                update_date: dateTime,
                alasan: alasan,
              })
              .then(async function (trx) {
                return await db
                  .knex1("m_anggaran")
                  .where({
                    id: id_anggaran,
                    // id_pengajuan: id_pengajuan_p,
                  })
                  .update({
                    sisa_pengajuan: nominal,
                    status_anggaran: 2,
                  });
              })
              .then(trx.commit)
              .catch(trx.rollback)
              .then(async function (trx) {
                return await db
                  .knex1("h_kegiatan")
                  .where({
                    id: idkeg,
                    // id_pengajuan: id_pengajuan_p,
                  })
                  .update({
                    status: 1,
                  });
              })
              .then(trx.commit)
              .catch(trx.rollback);
          })
          .then(function (inserts) {
            resolve(inserts);
            // console.log(inserts);
          })
          .catch(function (error) {
            resolve(error);
            // console.log(error);
          });
      }
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let validasipengajuanpk = (
  rubrik,
  kdsubmatanggaran,
  nominal,
  lengtlasid,
  id_pengajuan,
  status,
  alasan,
  idkeg
) => {
  // let id_p = id_pengajuan;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var tahun = dateNow.substring(0, 4);
  var bulan = dateNow.substring(5, 7);
  var hari = dateNow.substring(8, 10);
  var tanggal = tahun + "" + bulan + "" + hari;
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  var prefix =
    rubrik +
    "-" +
    kdsubmatanggaran +
    "-" +
    tanggal +
    "-" +
    nominal +
    "-" +
    lengtlasid;
  return new Promise(async function (resolve) {
    if (status == 1) {
      try {
        let data = db
          .knex1("h_pengajuan_pk")
          .where({
            id: id_pengajuan,
            // id_anggaran: id_anggaran,
          })
          .update({
            status_pengajuan: status,
            update_date: dateTime,
            kode_unik: prefix,
          });
        // console.log(data);
        resolve(data);
      } catch (error) {
        // console.log(error);
        resolve(error);
      }
    } else {
      db.knex1
        .transaction(function (trx) {
          db.knex1("h_pengajuan_pk")
            .where({
              id: id_pengajuan,
              // id_anggaran: id_anggaran,
            })
            .update({
              status_pengajuan: status,
              update_date: dateTime,
              alasan: alasan,
            })
            .then(async function (trx) {
              return await db
                .knex1("h_kegiatan")
                .where({
                  id: idkeg,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  status: 1,
                });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (inserts) {
          resolve(inserts);
          // console.log(inserts);
        })
        .catch(function (error) {
          resolve(error);
          // console.log(error);
        });
      // try {
      //   let data = db
      //     .knex1("h_pengajuan_pk")
      //     .where({
      //       id: id_pengajuan,
      //       // id_anggaran: id_anggaran,
      //     })
      //     .update({
      //       status_pengajuan: status,
      //       update_date: dateTime,
      //       alasan: alasan,
      //     });
      //   // console.log(data);
      //   resolve(data);
      // } catch (error) {
      //   // console.log(error);
      //   resolve(error);
      // }
    }
  });
};

let inspengajuanpk = (
  id_pengajuan,
  nominal,
  cek,
  sisa_nominal,
  id_anggaran,
  uraian_kegiatan,
  bulan_kegiatan
  // lampiran
) => {
  var id_pengajuan_p = id_pengajuan;
  var cek_p = cek;
  var nominal_p = nominal;
  // var lampiran_p = lampiran;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    db.knex1
      .transaction(function (trx) {
        db.knex1
          .insert([
            {
              id_pengajuan: id_pengajuan_p,
              nominal: nominal_p,
              create_date: dateTime,
              update_date: null,
              uraian_kegiatan: uraian_kegiatan,
              status_pengajuan: 0,
              kode_unik: 1,
              bulan_kegiatan: bulan_kegiatan,
            },
          ])
          .into("h_pengajuan_pk")
          .then(async function (trx) {
            // const id = trx[0];
            // console.log(id);
            if (cek_p == "habis") {
              return await db
                .knex1("m_anggaran")
                .where({
                  id: id_anggaran,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  sisa_pengajuan: sisa_nominal,
                  status_anggaran: 2,
                });
            } else {
              return await db
                .knex1("m_anggaran")
                .where({
                  id: id_anggaran,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  sisa_pengajuan: sisa_nominal,
                });
            }
          })
          .then(trx.commit)
          .catch(trx.rollback)
          .then(async function (trx) {
            return await db
              .knex1("h_kegiatan")
              .where({
                id: id_kegiatan_p,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                status: 2,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function (inserts) {
        resolve(inserts);
        // console.log(inserts);
      })
      .catch(function (error) {
        // resolve(error);
        console.log(error);
      });
  });
};

let listpengajaunpk = (
  idpengajuan,
  kddepartemen,
  perPage,
  currentPage,
  cari
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("h_pengajuan_pk as a")
      .leftJoin("h_pengajuan as g", "a.id_pengajuan", "g.id")
      .leftJoin("m_anggaran as h", "g.id_anggaran", "h.id")
      .whereILike("a.id_pengajuan", `%${idpengajuan || ""}%`)
      .modify(function (queryBuilder) {
        if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "h.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .first(),
    db.knex1
      .select(
        "b.kode_departement",
        // "f.kode_kelompok_mata_anggaran",
        // "c.kode_mata_anggaran",
        "c.kode_sub_mata_anggaran",
        "g.id as id_pengajuan",
        "a.id as id_pk",
        "g.id_anggaran as id_anggaran",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "g.jenis_pengajuan",
        "a.uraian_kegiatan as uraian_realisasi",
        "g.nominal as nominal_pengajuan",
        "a.nominal as nominal_realisasi",
        "a.bulan_kegiatan as bulan realisasi ",
        "g.uraian_kegiatan as uraian_pengajuan",
        "a.status_pengajuan",
        "a.kode_unik",
        "a.alasan"
      )
      // .sum("a.nominal as nominal_realisasi")
      .from("h_pengajuan_pk as a")
      .offset(offset)
      .limit(per_page)
      .leftJoin("h_pengajuan as g", "a.id_pengajuan", "g.id")
      .leftJoin("m_anggaran as h", "g.id_anggaran", "h.id")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "h.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "h.kode_departemen", "b.kode_departement")
      .whereILike("a.id_pengajuan", `%${idpengajuan || ""}%`)
      .modify(function (queryBuilder) {
        if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "h.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      // .whereNot({
      //   "a.status_pengajuan": 1,
      // })
      // .groupBy("a.id ")
      .orderBy([{ column: "a.create_date", order: "desc" }]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
};

let listretur = (
  kdsubmatanggaran,
  kddepartemen,
  perPage,
  currentPage,
  cari
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("h_pengajuan as a")
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .where("a.status_pengajuan", 2)
      .first(),
    db.knex1
      .select(
        // "e.kode_entitas",
        "b.kode_departement",
        // "f.kode_kelompok_mata_anggaran",
        // "c.kode_mata_anggaran",
        "c.kode_sub_mata_anggaran",
        "a.id",
        "a.jenis_pengajuan",
        "a.id_anggaran",
        "a.id_kegiatan",
        "e.nama_entitas",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "g.nominal",
        "g.tahun",
        "a.status_pengajuan",
        "a.uraian_kegiatan",
        "a.nominal as nominal_pengajuan",
        "g.sisa_pengajuan as sisanominal_pengajuan",
        "a.alasan"
      )
      // .sum("a.nominal as nominal_pengajuan")
      .from("h_pengajuan as a")
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .offset(offset)
      .limit(per_page)
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .where("a.status_pengajuan", 2)
      .orderBy([
        { column: "g.tahun", order: "desc" },
        { column: "e.kode_entitas", order: "asc" },
        { column: "b.nama_departement", order: "asc" },
        { column: "f.kode_kelompok_mata_anggaran", order: "asc" },
        { column: "d.kode_mata_anggaran", order: "asc" },
        { column: "c.kode_sub_mata_anggaran", order: "asc" },
      ]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
};

let retur = (
  id_anggaran,
  jnspengajuan,
  id_kegiatan,
  nominal,
  userid,
  uraian_kegiatan,
  sisa_nominal,
  id
  // lampiran
) => {
  var id_anggaran_p = id_anggaran;
  var jnspengajuan_p = jnspengajuan;
  var id_kegiatan_p = id_kegiatan;
  var userid_p = userid;
  var nominal_p = nominal;
  // var lampiran_p = lampiran;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  let stat;
  // if (jnspengajuan_p == "PK") {
  //   stat = 2;
  // } else {
  //   stat = 3;
  // }
  return new Promise(async function (resolve) {
    db.knex1
      .transaction(function (trx) {
        db.knex1("h_pengajuan")
          .where({
            id: id,
            // id_pengajuan: id_pengajuan_p,
          })
          .update({
            id_anggaran: id_anggaran_p,
            jenis_pengajuan: jnspengajuan_p,
            id_kegiatan: id_kegiatan_p,
            nominal: nominal_p,
            create_date: dateTime,
            update_date: null,
            user_id: userid_p,
            status_pengajuan: 0,
            prefix_kegiatan: 1,
            uraian_kegiatan: uraian_kegiatan,
          })
          .then(async function (trx) {
            // console.log(id_peng);

            return await db
              .knex1("m_anggaran")
              .where({
                id: id_anggaran_p,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                sisa_pengajuan: sisa_nominal,
                status_anggaran: 2,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback)
          .then(async function (trx) {
            // console.log(id_peng);

            return await db
              .knex1("h_kegiatan")
              .where({
                id: id_kegiatan_p,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                status: 1,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function (inserts) {
        // let id_peng = trx[0];
        resolve(inserts);
        // console.log(id_peng);
      })
      .catch(function (error) {
        resolve(error);
        // console.log(error);
      });
  });
};

let returpk = (
  id_pengajuan,
  nominal,
  cek,
  sisa_nominal,
  id_anggaran,
  uraian_kegiatan,
  bulan_kegiatan,
  id
  // lampiran
) => {
  var id_pengajuan_p = id_pengajuan;
  var cek_p = cek;
  var nominal_p = nominal;
  // var lampiran_p = lampiran;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    db.knex1
      .transaction(function (trx) {
        // db.knex1
        //   .insert([
        //     {
        //       id_pengajuan: id_pengajuan_p,
        //       nominal: nominal_p,
        //       create_date: dateTime,
        //       update_date: null,
        //       uraian_kegiatan: uraian_kegiatan,
        //     },
        //   ])
        //   .into("h_pengajuan_pk")
        db.knex1("h_pengajuan_pk")
          .where({
            id: id,
          })
          .update({
            id_pengajuan: id_pengajuan_p,
            nominal: nominal_p,

            update_date: dateTime,
            uraian_kegiatan: uraian_kegiatan,
            status_pengajuan: 0,
            alasan: null,
            bulan_kegiatan: bulan_kegiatan,
          })
          .then(async function (trx) {
            // const id = trx[0];
            // console.log(id);
            if (cek_p == "habis") {
              return await db
                .knex1("m_anggaran")
                .where({
                  id: id_anggaran,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  sisa_pengajuan: sisa_nominal,
                  status_anggaran: 2,
                });
            } else {
              return await db
                .knex1("m_anggaran")
                .where({
                  id: id_anggaran,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  sisa_pengajuan: sisa_nominal,
                });
            }
          })
          .then(trx.commit)
          .catch(trx.rollback)
          .then(async function (trx) {
            // console.log(id_peng);

            return await db
              .knex1("h_kegiatan")
              .where({
                id: id_anggaran,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                status: 1,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function (inserts) {
        resolve(inserts);
        // console.log(inserts);
      })
      .catch(function (error) {
        // resolve(error);
        console.log(error);
      });
  });
};

let realisasi = (
  id_pengajuan,
  tanggal_pengajuan,
  tanggal_realisasi,
  kode_pengajuan,
  kode_buku,
  nominal,
  keterangan,
  user_id,
  pkp,
  nomor_faktur,
  tanggal_faktur
) => {
  var id_pengajuan_p = id_pengajuan;
  var kode_pengajuan_p = kode_pengajuan;
  var kode_buku_p = kode_buku;
  var nominal_p = nominal;
  var keterangan_p = keterangan;
  var user_id_p = user_id;
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
            id_pengajuan: id_pengajuan_p,
            tanggal_pengajuan: tanggal_pengajuan,
            tanggal_realisasi: tanggal_realisasi,
            kode_buku: kode_buku_p,
            nominal: nominal_p,
            keterangan: keterangan_p,
            validate_by: user_id_p,
            create_date: dateTime,
            status_pengajuan: 0,
            kode_pengajuan: kode_pengajuan_p,
            pkp: pkp,
            status_validasi: 0,
            validasi_date: null,
            nomor_faktur: nomor_faktur,
            tanggal_faktur: tanggal_faktur,
          },
        ])
        .into("h_realisasi");
      resolve(data);
    } catch (error) {
      // console.log("asd");
      resolve(error);
    }
  });
};

let listpengajaunpkvalid = (
  kdsubmatanggaran,
  kddepartemen,
  status_anggaran,
  status_pengajuan,
  jenis_pengajuan,
  perPage,
  currentPage,
  cari
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("h_pengajuan_pk as i")
      .leftJoin("h_pengajuan as a", "i.id_pengajuan", "a.id")
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("g.status_anggaran", `%${status_anggaran || ""}%`)
      .whereILike("a.status_pengajuan", `%${status_pengajuan || ""}%`)
      .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
      .first(),
    db.knex1
      .select(
        // "e.kode_entitas",
        "b.kode_departement",
        // "f.kode_kelompok_mata_anggaran",
        // "c.kode_mata_anggaran",
        "c.kode_sub_mata_anggaran",
        "i.id",
        "a.jenis_pengajuan",
        "a.id_anggaran",
        "a.id_kegiatan as uraian_kegiatan",
        "k.kegiatan as uraian",
        "e.nama_entitas",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "g.nominal",
        "g.tahun",
        "i.status_pengajuan",
        "i.uraian_kegiatan as uraian_pengajuan",
        "i.nominal as nominal_pengajuan",
        "g.sisa_pengajuan as sisanominal_pengajuan",
        "i.kode_unik as prefix_kegiatan"
      )
      // .sum("a.nominal as nominal_pengajuan")
      .from("h_pengajuan_pk as i")
      .leftJoin("h_pengajuan as a", "i.id_pengajuan", "a.id")
      .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
      .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
      .offset(offset)
      .limit(per_page)
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "g.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "g.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "g.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "g.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("g.tahun", `%${params || ""}%`)
              .orWhereILike("g.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("g.status_anggaran", `%${status_anggaran || ""}%`)
      .whereILike("a.status_pengajuan", `%${status_pengajuan || ""}%`)
      .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
      .orderBy([
        { column: "g.tahun", order: "desc" },
        { column: "e.kode_entitas", order: "asc" },
        { column: "b.nama_departement", order: "asc" },
        { column: "f.kode_kelompok_mata_anggaran", order: "asc" },
        { column: "d.kode_mata_anggaran", order: "asc" },
        { column: "c.kode_sub_mata_anggaran", order: "asc" },
      ]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
};

let listpengajaunpkvalidid = (
  idpengajuan,
  kddepartemen,
  status_pengajuan,
  jenis_pengajuan
) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select(
          "b.kode_departement",
          "c.kode_sub_mata_anggaran",
          "i.id",
          "a.jenis_pengajuan",
          "a.id_anggaran",
          "a.id_kegiatan as uraian_kegiatan",
          "k.kegiatan as uraian",
          "e.nama_entitas",
          "b.nama_departement",
          "f.nama_kelompok_mata_anggaran",
          "d.nama_mata_anggaran",
          "c.nama_sub_mata_anggaran",
          "g.nominal",
          "g.tahun",
          "i.status_pengajuan",
          "i.uraian_kegiatan as uraian_pengajuan",
          "i.nominal as nominal_pengajuan",
          "g.sisa_pengajuan as sisanominal_pengajuan",
          "i.kode_unik as prefix_kegiatan"
        )
        .from("h_pengajuan_pk as i")
        .leftJoin("h_pengajuan as a", "i.id_pengajuan", "a.id")
        .leftJoin("m_anggaran as g", "a.id_anggaran", "g.id")
        .leftJoin("h_kegiatan as k", "a.id_kegiatan", "k.id")
        .leftJoin(
          "r_sub_mata_anggaran as c",
          "g.kode_sub_mata_anggaran",
          "c.kode_sub_mata_anggaran"
        )
        .leftJoin(
          "r_mata_anggaran as d",
          "c.kode_mata_anggaran",
          "d.kode_mata_anggaran"
        )
        .leftJoin(
          "r_kelompok_mata_anggaran as f",
          "c.kode_kelompok_mata_anggaran",
          "f.kode_kelompok_mata_anggaran"
        )
        .leftJoin(
          "r_departemen as b",
          "g.kode_departemen",
          "b.kode_departement"
        )
        .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
        .modify(function (queryBuilder) {
          if (kddepartemen !== "") {
            queryBuilder.whereILike(
              "g.kode_departemen",
              `%${kddepartemen || ""}%`
            );
          } else {
          }
        })
        .whereILike("a.status_pengajuan", `%${status_pengajuan || ""}%`)
        .whereILike("a.jenis_pengajuan", `%${jenis_pengajuan || ""}%`)
        .whereILike("i.id", `%${idpengajuan || ""}%`)
        .orderBy([
          { column: "g.tahun", order: "desc" },
          { column: "e.kode_entitas", order: "asc" },
          { column: "b.nama_departement", order: "asc" },
          { column: "f.kode_kelompok_mata_anggaran", order: "asc" },
          { column: "d.kode_mata_anggaran", order: "asc" },
          { column: "c.kode_sub_mata_anggaran", order: "asc" },
        ]);
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

let inspengajuanpb = (
  id_anggaran,
  jnspengajuan,
  nominal_kegiatan,
  nominal_pengajuan,
  userid,
  uraian_kegiatan,
  sisa_nominal,
  bulan_pengajuan
  // lampiran
) => {
  var id_anggaran_p = id_anggaran;
  var jnspengajuan_p = jnspengajuan;
  var nominal_kegiatan_p = nominal_kegiatan;
  var userid_p = userid;
  var nominal_pengajuan_p = nominal_pengajuan;
  // var lampiran_p = lampiran;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    db.knex1
      .transaction(function (trx) {
        db.knex1
          .insert([
            {
              id_anggaran: id_anggaran_p,
              kegiatan: uraian_kegiatan,
              nominal: nominal_kegiatan_p,
              create_by: userid,
              create_date: dateTime,
              update_date: null,
              bulan_kegiatan: bulan_pengajuan,
              status: 1,
            },
          ])
          .into("h_kegiatan")
          .then(async function (trx) {
            // console.log(trx[0]);
            let id_keg = trx[0];

            return await db.knex1
              .insert([
                {
                  id_anggaran: id_anggaran_p,
                  jenis_pengajuan: jnspengajuan_p,
                  id_kegiatan: id_keg,
                  nominal: nominal_pengajuan_p,
                  create_date: dateTime,
                  update_date: null,
                  user_id: userid_p,
                  status_pengajuan: 0,
                  prefix_kegiatan: 1,
                  uraian_kegiatan: uraian_kegiatan,
                  bulan_pengajuan: bulan_pengajuan,
                },
              ])
              .into("h_pengajuan");
          })
          .then(trx.commit)
          .catch(trx.rollback)
          .then(async function (trx) {
            // console.log(trx[0]);
            return await db
              .knex1("m_anggaran")
              .where({
                id: id_anggaran_p,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                sisa_pengajuan: sisa_nominal,
                status_anggaran: 2,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback)
          .then(async function (trx) {
            return await db
              .knex1("h_kegiatan")
              .where({
                id: id_kegiatan_p,
                // id_pengajuan: id_pengajuan_p,
              })
              .update({
                status: 2,
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function (inserts) {
        resolve(inserts);
        // console.log(inserts);
      })
      .catch(function (error) {
        resolve(error);
        // console.log(error);
      });
  });
};

let topupanggaran = (
  idanggaran,
  nominalawal,
  nominaltopup,
  penanggungjwb,
  keterangan
) => {
  var idanggaran_p = idanggaran;
  var nominalawal_p = nominalawal;
  var nominaltopup_p = nominaltopup;
  var penanggungjwb_p = penanggungjwb;
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
            id_anggaran: idanggaran_p,
            nominal: nominalawal_p,
            nominal_topup: nominaltopup_p,
            penanggung_jawab: penanggungjwb_p,
            keterangan: keterangan,
            create_at: dateTime,
            status: 0,
          },
        ])
        .into("h_topup_anggaran");
      resolve(data);
    } catch (error) {
      // console.log("asd");
      resolve(error);
    }
  });
};

let listopupanggaran = (
  kdsubmatanggaran,
  kddepartemen,
  status,
  perPage,
  currentPage,
  cari
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("h_topup_anggaran as i")
      .leftJoin("m_anggaran as a", "a.id", "i.id_anggaran")
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "a.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "a.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "a.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "a.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("a.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("i.status", `%${status || ""}%`)
      .first(),
    db.knex1
      .select(
        // "e.kode_entitas",
        // "b.kode_departement",
        // "f.kode_kelompok_mata_anggaran",
        // "c.kode_mata_anggaran",
        // "c.kode_sub_mata_anggaran",
        "a.id as id_anggaran",
        "e.nama_entitas",
        "b.nama_departement",
        "f.nama_kelompok_mata_anggaran",
        "d.nama_mata_anggaran",
        "c.nama_sub_mata_anggaran",
        "a.sisa_pengajuan as nominal_sisa_anggaran ",
        "i.nominal as nominal_awal",
        "a.tahun",
        "a.keterangan",
        "a.status_anggaran",
        "i.nominal_topup",
        "i.penanggung_jawab",
        "i.keterangan as keterangan_topup",
        "i.id as id_topup",
        "i.status as status_topup"
      )
      .from("h_topup_anggaran as i")
      .leftJoin("m_anggaran as a", "a.id", "i.id_anggaran")
      .offset(offset)
      .limit(per_page)
      .leftJoin(
        "r_sub_mata_anggaran as c",
        "a.kode_sub_mata_anggaran",
        "c.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as d",
        "c.kode_mata_anggaran",
        "d.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as f",
        "c.kode_kelompok_mata_anggaran",
        "f.kode_kelompok_mata_anggaran"
      )
      .leftJoin("r_departemen as b", "a.kode_departemen", "b.kode_departement")
      .leftJoin("r_entitas as e", "e.kode_entitas", "b.kode_entitas")
      .modify(function (queryBuilder) {
        if (kdsubmatanggaran !== "") {
          queryBuilder.whereILike(
            "a.kode_sub_mata_anggaran",
            `%${kdsubmatanggaran || ""}%`
          );
        } else if (kddepartemen !== "") {
          queryBuilder.whereILike(
            "a.kode_departemen",
            `%${kddepartemen || ""}%`
          );
        } else {
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("e.nama_entitas", `%${params || ""}%`)
              .orWhereILike("b.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "f.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("d.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("c.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("a.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("i.status", `%${status || ""}%`)
      .orderBy([{ column: "i.create_at", order: "desc" }]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      resolve(error);
      // console.log(error);
    });
};

let validasitopup = (id_topup, status, nominal, id_anggaran) => {
  let id_p = id_topup;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  if (status == "2") {
    return new Promise(async function (resolve) {
      db.knex1
        .transaction(function (trx) {
          db.knex1("h_topup_anggaran")
            .where({
              id: id_p,
            })
            .update({
              status: status,
              update_at: dateTime,
            })
            .then(async function (trx) {
              return await db
                .knex1("m_anggaran")
                .where({
                  id: id_anggaran,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  sisa_pengajuan: nominal,
                });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (inserts) {
          // let id_peng = trx[0];
          resolve(inserts);
          // console.log(inserts);
        })
        .catch(function (error) {
          resolve(error);
          // console.log(error);
        });
    });
  } else {
    return new Promise(async function (resolve) {
      try {
        let data = db
          .knex1("h_topup_anggaran")
          .where({
            id: id_p,
          })
          .update({
            status: status,
            update_at: dateTime,
          });
        // console.log(data);
        resolve(data);
      } catch (error) {
        // console.log(error);
        resolve(error);
      }
    });
  }
};

let switchanggaran = (
  idanggaran_awal,
  idanggaran_final,
  nominalawal,
  nominalfinal,
  nominalinout,
  penanggungjwb,
  keterangan,
  status,
  userid,
  jenis_switchanggaran
) => {
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  let stat;
  if (jenis_switchanggaran == "2") {
    stat = 1;
  } else {
    stat = 0;
  }
  return new Promise(async function (resolve) {
    db.knex1
      .transaction(function (trx) {
        db.knex1
          .insert([
            {
              id_anggaran_awal: idanggaran_awal,
              id_anggaran_final: idanggaran_final,
              bsu_awal: nominalawal,
              bsu_final: nominalfinal,
              bsu_inout: nominalinout,
              penangung_jawab: penanggungjwb,
              keterangan: keterangan,
              userid: userid,
              status: status,
              create_at: dateTime,
              jenis_switchanggaran: jenis_switchanggaran,
              update_at: null,
              status_anggaran: stat,
            },
          ])
          .into("h_m_anggaran")
          .then(async function (trx) {
            let id_switch = trx[0];
            return await db.knex1
              .insert([
                {
                  id_pengajuan: id_switch,
                  status: 0,
                  create_at: dateTime,
                  update_at: null,
                  jenis_pengajuan: 1,
                },
              ])
              .into("h_notifikasi");
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function (inserts) {
        resolve(inserts);
        // console.log(inserts);
      })
      .catch(function (error) {
        // resolve(error);
        console.log(error);
      });
  });
  // return new Promise(async function (resolve) {
  //   try {
  //     let data = db.knex1
  //       .insert([
  //         {
  //           id_anggaran_awal: idanggaran_awal,
  //           id_anggaran_final: idanggaran_final,
  //           bsu_awal: nominalawal,
  //           bsu_final: nominalfinal,
  //           bsu_inout: nominalinout,
  //           penangung_jawab: penanggungjwb,
  //           keterangan: keterangan,
  //           userid: userid,
  //           status: status,
  //           create_at: dateTime,
  //           jenis_switchanggaran: jenis_switchanggaran,
  //           update_at: null,
  //           status_anggaran: 0,
  //         },
  //       ])
  //       .into("h_m_anggaran");
  //     resolve(data);
  //   } catch (error) {
  //     // console.log("asd");
  //     resolve(error);
  //   }
  // });
};

let listswitchanggaran = (
  status,
  perPage,
  currentPage,
  cari,
  jenis_switchanggaran,
  kddepartemen
) => {
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var params = cari;
  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("h_m_anggaran as i")
      .leftJoin("m_anggaran as a", "a.id", "i.id_anggaran_awal")
      .leftJoin("m_anggaran as e", "e.id", "i.id_anggaran_final")
      .leftJoin(
        "r_sub_mata_anggaran as ca",
        "a.kode_sub_mata_anggaran",
        "ca.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as da",
        "ca.kode_mata_anggaran",
        "da.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as fa",
        "ca.kode_kelompok_mata_anggaran",
        "fa.kode_kelompok_mata_anggaran"
      )
      .leftJoin(
        "r_departemen as ba",
        "a.kode_departemen",
        "ba.kode_departement"
      )
      .leftJoin("r_entitas as ea", "ea.kode_entitas", "ba.kode_entitas")
      ///batas left join anggaran awal//
      .leftJoin(
        "r_sub_mata_anggaran as cf",
        "e.kode_sub_mata_anggaran",
        "cf.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as df",
        "cf.kode_mata_anggaran",
        "df.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as ef",
        "ef.kode_kelompok_mata_anggaran",
        "df.kode_kelompok_mata_anggaran"
      )
      .leftJoin(
        "r_departemen as bf",
        "e.kode_departemen",
        "bf.kode_departement"
      )
      .leftJoin("r_entitas as efi", "bf.kode_entitas", "efi.kode_entitas")
      .modify(function (queryBuilder) {
        if (kddepartemen !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("a.kode_departemen", `%${kddepartemen || ""}%`)
              .orWhereILike("e.kode_departemen", `%${kddepartemen || ""}%`)
          );
        }
      })
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("ea.nama_entitas", `%${params || ""}%`)
              .orWhereILike("ba.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "fa.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("da.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("ca.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("a.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("i.status_anggaran", `%${status || ""}%`)
      .whereILike("i.jenis_switchanggaran", `%${jenis_switchanggaran || ""}%`)
      .first(),
    db.knex1
      .select(
        "i.id_anggaran_awal",
        "i.id_anggaran_final",
        "ea.nama_entitas as nama_entitas_awal",
        "efi.nama_entitas as nama_entitas_final",
        "ba.nama_departement as nama_departement_awal",
        "bf.nama_departement as nama_departement_final",
        "fa.nama_kelompok_mata_anggaran as nama_kelompok_mata_anggaran_awal",
        "ef.nama_kelompok_mata_anggaran as nama_kelompok_mata_anggaran_final",
        "da.nama_mata_anggaran as nama_mata_anggaran_awal",
        "df.nama_mata_anggaran as nama_mata_anggaran_final",
        "ca.nama_sub_mata_anggaran as nama_sub_mata_anggaran_awal",
        "cf.nama_sub_mata_anggaran as nama_sub_mata_anggaran_final",
        "i.bsu_awal",
        "i.bsu_final",
        "i.bsu_inout",
        "i.keterangan",
        "i.status",
        "i.status_anggaran",
        "i.id as id_switchanggaran",
        "i.jenis_switchanggaran"
      )
      .from("h_m_anggaran as i")
      .leftJoin("m_anggaran as a", "a.id", "i.id_anggaran_awal")
      .leftJoin("m_anggaran as e", "e.id", "i.id_anggaran_final")
      .offset(offset)
      .limit(per_page)
      .leftJoin(
        "r_sub_mata_anggaran as ca",
        "a.kode_sub_mata_anggaran",
        "ca.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as da",
        "ca.kode_mata_anggaran",
        "da.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as fa",
        "ca.kode_kelompok_mata_anggaran",
        "fa.kode_kelompok_mata_anggaran"
      )
      .leftJoin(
        "r_departemen as ba",
        "a.kode_departemen",
        "ba.kode_departement"
      )
      .leftJoin("r_entitas as ea", "ea.kode_entitas", "ba.kode_entitas")
      ///batas left join anggaran awal//
      .leftJoin(
        "r_sub_mata_anggaran as cf",
        "e.kode_sub_mata_anggaran",
        "cf.kode_sub_mata_anggaran"
      )
      .leftJoin(
        "r_mata_anggaran as df",
        "cf.kode_mata_anggaran",
        "df.kode_mata_anggaran"
      )
      .leftJoin(
        "r_kelompok_mata_anggaran as ef",
        "ef.kode_kelompok_mata_anggaran",
        "df.kode_kelompok_mata_anggaran"
      )
      .leftJoin(
        "r_departemen as bf",
        "e.kode_departemen",
        "bf.kode_departement"
      )
      .leftJoin("r_entitas as efi", "bf.kode_entitas", "efi.kode_entitas")
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("ea.nama_entitas", `%${params || ""}%`)
              .orWhereILike("ba.nama_departement", `%${params || ""}%`)
              .orWhereILike(
                "fa.nama_kelompok_mata_anggaran",
                `%${params || ""}%`
              )
              .orWhereILike("da.nama_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("ca.nama_sub_mata_anggaran", `%${params || ""}%`)
              .orWhereILike("a.nominal", `%${params || ""}%`)
              .orWhereILike("a.tahun", `%${params || ""}%`)
              .orWhereILike("a.keterangan", `%${params || ""}%`)
          );
        }
      })
      .whereILike("i.status_anggaran", `%${status || ""}%`)
      .whereILike("i.jenis_switchanggaran", `%${jenis_switchanggaran || ""}%`)
      .modify(function (queryBuilder) {
        if (kddepartemen !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("a.kode_departemen", `%${kddepartemen || ""}%`)
              .orWhereILike("e.kode_departemen", `%${kddepartemen || ""}%`)
          );
        }
      })
      .orderBy([
        { column: "a.tahun", order: "desc" },
        // { column: "fa.kode_kelompok_mata_anggaran", order: "asc" },
        // { column: "da.kode_mata_anggaran", order: "asc" },
        // { column: "ca.kode_sub_mata_anggaran", order: "asc" },
      ]),
  ])
    .then(([total, rows]) => {
      // console.log(total);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
      // console.log(pagination);
    })
    .catch(function (error) {
      // resolve(error);
      console.log(error);
    });
};

let validasiswitchanggaran = (
  id_switchanggaran,
  status,
  nominal_awal,
  nominal_final,
  id_anggaran_awal,
  id_anggaran_final
) => {
  let id_p = id_switchanggaran;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  if (status == "2") {
    return new Promise(async function (resolve) {
      db.knex1
        .transaction(function (trx) {
          db.knex1("h_m_anggaran")
            .where({
              id: id_p,
            })
            .update({
              status_anggaran: status,
              update_at: dateTime,
            })
            .then(async function (trx) {
              return await db
                .knex1("m_anggaran")
                .where({
                  id: id_anggaran_awal,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  sisa_pengajuan: nominal_awal,
                });
            })
            .then(trx.commit)
            .catch(trx.rollback)
            .then(async function (trx) {
              return await db
                .knex1("m_anggaran")
                .where({
                  id: id_anggaran_final,
                  // id_pengajuan: id_pengajuan_p,
                })
                .update({
                  sisa_pengajuan: nominal_final,
                });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (inserts) {
          // let id_peng = trx[0];
          resolve(inserts);
          // console.log(inserts);
        })
        .catch(function (error) {
          resolve(error);
          // console.log(error);
        });
    });
  } else {
    return new Promise(async function (resolve) {
      try {
        let data = db
          .knex1("h_m_anggaran")
          .where({
            id: id_p,
          })
          .update({
            status_anggaran: status,
            update_at: dateTime,
          });
        // console.log(data);
        resolve(data);
      } catch (error) {
        // console.log(error);
        resolve(error);
      }
    });
  }
};

let validasirealisasi = (
  id_realisasi,
  status,
  tanggal_pengajuan,
  tanggal_realisasi,
  kode_buku,
  userid,
  status_validasi
) => {
  let id_p = id_realisasi;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("h_realisasi")
        .where({
          id: id_p,
        })
        .update({
          status_pengajuan: status,
          tanggal_pengajuan: tanggal_pengajuan,
          tanggal_realisasi: tanggal_realisasi,
          validate_by: userid,
          kode_buku: kode_buku,
          update_date: dateTime,
          status_validasi: status_validasi,
          validasi_date: dateTime,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

module.exports = {
  inputanggaran,
  listtransaksi,
  inputpresenanggaran,
  getidanggaran,
  listpresentasianggaran,
  validasialokasi,
  inskegiatan,
  listkegiatan,
  validasikegiatan,
  getsisanggarankegiatan,
  getidkegiatan,
  inspengajuan,
  getpengajuanpk,
  getsisanggaranpengajuan,
  listpengajaun,
  validasipengajuan,
  inspengajuanpk,
  listpengajaunpk,
  listretur,
  retur,
  returpk,
  validasipengajuanpk,
  realisasi,
  listpengajaunpkvalid,
  getsisanggaranpengajuanpk,
  inspengajuanpb,
  listpengajaunpkvalidid,
  listpengajaunid,
  listrealisasi,
  topupanggaran,
  listopupanggaran,
  validasitopup,
  switchanggaran,
  listswitchanggaran,
  validasiswitchanggaran,
  validasirealisasi,
};
