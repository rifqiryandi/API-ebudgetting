let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/reporting.model");
// let valid = require("../helper/response/validation.helper");

function reportrealisasi(req, res) {
  let kdmatanggaran = req.body.kdmatanggaran;
  let query = model.reportrealisasi(kdmatanggaran);
  let entitas1 = 711;
  let entitas2 = 712;
  let entitas3 = 753;
  query
    .then(async (result) => {
      var data_arr = [];
      var data_arrmataanggaran = [];
      let nominalanggarancsefy;
      let nominalanggarandirfy;
      let nominalanggarancomfy;
      let nominalrealisasicse;
      let nominalrealisasidir;
      let nominalrealisasicomm;
      let anggaranytdcse;
      let anggaranytddir;
      let anggaranytdcomm;
      let sisaanggarancse;
      let sisaanggarandir;
      let sisaanggarancomm;
      let fypersencse;
      let fypersendir;
      let fypersencomm;
      let ytdpersencse;
      let ytdpersendir;
      let ytdpersencomm;
      for (let i = 0; i < result.length; i++) {
        // console.log(result);
        let kode_sub_mata_anggaran = result[i].kode_sub_mata_anggaran;
        let getpresentaseanggaran = await model.getpresentaseanggaran();
        let presentase = getpresentaseanggaran[0].presentasi / 100;
        // console.log(presentase);
        // buat ambil anggaranfycse
        let anggaranfycse = await model.getanggaranfy(
          kode_sub_mata_anggaran,
          entitas1
        );
        let anggaranfydir = await model.getanggaranfy(
          kode_sub_mata_anggaran,
          entitas2
        );
        let anggaranfycomm = await model.getanggaranfy(
          kode_sub_mata_anggaran,
          entitas3
        );
        // end ambil anggaranfy
        /*---------------*/
        //  ambil anggarantopupfy
        let anggarantopupcse = await model.getsumtopupanggaran(
          kode_sub_mata_anggaran,
          entitas1
        );

        let anggarantopupdir = await model.getsumtopupanggaran(
          kode_sub_mata_anggaran,
          entitas2
        );
        let anggarantopupcomm = await model.getsumtopupanggaran(
          kode_sub_mata_anggaran,
          entitas3
        );
        // end ambil anggarantopupfy
        /*---------------*/
        //  ambil anggaranswtichkurang
        let anggaranswitchcsemin = await model.getsumswitchanggarankurang(
          kode_sub_mata_anggaran,
          entitas1
        );

        let anggaranswitchdirmin = await model.getsumswitchanggarankurang(
          kode_sub_mata_anggaran,
          entitas2
        );
        let anggaranswitchcommmin = await model.getsumswitchanggarankurang(
          kode_sub_mata_anggaran,
          entitas3
        );
        // end ambil anggaranswtichkurang
        /*---------------*/
        //  ambil anggaranswtichkurang
        let anggaranswitchcseplus = await model.getsumswitchanggarantambah(
          kode_sub_mata_anggaran,
          entitas1
        );

        let anggaranswitchdirplus = await model.getsumswitchanggarantambah(
          kode_sub_mata_anggaran,
          entitas2
        );
        let anggaranswitchcommplus = await model.getsumswitchanggarantambah(
          kode_sub_mata_anggaran,
          entitas3
        );
        // end ambil anggaranswtichkurang
        /*---------------*/
        //  ambil anggaranswtichkurang
        let realisasicse = await model.getrealisasi(
          kode_sub_mata_anggaran,
          entitas1
        );

        let realisasidir = await model.getrealisasi(
          kode_sub_mata_anggaran,
          entitas2
        );
        let realisasicomm = await model.getrealisasi(
          kode_sub_mata_anggaran,
          entitas3
        );
        // console.log(realisasicomm);
        // end ambil anggaranswtichkurang
        /*---------------*/

        // console.log(anggaranfy[0].nominal);
        if (realisasicse[0].nominal === null) {
          nominalrealisasicse = "-";
        } else {
          nominalrealisasicse = realisasicse[0].nominal;
        }

        if (realisasidir[0].nominal === null) {
          nominalrealisasidir = "-";
        } else {
          nominalrealisasidir = realisasidir[0].nominal;
        }

        if (realisasicomm[0].nominal === null) {
          nominalrealisasicomm = "-";
        } else {
          nominalrealisasicomm = realisasicomm[0].nominal;
        }

        if (anggaranfycse[0].nominal === null) {
          nominalanggarancsefy = "-";
        } else {
          nominalanggarancsefy =
            anggaranfycse[0].nominal +
            anggarantopupcse[0].nominaltopup -
            anggaranswitchcsemin[0].bsu_inout +
            anggaranswitchcseplus[0].bsu_inout;
        }

        if (anggaranfydir[0].nominal === null) {
          nominalanggarandirfy = "-";
        } else {
          nominalanggarandirfy =
            anggaranfydir[0].nominal +
            anggarantopupdir[0].nominaltopup -
            anggaranswitchdirmin[0].bsu_inout +
            anggaranswitchdirplus[0].bsu_inout;
        }

        if (anggaranfycomm[0].nominal === null) {
          nominalanggarancomfy = "-";
        } else {
          nominalanggarancomfy =
            anggaranfycomm[0].nominal +
            anggarantopupcomm[0].nominaltopup -
            anggaranswitchcommmin[0].bsu_inout +
            anggaranswitchcommplus[0].bsu_inout;
        }

        anggaranytdcse = Math.floor(nominalanggarancsefy * presentase);
        anggaranytddir = Math.floor(nominalanggarandirfy * presentase);
        anggaranytdcomm = Math.floor(nominalanggarancomfy * presentase);

        sisaanggarancse = nominalanggarancsefy - nominalrealisasicse;
        sisaanggarandir = nominalanggarandirfy - nominalrealisasidir;
        sisaanggarancomm = nominalanggarancomfy - nominalrealisasicomm;

        // let fycse = Math.round((315694 / 276221) * 100);
        let fycse = (
          (nominalrealisasicse / nominalanggarancsefy) *
          100
        ).toFixed(1);

        let fydir = (
          (nominalrealisasidir / nominalanggarandirfy) *
          100
        ).toFixed(1);

        let fycomm = (
          (nominalrealisasicomm / nominalanggarancomfy) *
          100
        ).toFixed(1);

        let ytdcse = (
          (nominalrealisasicse / (presentase * nominalanggarancsefy)) *
          100
        ).toFixed(1);

        let ytddir = (
          (nominalrealisasidir / (presentase * nominalanggarandirfy)) *
          100
        ).toFixed(1);

        let ytdcomm = (
          (nominalrealisasicomm / (presentase * nominalanggarancomfy)) *
          100
        ).toFixed(1);

        if (isNaN(fycse) == 0) {
          fypersencse = fycse;
        } else {
          fypersencse = 0;
        }

        if (isNaN(fydir) == 0) {
          fypersendir = fydir;
        } else {
          fypersendir = 0;
        }

        if (isNaN(fycomm) == 0) {
          fypersencomm = fycomm;
        } else {
          fypersencomm = 0;
        }

        if (isNaN(ytdcse) == 0) {
          ytdpersencse = ytdcse;
        } else {
          ytdpersencse = 0;
        }

        if (isNaN(ytddir) == 0) {
          ytdpersendir = ytddir;
        } else {
          ytdpersendir = 0;
        }

        if (isNaN(ytdcomm) == 0) {
          ytdpersencomm = ytdcomm;
        } else {
          ytdpersencomm = 0;
        }
        // fydir = nominalanggarandirfy - nominalrealisasidir;
        // fycomm = nominalanggarancomfy - nominalrealisasicomm;

        data_arr.push({
          kode_sub_mata_anggaran: result[i].kode_sub_mata_anggaran,
          nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
          nominalrealisasicse: nominalrealisasicse,
          anggaranfycse: nominalanggarancsefy,
          anggaranytdcse: anggaranytdcse,
          fycse: fypersencse,
          ytdcse: ytdpersencse,
          sisaanggarancse: sisaanggarancse,

          nominalrealisasidir: nominalrealisasidir,
          anggaranfydir: nominalanggarandirfy,
          anggaranytddir: anggaranytddir,
          fydir: fypersendir,
          ytddir: ytdpersendir,
          sisaanggarandir: sisaanggarandir,

          nominalrealisasicomm: nominalrealisasicomm,
          anggaranfycomm: nominalanggarancomfy,
          anggaranytdcomm: anggaranytdcomm,
          fycomm: fypersencomm,
          ytdcomm: ytdpersencomm,
          sisaanggarancomm: sisaanggarancomm,
        });
        // console.log(nominalanggaranfy);
      }
      let realisasicse = await model.getotalmataanggaran(
        entitas1,
        kdmatanggaran
      );
      let realisasidir = await model.getotalmataanggaran(
        entitas2,
        kdmatanggaran
      );
      let realisasicomm = await model.getotalmataanggaran(
        entitas3,
        kdmatanggaran
      );

      let anggaranfycse = await model.getmataanggaranfy(
        entitas1,
        kdmatanggaran
      );
      let anggaranfydir = await model.getmataanggaranfy(
        entitas2,
        kdmatanggaran
      );
      let anggaranfycomm = await model.getmataanggaranfy(
        entitas3,
        kdmatanggaran
      );

      let nominalmataanggarancsefy;
      let nominalmataanggarandirfy;
      let nominalmataanggarancomfy;

      let mataanggarantopupcse = await model.getsumtopupmataanggaran(
        entitas1,
        kdmatanggaran
      );

      let mataanggarantopupdir = await model.getsumtopupmataanggaran(
        entitas2,
        kdmatanggaran
      );
      let mataanggarantopupcomm = await model.getsumtopupmataanggaran(
        entitas3,
        kdmatanggaran
      );

      let mataanggaranswitchcsemin = await model.getsumswitchmatanggarankurang(
        entitas1,
        kdmatanggaran
      );

      let mataanggaranswitchdirmin = await model.getsumswitchmatanggarankurang(
        entitas2,
        kdmatanggaran
      );
      let mataanggaranswitchcommmin = await model.getsumswitchmatanggarankurang(
        entitas3,
        kdmatanggaran
      );

      let mataanggaranswitchcseplus = await model.getsumswitchmatanggarantambah(
        entitas1,
        kdmatanggaran
      );

      let mataanggaranswitchdirplus = await model.getsumswitchmatanggarantambah(
        entitas2,
        kdmatanggaran
      );
      let mataanggaranswitchcommplus =
        await model.getsumswitchmatanggarantambah(entitas3, kdmatanggaran);
      // console.log(mataanggaranswitchcommplus);

      if (anggaranfycse[0].nominal === null) {
        nominalmataanggarancsefy = "-";
      } else {
        nominalmataanggarancsefy =
          anggaranfycse[0].nominal +
          mataanggarantopupcse[0].nominaltopup -
          mataanggaranswitchcsemin[0].bsu_inout +
          mataanggaranswitchcseplus[0].bsu_inout;
      }

      if (anggaranfydir[0].nominal === null) {
        nominalmataanggarandirfy = "-";
      } else {
        nominalmataanggarandirfy =
          anggaranfydir[0].nominal +
          mataanggarantopupdir[0].nominaltopup -
          mataanggaranswitchdirmin[0].bsu_inout +
          mataanggaranswitchdirplus[0].bsu_inout;
      }

      if (anggaranfycomm[0].nominal === null) {
        nominalmataanggarancomfy = "-";
      } else {
        nominalmataanggarancomfy =
          anggaranfycomm[0].nominal +
          mataanggarantopupcomm[0].nominaltopup -
          mataanggaranswitchcommmin[0].bsu_inout +
          mataanggaranswitchcommplus[0].bsu_inout;
      }

      // console.log(anggaranfydir);

      data_arrmataanggaran.push({
        realisasicse: realisasicse[0].nominal,
        mataanggaranfycse: nominalmataanggarancsefy,
        realisasidir: realisasidir[0].nominal,
        mataanggaranfydir: nominalmataanggarandirfy,
        realisasicomm: realisasicomm[0].nominal,
        nominalmataanggarancomfy: nominalmataanggarancomfy,
      });
      // console.log(data_arrmataanggaran);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          dataatas: data_arrmataanggaran,
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
      console.log(error);
      res.status(500).json({
        responCode: 500,
        Msg: "Eror Database",
      });
    });
}

function updatestatusnotif(req, res) {
  let id = req.body.id;
  let query = model.updatestatusnotif(id);
  query
    .then((result) => {
      // console.log(result.length);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Validasi Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function listnotifikasi(req, res) {
  let departemen = req.body.departemen;
  let query = model.listnotifikasi(departemen);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
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
      console.log(error);
    });
}

function countnotifikasi(req, res) {
  let departemen = req.body.departemen;
  let query = model.countnotifikasi(departemen);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
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
      // console.log(error);
    });
}

function reportrealisasidepart(req, res) {
  let kode_entitas = req.body.kode_entitas;
  let query = model.reportrealisasi(kode_entitas);
  query
    .then(async (result) => {
      var data_arr = [];
      // data_arr.push({});
      for (let i = 0; i < result.length; i++) {
        let kode_sub_mata_anggaran = result[i].kode_sub_mata_anggaran;

        // console.log(kode_sub_mata_anggaran);
        // // buat ambil anggaranfycse
        // let anggaranfycse = await model.reportrealisasidepart(
        //   kode_sub_mata_anggaran,
        //   kode_entitas
        // );
        let getdepartmen = await model.getdepartmen(kode_entitas);
        console.log(getdepartmen);
        data_arr.push({
          kode_sub_mata_anggaran: result[i].kode_sub_mata_anggaran,
          nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
        });
        // console.log(anggaranfycse);
        // let getdepartmen = await model.reportrealisasidepart(kode_entitas);
        // console.log(data_arr);
      }
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
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
      // console.log(error);
    });
}

function totalrealisasi(req, res) {
  let query = model.totalrealisasi();
  query
    .then((result) => {
      // console.log(result.length);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
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
      console.log(error);
    });
}

function totalanggaran(req, res) {
  let query = model.totalanggaran();
  query
    .then((result) => {
      // console.log(result.length);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
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
      console.log(error);
    });
}

function sponsorship(req, res) {
  let query = model.getkodesubsponsorship();
  query
    .then((result) => {
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
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
      console.log(error);
    });
}

module.exports = {
  reportrealisasi,
  updatestatusnotif,
  listnotifikasi,
  countnotifikasi,
  reportrealisasidepart,
  totalrealisasi,
  totalanggaran,
  sponsorship,
};
