let db = require("../config/database");
let helper = require("../helper/prefix/prefix.helper");

let historikantorkc = (perPage, currentPage, nopend, cari, status) => {
  // var reqData = req.query;
  var pagination = {};
  var per_page = perPage;
  var page = currentPage;
  var nopend_p = nopend;
  var params = cari;
  var stat = status;

  if (page < 1) page = 1;
  var offset = (page - 1) * per_page;
  return Promise.all([
    db.knex1
      .count("* as count")
      .from("ffp_pengajuan as a")
      .leftJoin("ffp as b", "a.id_dirian", "b.id_dirian")
      .leftJoin("ffp_status_pengajuan as c", "a.id_pengajuan", "c.id_pengajuan")
      .leftJoin("r_hakakses as d", "c.pic_status", "d.id")
      .where("b.kprk", nopend_p)
      .where("c.update_status", 1)
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("b.id_dirian", `%${params || ""}%`)
              .orWhereILike("b.nama_dirian", `%${params || ""}%`)
              .orWhereILike("a.status_pengajuan", `%${params || ""}%`)
              .orWhereILike("d.deskripsi", `%${params || ""}%`)
              .orWhereILike("c.catatan_status", `%${params || ""}%`)
              .orWhereILike("c.tgl_status", `%${params || ""}%`)
          );
        }
      })
      .first(),
    db.knex1
      .select(
        "b.id_dirian",
        "b.nama_dirian",
        "a.status_pengajuan",
        "d.deskripsi",
        "c.catatan_status",
        "a.jenis_pengajuan",
        "a.tgl_pengajuan",
        "a.id_pengajuan"
      )
      .from("ffp_pengajuan as a")
      .offset(offset)
      .limit(per_page)
      .leftJoin("ffp as b", "a.id_dirian", "b.id_dirian")
      .leftJoin("ffp_status_pengajuan as c", "a.id_pengajuan", "c.id_pengajuan")
      .leftJoin("r_hakakses as d", "c.pic_status", "d.id")
      .where("b.kprk", nopend_p)
      .where("c.update_status", 1)
      .whereILike("a.status_pengajuan", `%${stat || ""}%`)
      .modify(function (queryBuilder) {
        if (params !== "") {
          queryBuilder.where((whereBuilder) =>
            whereBuilder
              .whereILike("b.id_dirian", `%${params || ""}%`)
              .orWhereILike("b.nama_dirian", `%${params || ""}%`)
              // .orWhereILike("a.status_pengajuan", `%${params || ""}%`)
              .orWhereILike("d.deskripsi", `%${params || ""}%`)
              .orWhereILike("c.catatan_status", `%${params || ""}%`)
              .orWhereILike("c.tgl_status", `%${params || ""}%`)
          );
        }
      })
      .orderBy([
        { column: "a.tgl_pengajuan", order: "desc" },
        { column: "id_dirian", order: "asc" },
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
    })
    .catch(function (error) {
      resolve(error);
      // console.log(error);
    });
};

module.exports = {
  historikantorkc,
};
