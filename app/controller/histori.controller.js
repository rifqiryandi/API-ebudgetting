let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/histori.model");
// let valid = require("../helper/response/validation.helper");

function historikantorkc(req, res) {
  let nopend = req.body.nopend;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let status = req.body.status;
  let query = model.historikantorkc(perPage, currentPage, nopend, cari, status);
  query
    .then((result) => {
      var data_arr = [];
      let pengajuan;
      let stat_pengajuan;
      for (let i = 0; i < result.data.length; i++) {
        let jnspengajuan = result.data[i].jenis_pengajuan;
        let status_pengajuan = result.data[i].status_pengajuan;
        let dates = result.data[i].tgl_pengajuan;
        if (jnspengajuan == 1) {
          pengajuan = "Pembukaan";
        } else {
          pengajuan = "Penutupan";
        }
        if (status_pengajuan == 0) {
          stat_pengajuan = "Entri";
        } else if (status_pengajuan == 1) {
          stat_pengajuan = "Validasi";
        } else {
          stat_pengajuan = "Tolak";
        }
        let date = helper.formatDate(dates);
        data_arr.push({
          id_dirian: result.data[i].id_dirian,
          nama_dirian: result.data[i].nama_dirian,
          status_pengajuan: stat_pengajuan,
          deskripsi: result.data[i].deskripsi,
          catatan_status: result.data[i].catatan_status,
          tanggal: date,
          jenis_pengajuan: pengajuan,
          id_pengajuan: result.data[i].id_pengajuan,
        });
      }
      // console.log(data_arr);
      if (result.data.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          total_data: result.total_data,
          current_page: result.current_page,
          total_page: result.total_page,
          data: data_arr,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
    });
}

module.exports = {
  historikantorkc,
};
