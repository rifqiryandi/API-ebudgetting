let db = require("../config/database");

let login = (username, password) => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("r_user as a")
        .select(
          "a.id",
          "a.username",
          "a.nama",
          "a.gender",
          "a.departemen",
          "a.jabatan",
          "a.email",
          "a.nohp",
          "a.leveluser",
          "a.statususer",
          "a.status_online",
          "c.nama_departement"
        )
        .leftJoin("r_departemen as c", "a.departemen", "c.kode_departement")
        .where({
          username: username,
          password: password,
          statususer: 1,
        });
      //  .leftJoin("posisikantor as b", "a.Nomor_Dirian", "b.ID_Kantor")
      //  .leftJoin("propinsi as c", "a.Propinsi", "c.Kode_Propinsi")
      //  .whereILike("a.Kabupaten", `%${kotakab || ""}%`)
      //  .whereIn("a.jenis", ["KC", "KCU", "KpcDk", "KpcLk", "Kpd", "Kprk"]);
      // let data = db.knex1("r_user")
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

let updatelogin = (username) => {
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_user")
        .where({
          username: username,
        })
        .update({
          status_online: 1,
        });
      //  .leftJoin("posisikantor as b", "a.Nomor_Dirian", "b.ID_Kantor")
      //  .leftJoin("propinsi as c", "a.Propinsi", "c.Kode_Propinsi")
      //  .whereILike("a.Kabupaten", `%${kotakab || ""}%`)
      //  .whereIn("a.jenis", ["KC", "KCU", "KpcDk", "KpcLk", "Kpd", "Kprk"]);
      // let data = db.knex1("r_user")
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

let logout = (username) => {
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_user")
        .where({
          username: username,
        })
        .update({
          status_online: 0,
        });
      //  .leftJoin("posisikantor as b", "a.Nomor_Dirian", "b.ID_Kantor")
      //  .leftJoin("propinsi as c", "a.Propinsi", "c.Kode_Propinsi")
      //  .whereILike("a.Kabupaten", `%${kotakab || ""}%`)
      //  .whereIn("a.jenis", ["KC", "KCU", "KpcDk", "KpcLk", "Kpd", "Kprk"]);
      // let data = db.knex1("r_user")
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

module.exports = { login, updatelogin, logout };
