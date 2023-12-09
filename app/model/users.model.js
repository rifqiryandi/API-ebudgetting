const { default: knex } = require("knex");
let db = require("../config/database");

let insusers = (
  username,
  nama,
  gender,
  departemen,
  jabatan,
  email,
  nohp,
  leveluser,
  statususer,
  hash
) => {
  let username_p = username;
  let nama_p = nama;
  let gender_p = gender;
  let departemen_p = departemen;
  let jabatan_p = jabatan;
  let email_p = email;
  let nohp_p = nohp;
  let leveluser_p = leveluser;
  let statususer_p = statususer;
  let password_p = hash;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .select("username")
        .from("r_user")
        .where("username", username_p)
        .then(async (userNameList) => {
          // console.log(userNameList.length);
          if ((await userNameList.length) === 0) {
            return db.knex1
              .insert([
                {
                  username: username_p,
                  nama: nama_p,
                  gender: gender_p,
                  departemen: departemen_p,
                  jabatan: jabatan_p,
                  email: email_p,
                  nohp: nohp_p,
                  leveluser: leveluser_p,
                  statususer: statususer_p,
                  create_date: dateTime,
                  update_date: null,
                  password: password_p,
                  passwordview: password_p,
                  create_by: "admin",
                  status_online: 0,
                },
              ])
              .into("r_user")
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

let listuser = () => {
  return new Promise(async function (resolve) {
    try {
      let data = db.knex1
        .from("r_user as a")
        .select("a.*")
        .orderBy("a.create_date", "desc");
      // console.log(data);
      resolve(data);
    } catch (error) {
      resolve(false);
    }
  });
};

let edituser = (
  id,
  username,
  nama,
  gender,
  departemen,
  jabatan,
  email,
  nohp,
  leveluser,
  statususer
  // hash
) => {
  let id_p = id;
  let username_p = username;
  let nama_p = nama;
  let gender_p = gender;
  let departemen_p = departemen;
  let jabatan_p = jabatan;
  let email_p = email;
  let nohp_p = nohp;
  let leveluser_p = leveluser;
  let statususer_p = statususer;
  // let password_p = hash;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_user")
        .where({
          id: id_p,
        })
        .update({
          username: username_p,
          nama: nama_p,
          gender: gender_p,
          departemen: departemen_p,
          jabatan: jabatan_p,
          email: email_p,
          nohp: nohp_p,
          leveluser: leveluser_p,
          statususer: statususer_p,
          create_date: dateTime,
          update_date: null,
          // password: password_p,
          // passwordview: password_p,
          create_by: "admin",
          status_online: 0,
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let updatepass = (id, username, password) => {
  let id_p = id;
  let username_p = username;
  let password_p = password;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_user")
        .where({
          id: id_p,
        })
        .update({
          username: username_p,
          update_date: null,
          password: password_p,
          create_by: "admin",
        });
      // console.log(data);
      resolve(data);
    } catch (error) {
      // console.log(error);
      resolve(false);
    }
  });
};

let deluser = (id) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_user")
        .where({
          id: id_p,
        })
        .update({
          statususer: 2,
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

let updatestatus = (id, status) => {
  let id_p = id;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  return new Promise(async function (resolve) {
    try {
      let data = db
        .knex1("r_user")
        .where({
          id: id_p,
        })
        .update({
          statususer: status,
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

module.exports = {
  listuser,
  insusers,
  edituser,
  deluser,
  updatestatus,
  updatepass,
};
