let db = require("../config/database");
let helper = require("../helper/prefix/prefix.helper");

// let jumlah_pusat = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as regional")
//         .from("ffp as a")
//         .where("a.jenis", 6)
//         .whereNot("a.id_dirian", 40005);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_kcu = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as kcu")
//         .from("ffp as a")
//         .where("a.jenis", 8);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_kc = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as kc")
//         .from("ffp as a")
//         .where("a.jenis", 7);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_kcp = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as kcp")
//         .from("ffp as a")
//         .whereIn("a.jenis", [11, 12]);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_le = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as le")
//         .from("ffp as a")
//         .where("a.jenis", 17);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_mps = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as mps")
//         .from("ffp as a")
//         .where("a.jenis", 22);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_spp = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as spp")
//         .from("ffp as a")
//         .where("a.jenis", 31);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_dc = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as dc")
//         .from("ffp as a")
//         .where("a.jenis", 5);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

// let jumlah_mailroom = (nopend, hakakses) => {
//   return new Promise(async function (resolve) {
//     try {
//       let data = db.knex1
//         .count("id_dirian as mailroom")
//         .from("ffp as a")
//         .where("a.jenis", 23);

//       resolve(data);
//       // console.log(data);
//     } catch (error) {
//       // console.log(error);
//       resolve(false);
//     }
//   });
// };

let jumlah_dinamis = (jenis, nopend, hakakses) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .count("id_dirian as jumlah")
        .from("ffp as a")
        .where("a.jenis", jenis)
        .modify(function (queryBuilder) {
          if (hakakses == 10) {
          } else if (hakakses == 20) {
            queryBuilder.whereNot("a.jenis", 6).where("a.divre", nopend);
          } else if (hakakses == 30) {
            queryBuilder.whereNotIn("a.jenis", [6, 8]).where("a.kcu", nopend);
          } else {
            queryBuilder
              .whereNotIn("a.jenis", [6, 8, 31, 7])
              .where("a.kprk", nopend);
          }
        });

      resolve(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let jumlah_dinamisaktif = (jenis, nopend, hakakses) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .count("id_dirian as jumlah")
        .from("ffp as a")
        .where("a.jenis", jenis)
        .where("a.status", 1)
        .modify(function (queryBuilder) {
          if (hakakses == 10) {
          } else if (hakakses == 20) {
            queryBuilder.whereNot("a.jenis", 6).where("a.divre", nopend);
          } else if (hakakses == 30) {
            queryBuilder.whereNotIn("a.jenis", [6, 8]).where("a.kcu", nopend);
          } else {
            queryBuilder
              .whereNotIn("a.jenis", [6, 8, 31, 7])
              .where("a.kprk", nopend);
          }
        });

      resolve(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let jumlah_dinamisnonaktif = (jenis, nopend, hakakses) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .count("id_dirian as jumlah")
        .from("ffp as a")
        .where("a.jenis", jenis)
        .where("a.status", 0)
        .modify(function (queryBuilder) {
          if (hakakses == 10) {
          } else if (hakakses == 20) {
            queryBuilder.whereNot("a.jenis", 6).where("a.divre", nopend);
          } else if (hakakses == 30) {
            queryBuilder.whereNotIn("a.jenis", [6, 8]).where("a.kcu", nopend);
          } else {
            queryBuilder
              .whereNotIn("a.jenis", [6, 8, 31, 7])
              .where("a.kprk", nopend);
          }
        });

      resolve(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let jenisdirian = (hakakses) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("view_jenisdirian")
        .select("deskripsi", "id")
        .modify(function (queryBuilder) {
          if (hakakses == 10) {
          } else if (hakakses == 20) {
            queryBuilder.whereNot("id", 6);
          } else if (hakakses == 30) {
            queryBuilder.whereNotIn("id", [6, 8]);
          } else {
            queryBuilder.whereNotIn("id", [6, 8, 31, 7]);
          }
        });

      resolve(data);
      // console.log(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let listdashboardetail = (jenis, status, nopend, hakakses) => {
  // console.log(hakakses);
  // return new Promise(async function (resolve) {
  //   try {
  return Promise.all([
    db.knex1
      .select(
        "a.id_dirian",
        "a.nama_dirian",
        "e.deskripsi as jenisktr",
        "c.deskripsi as kelasktr",
        "a.alamat",
        "a.kodepos"
      )
      .from("ffp as a")
      .leftJoin("r_jenisdirian as e", "a.jenis", "e.id")
      .leftJoin("r_kelasdirian as c", "a.kelas", "c.id")
      .modify(function (queryBuilder) {
        if (hakakses == "10") {
          queryBuilder
            .where("a.jenis", jenis)
            .where("a.status", "like", `%${status || ""}%`);
        } else {
          if (hakakses == "20") {
            if (jenis == "11") {
              queryBuilder.whereIn("a.jenis", [11, 12]);
            } else if (jenis == "1") {
              queryBuilder.where("e.deskripsi", "like", "%agen%");
            } else {
              queryBuilder.where("a.jenis", jenis);
            }
            queryBuilder
              .where("a.status", "like", `%${status || ""}%`)
              .where("a.divre", nopend);
          } else if (hakakses == "30") {
            if (jenis == "11") {
              queryBuilder.whereIn("a.jenis", [11, 12]);
            } else if (jenis == "1") {
              queryBuilder.where("e.deskripsi", "like", "%agen%");
            } else {
              queryBuilder.where("a.jenis", jenis);
            }
            queryBuilder
              .where("a.status", "like", `%${status || ""}%`)
              .where("a.kcu", nopend);
          } else {
            if (jenis == "11") {
              queryBuilder.whereIn("a.jenis", [11, 12]);
            } else if (jenis == "1") {
              queryBuilder.where("e.deskripsi", "like", "%agen%");
            } else {
              queryBuilder.where("a.jenis", jenis);
            }
            queryBuilder
              .where("a.status", "like", `%${status || ""}%`)
              .where("a.kprk", nopend);
          }
        }
      }),
  ])
    .then(([data]) => {
      return data;
    })
    .catch(function (error) {
      // return error;
      console.log(error);
    });
  // .where("a.kcu", nopend)
  // .where("a.jenis", jenis)
  // .where("a.status", 1);

  // console.log(data);
  // } catch (error) {
  //   console.log(error);
  //   // resolve(false);
  // }
  // });
};

module.exports = {
  // jumlah_pusat,
  // jumlah_kcu,
  // jumlah_kc,
  // jumlah_kcp,
  // jumlah_le,
  // jumlah_mps,
  // jumlah_spp,
  // jumlah_dc,
  // jumlah_mailroom,
  jumlah_dinamis,
  jenisdirian,
  jumlah_dinamisaktif,
  jumlah_dinamisnonaktif,
  listdashboardetail,
};
