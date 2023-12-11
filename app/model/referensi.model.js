let db = require("../config/database");

let getprefix = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1("h_pengajuan").max("id as id");
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

let getprefixpk = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1("h_pengajuan_pk").max("id as id");
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

let getdepartemen = (entitas,status) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("r_departemen as a")
        .select("a.*", "c.nama_entitas")
        .leftJoin("r_entitas as c", "a.kode_entitas", "c.kode_entitas")
        .modify(function (queryBuilder) {
          if (status !== "") {
            queryBuilder.where("a.status", status)
          }else {
          }
        })
        // .whereNot({
        //   status: 2,
        // })
        .whereILike("a.kode_entitas", `%${entitas || ""}%`)
        .orderBy("a.create_date", "desc");
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

let getentitas = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("r_entitas as a")
        .select("a.*")
        .whereNot({
          status_aktif: 2,
        })
        .orderBy("a.create_date", "desc");
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

let insdepartemen = (entitas, nama_depart, rubrik, userid, kode_depart) => {
  let entitas_p = entitas;
  let nama_depart_p = nama_depart;
  let rubrik_p = rubrik;
  let userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_entitas")
        .from("r_departemen")
        .where("kode_entitas", entitas_p)
        .where("kode_departement", rubrik_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) === 0) {
            return db.knex1
              .insert([
                {
                  kode_entitas: entitas_p,
                  kode_departement: kode_depart,
                  nama_departement: nama_depart_p,
                  status: 1,
                  create_by: userid_p,
                  create_date: dateTime,
                  update_date: null,
                  rubrik: rubrik_p,
                },
              ])
              .into("r_departemen")
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
  });
};

let insentitas = (kdentitas, nama_entitas, userid) => {
  let kdentitas_p = kdentitas;
  let nama_entitas_p = nama_entitas;
  let userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_entitas")
        .from("r_entitas")
        .where("kode_entitas", kdentitas_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) === 0) {
            return db.knex1
              .insert([
                {
                  kode_entitas: kdentitas_p,
                  nama_entitas: nama_entitas_p,
                  status_aktif: 1,
                  create_by: userid_p,
                  create_date: dateTime,
                  update_date: null,
                },
              ])
              .into("r_entitas")
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
  });
};

let inskelmatanggaran = (kdkelmatanggaran, nama_kelmatanggaran, userid) => {
  let kdkelmatanggaran_p = kdkelmatanggaran;
  let nama_kelmatanggaran_p = nama_kelmatanggaran;
  let userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_kelompok_mata_anggaran")
        .from("r_kelompok_mata_anggaran")
        .where("kode_kelompok_mata_anggaran", kdkelmatanggaran_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) === 0) {
            return db.knex1
              .insert([
                {
                  kode_kelompok_mata_anggaran: kdkelmatanggaran_p,
                  nama_kelompok_mata_anggaran: nama_kelmatanggaran_p,
                  status_aktif: 1,
                  create_by: userid_p,
                  create_date: dateTime,
                  update_date: null,
                },
              ])
              .into("r_kelompok_mata_anggaran")
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
  });
};

let updatedepartemen = (id, nama_depart, entitas, kddepart, userid, status) => {
  var id_p = id;
  var nama_depart_p = nama_depart;
  var entitas_p = entitas;
  var kddepart_p = kddepart;
  var userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_departemen")
        .from("m_anggaran as a")
        .where("a.kode_departemen", kddepart_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_departemen")
              .where({
                id: id_p,
              })
              .update({
                kode_entitas: entitas_p,
                kode_departement: kddepart_p,
                nama_departement: nama_depart_p,
                status: status,
                create_by: userid_p,
                // create_date: dateTime,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let updateentitas = (id, kdentitas, nama_entitas, userid, status) => {
  var id_p = id;
  let kdentitas_p = kdentitas;
  let nama_entitas_p = nama_entitas;
  let userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_entitas")
        .from("r_departemen as a")
        .where("a.kode_entitas", kdentitas_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_entitas")
              .where({
                id: id_p,
              })
              .update({
                kode_entitas: kdentitas_p,
                nama_entitas: nama_entitas_p,
                status_aktif: status,
                create_by: userid_p,
                // create_date: dateTime,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let updatekelmatanggaran = (
  id,
  kdkelmatanggaran,
  nama_kelmatanggaran,
  userid,
  status
) => {
  var id_p = id;
  let kdkelmatanggaran_p = kdkelmatanggaran;
  let nama_kelmatanggaran_p = nama_kelmatanggaran;
  let userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("a.kode_kelompok_mata_anggaran")
        .from("r_mata_anggaran as a")
        .where("a.kode_kelompok_mata_anggaran", kdkelmatanggaran_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_kelompok_mata_anggaran")
              .where({
                id: id_p,
              })
              .update({
                kode_kelompok_mata_anggaran: kdkelmatanggaran_p,
                nama_kelompok_mata_anggaran: nama_kelmatanggaran_p,
                status_aktif: status,
                create_by: userid_p,
                // create_date: dateTime,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let deldepartemen = (id) => {
  var id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("c.kode_departemen")
        .from("r_departemen as a")
        .innerJoin("m_anggaran as c", "a.kode_departement", "c.kode_departemen")
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_departemen")
              .where({
                id: id_p,
              })
              .update({
                status: 2,
                update_date: dateTime,
              });
            // console.log("asd");
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      // console.log("hux");
      resolve(error);
    }
  });
};

let delentitas = (id) => {
  var id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_entitas")
        .from("r_entitas as a")
        .innerJoin("r_departemen as c", "a.kode_entitas", "c.kode_entitas")
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_entitas")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: 2,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getkelmatanggaran = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("r_kelompok_mata_anggaran as a")
        .select("a.*")
        .whereNot({
          status_aktif: 2,
        })
        .orderBy("a.create_date", "desc");

      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

let delkelmatanggaran = (id) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_kelompok_mata_anggaran")
        .from("r_kelompok_mata_anggaran as a")
        .innerJoin(
          "r_mata_anggaran as c",
          "a.kode_kelompok_mata_anggaran",
          "c.kode_kelompok_mata_anggaran"
        )
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_kelompok_mata_anggaran")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: 2,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let getmatanggaran = (kdkelmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("r_mata_anggaran as a")
        .select("a.*", "c.nama_kelompok_mata_anggaran")
        .leftJoin(
          "r_kelompok_mata_anggaran as c",
          "a.kode_kelompok_mata_anggaran",
          "c.kode_kelompok_mata_anggaran"
        )
        .whereNot("a.status_aktif", 2)
        .whereILike("a.kode_kelompok_mata_anggaran", `%${kdkelmatanggaran || ""}%`)
        // .where("a.kode_kelompok_mata_anggaran", kdkelmatanggaran)
        // .orderBy("a.create_date", "desc")zs
        .orderBy("a.nama_mata_anggaran", "asc");
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let insmatanggaran = (
  kdkelmatanggaran,
  kdmatanggaran,
  nmmatanggaran,
  userid
) => {
  let kdkelmatanggaran_p = kdkelmatanggaran;
  let kdmatanggaran_p = kdmatanggaran;
  let nmmatanggaran_p = nmmatanggaran;
  let userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_mata_anggaran")
        .from("r_mata_anggaran")
        .where("kode_mata_anggaran", kdmatanggaran_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) === 0) {
            return db.knex1
              .insert([
                {
                  kode_kelompok_mata_anggaran: kdkelmatanggaran_p,
                  kode_mata_anggaran: kdmatanggaran_p,
                  nama_mata_anggaran: nmmatanggaran_p,
                  status_aktif: 1,
                  create_by: userid_p,
                  create_date: dateTime,
                  update_date: null,
                },
              ])
              .into("r_mata_anggaran")
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
  });
};

let updatematanggaran = (
  id,
  kdkelmatanggaran,
  kdmatanggaran,
  nmmatanggaran,
  userid,
  status
) => {
  var id_p = id;
  var kdkelmatanggaran_p = kdkelmatanggaran;
  var kdmatanggaran_p = kdmatanggaran;
  var nmmatanggaran_p = nmmatanggaran;
  var userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_mata_anggaran")
        .where({
          id: id_p,
        })
        .update({
          kode_kelompok_mata_anggaran: kdkelmatanggaran_p,
          kode_mata_anggaran: kdmatanggaran_p,
          nama_mata_anggaran: nmmatanggaran_p,
          status_aktif: status,
          create_by: userid_p,
          // create_date: null,
          update_date: dateTime,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let delmatanggaran = (id) => {
  var id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_mata_anggaran")
        .from("r_mata_anggaran as a")
        .innerJoin(
          "r_sub_mata_anggaran as c",
          "a.kode_mata_anggaran",
          "c.kode_mata_anggaran"
        )
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_mata_anggaran")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: 2,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getsubmatanggaran = (kdkelmatanggaran, kdmatanggaran) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("r_sub_mata_anggaran as a")
        .select("a.*", "b.nama_mata_anggaran", "c.nama_kelompok_mata_anggaran")
        .leftJoin(
          "r_kelompok_mata_anggaran as c",
          "a.kode_kelompok_mata_anggaran",
          "c.kode_kelompok_mata_anggaran"
        )
        .leftJoin(
          "r_mata_anggaran as b",
          "a.kode_mata_anggaran",
          "b.kode_mata_anggaran"
        )
        .whereNot("a.status_aktif", 2)
        .modify(function (queryBuilder) {
          if (kdkelmatanggaran !== "" && kdmatanggaran == "") {
            queryBuilder.where(
              "a.kode_kelompok_mata_anggaran",
              kdkelmatanggaran
            );
          } else if (kdmatanggaran !== "") {
            queryBuilder
              .where("a.kode_kelompok_mata_anggaran", kdkelmatanggaran)
              .where("a.kode_mata_anggaran", kdmatanggaran);
          } else {
          }
        })
        .orderBy("a.kode_sub_mata_anggaran", "asc");

      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let inssubmatanggaran = (
  kdkelmatanggaran,
  kdmatanggaran,
  kdsubmatanggaran,
  nmsubmatanggaran,
  userid
) => {
  let kdkelmatanggaran_p = kdkelmatanggaran;
  let kdmatanggaran_p = kdmatanggaran;
  let kdsubmatanggaran_p = kdsubmatanggaran;
  let nmsubmatanggaran_p = nmsubmatanggaran;
  let userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("kode_sub_mata_anggaran")
        .from("r_sub_mata_anggaran")
        .where("kode_sub_mata_anggaran", kdsubmatanggaran_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) === 0) {
            return db.knex1
              .insert([
                {
                  kode_kelompok_mata_anggaran: kdkelmatanggaran_p,
                  kode_mata_anggaran: kdmatanggaran_p,
                  kode_sub_mata_anggaran: kdsubmatanggaran_p,
                  nama_sub_mata_anggaran: nmsubmatanggaran_p,
                  status_aktif: 1,
                  create_by: userid_p,
                  create_date: dateTime,
                  update_date: null,
                },
              ])
              .into("r_sub_mata_anggaran")
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
  });
};

let updatesubmatanggaran = (
  id,
  kdkelmatanggaran,
  kdmatanggaran,
  kdsubmatanggaran,
  nmsubmatanggaran,
  userid,
  status
) => {
  var id_p = id;
  let kdkelmatanggaran_p = kdkelmatanggaran;
  let kdmatanggaran_p = kdmatanggaran;
  let kdsubmatanggaran_p = kdsubmatanggaran;
  let nmsubmatanggaran_p = nmsubmatanggaran;
  var userid_p = userid;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_sub_mata_anggaran")
        .where({
          id: id_p,
        })
        .update({
          kode_kelompok_mata_anggaran: kdkelmatanggaran_p,
          kode_mata_anggaran: kdmatanggaran_p,
          kode_sub_mata_anggaran: kdsubmatanggaran_p,
          nama_sub_mata_anggaran: nmsubmatanggaran_p,
          status_aktif: status,
          create_by: userid_p,
          // create_date: null,
          update_date: dateTime,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let delsubmatanggaran = (id) => {
  var id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_sub_mata_anggaran")
        .from("r_sub_mata_anggaran as a")
        .innerJoin(
          "m_anggaran as c",
          "a.kode_sub_mata_anggaran",
          "c.kode_sub_mata_anggaran"
        )
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_sub_mata_anggaran")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: 2,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let updatestatusdepart = (id, status) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("c.kode_departemen")
        .from("r_departemen as a")
        .innerJoin("m_anggaran as c", "a.kode_departement", "c.kode_departemen")
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_departemen")
              .where({
                id: id_p,
              })
              .update({
                status: status,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let updatestatusentitas = (id, status) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_entitas")
        .from("r_entitas as a")
        .innerJoin("r_departemen as c", "a.kode_entitas", "c.kode_entitas")
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_entitas")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: status,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let updatestatusklpmataanggaran = (id, status) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_kelompok_mata_anggaran")
        .from("r_kelompok_mata_anggaran as a")
        .innerJoin(
          "r_mata_anggaran as c",
          "a.kode_kelompok_mata_anggaran",
          "c.kode_kelompok_mata_anggaran"
        )
        .where("a.id", id_p)
        .then(async (userNameList) => {
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_kelompok_mata_anggaran")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: status,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(error);
    }
  });
};

let updatestatusmatanggaran = (id, status) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_mata_anggaran")
        .from("r_mata_anggaran as a")
        .innerJoin(
          "r_sub_mata_anggaran as c",
          "a.kode_mata_anggaran",
          "c.kode_mata_anggaran"
        )
        .where("a.id", id_p)
        .then(async (userNameList) => {
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_mata_anggaran")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: status,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let updatestatusubmatanggaran = (id, status) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      db.knex1
        .select("a.kode_sub_mata_anggaran")
        .from("r_sub_mata_anggaran as a")
        .innerJoin(
          "m_anggaran as c",
          "a.kode_sub_mata_anggaran",
          "c.kode_sub_mata_anggaran"
        )
        .where("a.id", id_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) >= 1) {
            let response = "Doubledata";
            resolve(response);
            // console.log("as");
          } else {
            let data = db
              .knex1("r_sub_mata_anggaran")
              .where({
                id: id_p,
              })
              .update({
                status_aktif: status,
                update_date: dateTime,
              });
            // console.log(data);
            resolve(data);
          }
        })
        .catch(function (error) {
          resolve(error);
        });
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let getjabatan = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1.from("r_jabatan as a").select("a.*").where({
        status: 1,
      });
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

module.exports = {
  getdepartemen,
  getentitas,
  insdepartemen,
  insentitas,
  updatedepartemen,
  updateentitas,
  deldepartemen,
  delentitas,
  getkelmatanggaran,
  inskelmatanggaran,
  updatekelmatanggaran,
  delkelmatanggaran,
  getmatanggaran,
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
  getprefix,
  getprefixpk,
  getjabatan,
};
