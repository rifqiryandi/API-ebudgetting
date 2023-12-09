let db = require("../config/database");
let helper = require("../helper/prefix/prefix.helper");

let pengajuanktr = (
  nopend,
  namaktr,
  singkatan,
  jenisktr,
  kelasktr,
  divre,
  kcu,
  kprk,
  propinsi,
  kode_propinsi,
  kabupaten,
  kode_kabupaten,
  kecamatan,
  kode_kecamatan,
  kelurahan,
  kode_kelurahan,
  alamat,
  kodepos,
  latitude,
  longitude,
  jarak_kprk,
  stat_gedung,
  media_koneksi,
  pso,
  tgl_buka,
  keterangan,
  pic_create,
  telepon,
  fax,
  jns_pengajuan,
  note_pengajuan
) => {
  let nopend_p = nopend;
  let namaktr_p = namaktr;
  let singkatan_p = singkatan;
  let jenisktr_p = jenisktr;
  let kelasktr_p = kelasktr;
  let divre_p = divre;
  let kcu_p = kcu;
  let kprk_p = kprk;
  let propinsi_p = propinsi;
  let kode_propinsi_p = kode_propinsi;
  let kabupaten_p = kabupaten;
  let kode_kabupaten_p = kode_kabupaten;
  let kecamatan_p = kecamatan;
  let kode_kecamatan_p = kode_kecamatan;
  let kelurahan_p = kelurahan;
  let kode_kelurahan_p = kode_kelurahan;
  let alamat_p = alamat;
  let kodepos_p = kodepos;
  let latitude_p = latitude;
  let longitude_p = longitude;
  let jarak_kprk_p = jarak_kprk;
  let stat_gedung_p = stat_gedung;
  let media_koneksi_p = media_koneksi;
  let pso_p = pso;
  let tgl_buka_p = tgl_buka;
  let keterangan_p = keterangan;
  let pic_create_p = pic_create;
  let telepon_p = telepon;
  let fax_p = fax;
  let jns_pengajuan_p = jns_pengajuan;
  let note_pengajuan_p = note_pengajuan;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;
  // console.log(noticket);
  return new Promise(function (resolve) {
    let prifix = helper.prefixid(nopend_p).then((prefixid) => {
      db.knex1
        .transaction(function (trx) {
          const books1 = [
            {
              id_dirian: nopend_p,
              tgl_pengajuan: dateTime,
              jenis_pengajuan: jns_pengajuan_p,
              catatan_pengajuan: note_pengajuan_p,
              id_pengajuan: prefixid,
              status_pengajuan: 0,
            },
          ];
          const books2 = [
            {
              id_pengajuan: prefixid,
              status_pengajuan: 0,
              tgl_status: dateTime,
              catatan_status: null,
              pic_status: 0,
            },
          ];
          db.knex1
            .insert([
              {
                id_dirian: nopend_p,
                nama_dirian: namaktr_p,
                singkatan: singkatan_p,
                jenis: jenisktr_p,
                kelas: kelasktr_p,
                divre: divre_p,
                kcu: kcu_p,
                kprk: kprk_p,
                propinsi: propinsi_p,
                kabupaten: kabupaten_p,
                kecamatan: kecamatan_p,
                kelurahan: kelurahan_p,
                alamat: alamat_p,
                kodepos: kodepos_p,
                latitude: latitude_p,
                longitude: longitude_p,
                jarak_kprk: jarak_kprk_p,
                status_gedung: stat_gedung_p,
                media_koneksi: media_koneksi_p,
                pso: pso_p,
                tanggal_buka: tgl_buka_p,
                tanggal_tutup: null,
                keterangan: keterangan_p,
                tgl_create: dateTime,
                tgl_update: null,
                pic_create: pic_create_p,
                pic_update: null,
                status: 0,
                propinsi_old: propinsi_p,
                telpon_old: telepon_p,
                faximile_old: fax_p,
                kode_kelurahan: kode_kelurahan_p,
                kode_kecamatan: kode_kecamatan_p,
                kode_kabupaten: kode_kabupaten_p,
                kode_propinsi: kode_propinsi_p,
              },
            ])
            .into("ffp")
            .transacting(trx)
            .then(async function (ids) {
              return await db
                .knex1("ffp_pengajuan")
                .insert(books1)
                .transacting(trx);
            })
            .then(function (ids) {
              return db
                .knex1("ffp_status_pengajuan")
                .insert(books2)
                .transacting(trx);
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (inserts) {
          resolve(inserts.length);
          // console.log(inserts);
        })
        .catch(function (error) {
          resolve(error);
          // console.log(error.sqlMessage);
        });
    });
  });
};

let listpengajuanktrkc = (
  perPage,
  currentPage,
  nopend,
  tglawal,
  tglakhir,
  cari
) => {
  // var reqData = req.query;
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var nopend_p = nopend;
  var tglawal_p = tglawal;
  var tglakhir_p = tglakhir;
  var params = cari;

  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1.count("* as count").from("ffp").first(),
    db.knex1
      .select(
        "a.id_dirian",
        "a.nama_dirian",
        "b.deskripsi as jenisktr",
        "c.deskripsi as kelasktr",
        "a.tgl_create",
        "d.jenis_pengajuan",
        "d.catatan_pengajuan",
        "d.id_pengajuan"
      )
      .from("ffp as a")
      .offset(offset)
      .limit(per_page)
      .leftJoin("r_jenisdirian as b", "a.jenis", "b.id")
      .leftJoin("r_kelasdirian as c", "a.kelas", "c.id")
      .leftJoin("ffp_pengajuan as d", "a.id_dirian", "d.id_dirian")
      .leftJoin("ffp_status_pengajuan as e", "d.id_pengajuan", "e.id_pengajuan")
      .where("a.kprk", nopend_p)
      .where("a.status", 0)
      .where("e.status_pengajuan", 0)
      .where("e.pic_status", 0)
      .whereBetween("a.tgl_create", [tglawal_p, tglakhir_p])
      .where("a.id_dirian", "like", `%${params || ""}%`)
      .where("a.nama_dirian", "like", `%${params || ""}%`)
      .where("b.deskripsi", "like", `%${params || ""}%`)
      .where("c.deskripsi", "like", `%${params || ""}%`)
      .where("a.tgl_create", "like", `%${params || ""}%`),
  ])
    .then(([total, rows]) => {
      // console.log(rows);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
    })
    .catch(function (error) {
      resolve(error);
      // console.log(error);
    });
};

let updatepengajuanktr = (idpengajuan, pic, statuspengajuan, catatan) => {
  let idpengajuan_p = idpengajuan;
  let pic_p = pic;
  let statpengajuan = statuspengajuan;
  let stat_catatan = catatan;
  var today = new Date();
  var dateNow = new Date().toISOString().slice(0, 10);
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = dateNow + " " + time;

  if (statpengajuan == 1) {
    return new Promise(async function (resolve) {
      try {
        let data = db
          .knex1("ffp_status_pengajuan")
          .where({ id_pengajuan: idpengajuan_p })
          .update({
            status_pengajuan: statpengajuan,
            pic_status: pic_p,
            update_status: dateTime,
            catatan_status: stat_catatan,
          });
        // console.log(data);
        resolve(data);
      } catch (error) {
        resolve(false);
      }
    });
  } else {
    return new Promise(function (resolve) {
      let data = db.knex1
        .transaction(function (trx) {
          db.knex1("ffp_status_pengajuan")
            .where({ id_pengajuan: idpengajuan_p })
            .update({
              status_pengajuan: statpengajuan,
              pic_status: pic_p,
              update_status: dateTime,
              catatan_status: stat_catatan,
            })
            .transacting(trx)
            .then(async function (ids) {
              return await db
                .knex1("ffp_pengajuan")
                .where({ id_pengajuan: idpengajuan_p })
                .update({
                  status_pengajuan: statpengajuan,
                });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        })
        .then(function (hasil) {
          resolve(hasil);
          // console.log(hasil);
        })
        .catch(function (error) {
          resolve(error);
          // console.log(error);
        });
    });
  }
};

let listpengajuanktrkcu = (
  perPage,
  currentPage,
  kcu,
  tglawal,
  tglakhir,
  cari
) => {
  // var reqData = req.query;
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var kcu_p = kcu;
  var tglawal_p = tglawal;
  var tglakhir_p = tglakhir;
  var params = cari;

  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1.count("* as count").from("ffp").first(),
    db.knex1
      .select(
        "a.id_dirian",
        "a.nama_dirian",
        "b.deskripsi as jenisktr",
        "c.deskripsi as kelasktr",
        "a.tgl_create",
        "d.jenis_pengajuan",
        "d.catatan_pengajuan",
        "d.id_pengajuan",
        "f.namaktr",
        "f.kprk"
      )
      .from("ffp as a")
      .offset(offset)
      .limit(per_page)
      .leftJoin("r_jenisdirian as b", "a.jenis", "b.id")
      .leftJoin("r_kelasdirian as c", "a.kelas", "c.id")
      .leftJoin("ffp_pengajuan as d", "a.id_dirian", "d.id_dirian")
      .leftJoin("ffp_status_pengajuan as e", "d.id_pengajuan", "e.id_pengajuan")
      .leftJoin("r_kantor as f", "a.kprk", "f.nopend")
      .where("a.kcu", kcu_p)
      .where("a.status", 0)
      .where("e.status_pengajuan", 1)
      .where("e.pic_status", 30)
      .whereBetween("a.tgl_create", [tglawal_p, tglakhir_p])
      .where("a.id_dirian", "like", `%${params || ""}%`)
      .where("a.nama_dirian", "like", `%${params || ""}%`)
      .where("b.deskripsi", "like", `%${params || ""}%`)
      .where("c.deskripsi", "like", `%${params || ""}%`)
      .where("a.tgl_create", "like", `%${params || ""}%`),
  ])
    .then(([total, rows]) => {
      // console.log(rows);
      var count = total.count;
      var rows = rows;
      pagination.total_data = count;
      pagination.per_page = per_page;
      pagination.total_page = Math.ceil(count / per_page);
      pagination.current_page = page;
      pagination.data = rows;
      // pagination.cekdata = rows.count;
      return pagination;
    })
    .catch(function (error) {
      resolve(error);
      // console.log(error);
    });
};

module.exports = {
  pengajuanktr,
  listpengajuanktrkc,
  updatepengajuanktr,
  listpengajuanktrkcu,
};
