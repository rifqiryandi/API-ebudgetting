let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/reporting.model");
// let valid = require("../helper/response/validation.helper");

function reportrealisasi(req, res) {
  let kdmatanggaran = req.body.kdmatanggaran;
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let query = model.reportrealisasi(kdmatanggaran);
  let entitas1 = 711;
  let entitas2 = 712;
  let entitas3 = 753;
  query
    .then(async (result) => {
      var data_arr = [];
      var data_arrmataanggaran = [];
      var data_arrkelmataanggaran = [];
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
      let getpresentaseanggaran = await model.getpresentaseanggaran();
      let presentase = getpresentaseanggaran[0].presentasi / 100;
      for (let i = 0; i < result.length; i++) {
        // console.log(result);
        let kode_sub_mata_anggaran = result[i].kode_sub_mata_anggaran;

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
          nominalrealisasicse = 0;
        } else {
          nominalrealisasicse = realisasicse[0].nominal;
        }

        if (realisasidir[0].nominal === null) {
          nominalrealisasidir = 0;
        } else {
          nominalrealisasidir = realisasidir[0].nominal;
        }

        if (realisasicomm[0].nominal === null) {
          nominalrealisasicomm = 0;
        } else {
          nominalrealisasicomm = realisasicomm[0].nominal;
        }

        if (anggaranfycse[0].nominal === null) {
          nominalanggarancsefy = 0;
        } else {
          nominalanggarancsefy =
            anggaranfycse[0].nominal +
            anggarantopupcse[0].nominaltopup -
            anggaranswitchcsemin[0].bsu_inout +
            anggaranswitchcseplus[0].bsu_inout;
        }

        if (anggaranfydir[0].nominal === null) {
          nominalanggarandirfy = 0;
        } else {
          nominalanggarandirfy =
            anggaranfydir[0].nominal +
            anggarantopupdir[0].nominaltopup -
            anggaranswitchdirmin[0].bsu_inout +
            anggaranswitchdirplus[0].bsu_inout;
        }

        if (anggaranfycomm[0].nominal === null) {
          nominalanggarancomfy = 0;
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
        let totalsubrealisasi = nominalrealisasicse + nominalrealisasidir + nominalrealisasicomm;
        let totalsubanggaran = nominalanggarancsefy + nominalanggarandirfy + nominalanggarancomfy;
        // anggaranytdcse = Math.floor(nominalanggarancsefy * presentase);
        let totalsubangganytd = Math.floor(totalsubanggaran * presentase);
        let subpresentase = (
          (totalsubrealisasi / totalsubanggaran) *
          100
        ).toFixed(1);

        if (isNaN(subpresentase) == 0) {
          subpresentase = subpresentase;
        } else {
          subpresentase = 0;
        }
        // let subpresentase = fypersencse;
        let totalsubsisanggaran = sisaanggarancse + sisaanggarandir + sisaanggarancomm;

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

          totalsubrealisasi:totalsubrealisasi,
          totalsubanggaran:totalsubanggaran,
          totalsubanggaranytd:totalsubangganytd,
          subpresentase:subpresentase,
          totalsubsisanggaran:totalsubsisanggaran,


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
        nominalmataanggarancsefy = 0;
      } else {
        nominalmataanggarancsefy =
          anggaranfycse[0].nominal +
          mataanggarantopupcse[0].nominaltopup -
          mataanggaranswitchcsemin[0].bsu_inout +
          mataanggaranswitchcseplus[0].bsu_inout;
      }

      if (anggaranfydir[0].nominal === null) {
        nominalmataanggarandirfy = 0;
      } else {
        nominalmataanggarandirfy =
          anggaranfydir[0].nominal +
          mataanggarantopupdir[0].nominaltopup -
          mataanggaranswitchdirmin[0].bsu_inout +
          mataanggaranswitchdirplus[0].bsu_inout;
      }

      if (anggaranfycomm[0].nominal === null) {
        nominalmataanggarancomfy = 0;
      } else {
        nominalmataanggarancomfy =
          anggaranfycomm[0].nominal +
          mataanggarantopupcomm[0].nominaltopup -
          mataanggaranswitchcommmin[0].bsu_inout +
          mataanggaranswitchcommplus[0].bsu_inout;
      }

      let mataanggaranytdcse;
      let mataanggaranytddir;
      let mataanggaranytdcomm;

      mataanggaranytdcse = Math.floor(nominalmataanggarancsefy * presentase);
      mataanggaranytddir = Math.floor(nominalmataanggarandirfy * presentase);
      mataanggaranytdcomm = Math.floor(nominalmataanggarancomfy * presentase);

      let mtfycse = (
        (realisasicse[0].nominal / nominalmataanggarancsefy) *
        100
      ).toFixed(1);

      let mtfydir = (
        (realisasidir[0].nominal / nominalmataanggarandirfy) *
        100
      ).toFixed(1);

      let mtfycomm = (
        (realisasicomm[0].nominal / nominalmataanggarancomfy) *
        100
      ).toFixed(1);

      if (isNaN(mtfycse) == 0) {
        mtfycse = mtfycse;
      } else {
        mtfycse = 0.0;
      }

      if (isNaN(mtfydir) == 0) {
        mtfydir = mtfydir;
      } else {
        mtfydir = 0.0;
      }

      if (isNaN(mtfycomm) == 0) {
        mtfycomm = mtfycomm;
      } else {
        mtfycomm = 0.0;
      }

      let mtytdcse = (
        (realisasicse[0].nominal / (presentase * nominalmataanggarancsefy)) *
        100
      ).toFixed(1);

      let mtytddir = (
        (realisasidir[0].nominal / (presentase * nominalmataanggarandirfy)) *
        100
      ).toFixed(1);

      let mtytdcomm = (
        (realisasicomm[0].nominal / (presentase * nominalmataanggarancomfy)) *
        100
      ).toFixed(1);

      if (isNaN(mtytdcse) == 0) {
        mtytdcse = mtytdcse;
      } else {
        mtytdcse = 0.0;
      }

      if (isNaN(mtytddir) == 0) {
        mtytddir = mtytddir;
      } else {
        mtytddir = 0.0;
      }

      if (isNaN(mtytdcomm) == 0) {
        mtytdcomm = mtytdcomm;
      } else {
        mtytdcomm = 0.0;
      }

      let sisamtanggarancse;
      let sisamtanggarandir;
      let sisamtanggarancomm;

      sisamtanggarancse = nominalmataanggarancsefy - realisasicse[0].nominal;
      sisamtanggarandir = nominalmataanggarandirfy - realisasidir[0].nominal;
      sisamtanggarancomm = nominalmataanggarancomfy - realisasicomm[0].nominal;

      // console.log(anggaranfydir);
      let getmataanggaran = await model.getmataanggaran(kdmatanggaran);
      let getkelmataanggaran = await model.getkelmataanggaran(kdkelmatanggaran);
      // console.log(getmataanggaran[0]);

      let realisasicsekel = await model.getotalkelmataanggaran(
        entitas1,
        kdkelmatanggaran
      );
      let realisasidirkel = await model.getotalkelmataanggaran(
        entitas2,
        kdkelmatanggaran
      );
      let realisasicommkel = await model.getotalkelmataanggaran(
        entitas3,
        kdkelmatanggaran
      );

      let anggaranfycsekel = await model.getkelmataanggaranfy(
        entitas1,
        kdkelmatanggaran
      );
      let anggaranfydirkel = await model.getkelmataanggaranfy(
        entitas2,
        kdkelmatanggaran
      );
      let anggaranfycommkel = await model.getkelmataanggaranfy(
        entitas3,
        kdkelmatanggaran
      );

      let kelmataanggarantopupcse = await model.getsumtopupkelmataanggaran(
        entitas1,
        kdkelmatanggaran
      );

      let kelmataanggarantopupdir = await model.getsumtopupkelmataanggaran(
        entitas2,
        kdkelmatanggaran
      );
      let kelmataanggarantopupcomm = await model.getsumtopupkelmataanggaran(
        entitas3,
        kdkelmatanggaran
      );

      let kelmataanggaranswitchcsemin =
        await model.getsumswitchkelmatanggarankurang(
          entitas1,
          kdkelmatanggaran
        );

      let kelmataanggaranswitchdirmin =
        await model.getsumswitchkelmatanggarankurang(
          entitas2,
          kdkelmatanggaran
        );
      let kelmataanggaranswitchcommmin =
        await model.getsumswitchkelmatanggarankurang(
          entitas3,
          kdkelmatanggaran
        );

      let kelmataanggaranswitchcseplus =
        await model.getsumswitchkelmatanggarantambah(
          entitas1,
          kdkelmatanggaran
        );

      let kelmataanggaranswitchdirplus =
        await model.getsumswitchkelmatanggarantambah(
          entitas2,
          kdkelmatanggaran
        );
      let kelmataanggaranswitchcommplus =
        await model.getsumswitchkelmatanggarantambah(
          entitas3,
          kdkelmatanggaran
        );

      let nominalkelmataanggarancsefy;
      let nominalkelmataanggarandirfy;
      let nominalkelmataanggarancomfy;

      if (anggaranfycsekel[0].nominal === null) {
        nominalkelmataanggarancsefy = 0;
      } else {
        nominalkelmataanggarancsefy =
          anggaranfycsekel[0].nominal +
          kelmataanggarantopupcse[0].nominaltopup -
          kelmataanggaranswitchcsemin[0].bsu_inout +
          kelmataanggaranswitchcseplus[0].bsu_inout;
      }

      if (anggaranfydirkel[0].nominal === null) {
        nominalkelmataanggarandirfy = 0;
      } else {
        nominalkelmataanggarandirfy =
          anggaranfydirkel[0].nominal +
          kelmataanggarantopupdir[0].nominaltopup -
          kelmataanggaranswitchdirmin[0].bsu_inout +
          kelmataanggaranswitchdirplus[0].bsu_inout;
      }

      if (anggaranfycommkel[0].nominal === null) {
        nominalkelmataanggarancomfy = 0;
      } else {
        nominalkelmataanggarancomfy =
          anggaranfycommkel[0].nominal +
          kelmataanggarantopupcomm[0].nominaltopup -
          kelmataanggaranswitchcommmin[0].bsu_inout +
          kelmataanggaranswitchcommplus[0].bsu_inout;
      }

      let kelmataanggaranytdcse;
      let kelmataanggaranytddir;
      let kelmataanggaranytdcomm;

      kelmataanggaranytdcse = Math.floor(
        nominalkelmataanggarancsefy * presentase
      );
      kelmataanggaranytddir = Math.floor(
        nominalkelmataanggarandirfy * presentase
      );
      kelmataanggaranytdcomm = Math.floor(
        nominalkelmataanggarancomfy * presentase
      );

      let kelmtfycse = (
        (realisasicsekel[0].nominal / nominalkelmataanggarancsefy) *
        100
      ).toFixed(1);

      let kelmtfydir = (
        (realisasidirkel[0].nominal / nominalkelmataanggarandirfy) *
        100
      ).toFixed(1);

      let kelmtfycomm = (
        (realisasicommkel[0].nominal / nominalkelmataanggarancomfy) *
        100
      ).toFixed(1);

      if (isNaN(kelmtfycse) == 0) {
        kelmtfycse = kelmtfycse;
      } else {
        kelmtfycse = 0;
      }

      if (isNaN(kelmtfydir) == 0) {
        kelmtfydir = kelmtfydir;
      } else {
        kelmtfydir = 0;
      }

      if (isNaN(kelmtfycomm) == 0) {
        kelmtfycomm = kelmtfycomm;
      } else {
        kelmtfycomm = 0;
      }

      let kelmtytdcse = (
        (realisasicsekel[0].nominal /
          (presentase * nominalkelmataanggarancsefy)) *
        100
      ).toFixed(1);

      let kelmtytddir = (
        (realisasidirkel[0].nominal /
          (presentase * nominalkelmataanggarandirfy)) *
        100
      ).toFixed(1);

      let kelmtytdcomm = (
        (realisasicommkel[0].nominal /
          (presentase * nominalkelmataanggarancomfy)) *
        100
      ).toFixed(1);

      if (isNaN(kelmtytdcse) == 0) {
        kelmtytdcse = kelmtytdcse;
      } else {
        kelmtytdcse = 0;
      }

      if (isNaN(kelmtytddir) == 0) {
        kelmtytddir = kelmtytddir;
      } else {
        kelmtytddir = 0;
      }

      if (isNaN(kelmtytdcomm) == 0) {
        kelmtytdcomm = kelmtytdcomm;
      } else {
        kelmtytdcomm = 0;
      }
      let kelsisamtanggarancse;
      let kelsisamtanggarandir;
      let kelsisamtanggarancomm;

      kelsisamtanggarancse =
        nominalkelmataanggarancsefy - realisasicsekel[0].nominal;
      kelsisamtanggarandir =
        nominalkelmataanggarandirfy - realisasidirkel[0].nominal;
      kelsisamtanggarancomm =
        nominalkelmataanggarancomfy - realisasicommkel[0].nominal;
      // console.log(realisasicsekel);

      
      let totalrealisasikelmata = realisasicsekel[0].nominal + realisasidirkel[0].nominal + realisasicommkel[0].nominal;
      let totalanggarankelmata = nominalkelmataanggarancsefy + nominalkelmataanggarandirfy + nominalkelmataanggarancomfy;
      let kelpresentease = ((totalrealisasikelmata / (presentase * totalanggarankelmata)) *100).toFixed(1);
      let totalsisaanggarankelmata = kelsisamtanggarancse + kelsisamtanggarandir + kelsisamtanggarancomm;


      data_arrkelmataanggaran.push({
        kode_kelompok_mata_anggaran:
          getkelmataanggaran[0].kode_kelompok_mata_anggaran,
        nama_kelompok_mata_anggaran:
          getkelmataanggaran[0].nama_kelompok_mata_anggaran,
        realisasicse: realisasicsekel[0].nominal,
        mataanggaranfycse: nominalkelmataanggarancsefy,
        mataanggaranytdcse: kelmataanggaranytdcse,
        mtfycse: kelmtfycse,
        mtytdcse: kelmtytdcse,
        sisamtanggarancse: kelsisamtanggarancse,
        realisasidir: realisasidirkel[0].nominal,
        mataanggaranfydir: nominalkelmataanggarandirfy,
        mataanggaranytddir: kelmataanggaranytddir,
        mtfydir: kelmtfydir,
        mtytddir: kelmtytddir,
        sisamtanggarandir: kelsisamtanggarandir,
        realisasicomm: realisasicommkel[0].nominal,
        nominalmataanggarancomfy: nominalkelmataanggarancomfy,
        mataanggaranytdcomm: kelmataanggaranytdcomm,
        mtfycomm: kelmtfycomm,
        mtytdcomm: kelmtytdcomm,
        sisamtanggarancomm: kelsisamtanggarancomm,
        totalrealisasikelmata:totalrealisasikelmata,
        totalanggarankelmata:totalanggarankelmata,
        kelpresentease:kelpresentease,
        totalsisaanggarankelmata:totalsisaanggarankelmata
      });
      // console.log(data_arrkelmataanggaran);
      let totalrealisasimata = realisasicse[0].nominal + realisasidir[0].nominal + realisasicomm[0].nominal;
      let totalanggaranmata = nominalmataanggarancsefy + nominalmataanggarandirfy + nominalmataanggarancomfy;
      let presentasemata = ((totalrealisasimata / (presentase * totalanggaranmata)) *100).toFixed(1);
      let totalsisaanggaranmata = sisamtanggarancse + sisamtanggarandir + sisamtanggarancomm;

      data_arrmataanggaran.push({
        kode_mata_anggaran: getmataanggaran[0].kode_mata_anggaran,
        nama_mata_anggaran: getmataanggaran[0].nama_mata_anggaran,
        realisasicse: realisasicse[0].nominal,
        mataanggaranfycse: nominalmataanggarancsefy,
        mataanggaranytdcse: mataanggaranytdcse,
        mtfycse: mtfycse,
        mtytdcse: mtytdcse,
        sisamtanggarancse: sisamtanggarancse,
        realisasidir: realisasidir[0].nominal,
        mataanggaranfydir: nominalmataanggarandirfy,
        mataanggaranytddir: mataanggaranytddir,
        mtfydir: mtfydir,
        mtytddir: mtytddir,
        sisamtanggarandir: sisamtanggarandir,
        realisasicomm: realisasicomm[0].nominal,
        nominalmataanggarancomfy: nominalmataanggarancomfy,
        mataanggaranytdcomm: mataanggaranytdcomm,
        mtfycomm: mtfycomm,
        mtytdcomm: mtytdcomm,
        sisamtanggarancomm: sisamtanggarancomm,
        totalrealisasimata:totalrealisasimata,
        totalanggaranmata:totalanggaranmata,
        presentasemata:presentasemata,
        totalsisaanggaranmata:totalsisaanggaranmata,
      });
      // console.log(data_arrmataanggaran);
      const datagabung = data_arrkelmataanggaran.concat(
        data_arrmataanggaran,
        data_arr
      );
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: datagabung,
          // dataatas: data_arrmataanggaran,
          // data: data_arr,
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
  let kdmatanggaran = req.body.kdmatanggaran;
  let kdkelmatanggaran = req.body.kdkelmatanggaran;
  let kddepartemen = req.body.kddepartemen; 
  let query = model.reportrealisasi(kdmatanggaran);
  query
    .then(async (result) => {
      // console.log(result)
      var data_arrdepart = [];
      var data_arrmatadepart = [];
      var data_arrkeldepart = [];
      let getpresentaseanggaran = await model.getpresentaseanggaran();
      let presentase = getpresentaseanggaran[0].presentasi / 100;
      
      for (let i = 0; i < result.length; i++) {
        let kode_sub_mata_anggaran = result[i].kode_sub_mata_anggaran;
        let anggaranfy = await model.getanggaranfydepart(
          kode_sub_mata_anggaran,
          kddepartemen
        );
        let anggarantopupdepart = await model.getsumtopupanggarandepart(
          kode_sub_mata_anggaran,
          kddepartemen
        );
        let anggaranswitchcsemindepart = await model.anggaranswitchcsemindepart(
          kode_sub_mata_anggaran,
          kddepartemen
        );
        let anggaranswitchcseplusdepart = await model.anggaranswitchcseplusdepart(
          kode_sub_mata_anggaran,
          kddepartemen
        );
        let realisasidepart = await model.realisasidepart(
          kode_sub_mata_anggaran,
          kddepartemen
        );

        if (realisasidepart[0].nominal === null) {
          realisasidepart = 0;
        } else {
          realisasidepart = realisasidepart[0].nominal;
        }
        
        if (anggaranfy[0].nominal === null) {
          anggaranfy = 0;
        } else {
          anggaranfy =
          anggaranfy[0].nominal +
          anggarantopupdepart[0].nominaltopup -
          anggaranswitchcsemindepart[0].bsu_inout +
          anggaranswitchcseplusdepart[0].bsu_inout;
        }
       
        let anggaranytddepart = Math.floor(anggaranfy * presentase);
        let sisaanggarandepart = anggaranfy - realisasidepart;

        let fydepart = (
          (realisasidepart / anggaranfy) *
          100
        ).toFixed(1);

        if (isNaN(fydepart) == 0) {
          fydepart = fydepart;
        } else {
          fydepart = 0;
        }

        let ytddepart = (
          (realisasidepart / (presentase * anggaranfy)) *
          100
        ).toFixed(1);

        if (isNaN(ytddepart) == 0) {
          ytddepart = ytddepart;
        } else if (ytddepart == Number.POSITIVE_INFINITY || ytddepart == Number.NEGATIVE_INFINITY){
          ytddepart = 0;
        } else {
          ytddepart = 0;
        }

        data_arrdepart.push({
          kode_sub_mata_anggaran: result[i].kode_sub_mata_anggaran,
          nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
          nominalrealisasidepart: realisasidepart,
          anggaranfydepart: anggaranfy,
          anggaranytddepart: anggaranytddepart,
          fycse: fydepart,
          ytdcse: ytddepart,
          sisaanggarancse: sisaanggarandepart,
        });
        // console.log(ytddepart)
      }
      let realisasidepartmata = await model.realisasidepartmata(
        kddepartemen,
        kdmatanggaran
      );

      let anggaranfydepartmata = await model.anggaranfydepartmata(
        kddepartemen,
        kdmatanggaran
      );

      let nominalmataanggaranfydepart;

      let mataanggarantopupdepart = await model.getsumtopupmataanggarandepart(
        kddepartemen,
        kdmatanggaran
      );

      let mataanggaranswitchmindepart = await model.getsumswitchmatanggarankurangdepart(
        kddepartemen,
        kdmatanggaran
      );

      let mataanggaranswitchplusdepart = await model.getsumswitchmatanggarantambahdepart(
        kddepartemen,
        kdmatanggaran
      );

      if (anggaranfydepartmata[0].nominal === null) {
        nominalmataanggaranfydepart = 0;
      } else {
        nominalmataanggaranfydepart =
        anggaranfydepartmata[0].nominal +
        mataanggarantopupdepart[0].nominaltopup -
        mataanggaranswitchmindepart[0].bsu_inout +
        mataanggaranswitchplusdepart[0].bsu_inout;
      }

      let mataanggaranytdepart = Math.floor(nominalmataanggaranfydepart * presentase);

      let mtfydepart = (
        (realisasidepartmata[0].nominal / nominalmataanggaranfydepart) *
        100
      ).toFixed(1);

      if (isNaN(mtfydepart) == 0) {
        mtfydepart = mtfydepart;
      } else {
        mtfydepart = 0.0;
      }

      let mtytdepart = (
        (realisasidepartmata[0].nominal / (presentase * nominalmataanggaranfydepart)) *
        100
      ).toFixed(1);

      if (isNaN(mtytdepart) == 0) {
        mtytdepart = mtytdepart;
      } else {
        mtytdepart = 0.0;
      }

      let sisamtanggarandepart = nominalmataanggaranfydepart - realisasidepartmata[0].nominal;

      let realisasikeldepart = await model.getotalkelmataanggarandepart(
        kddepartemen,
        kdkelmatanggaran
      );

      let anggaranfykeldepart = await model.getkelmataanggaranfydepart(
        kddepartemen,
        kdkelmatanggaran
      );
      
      let kelmataanggarantopupdepart = await model.getsumtopupkelmataanggarandepart(
        kddepartemen,
        kdkelmatanggaran
      );

      let kelmataanggaranswitchdepartmin =
        await model.getsumswitchkelmatanggarankurangdepart(
          kddepartemen,
          kdkelmatanggaran
        );

      let kelmataanggaranswitchdepartplus =
        await model.getsumswitchkelmatanggarantambahdepart(
          kddepartemen,
          kdkelmatanggaran
        );

        let nominalkelmataanggarandepartfy;

        if (anggaranfykeldepart[0].nominal === null) {
          nominalkelmataanggarandepartfy = 0;
          } else {
            nominalkelmataanggarandepartfy =
            anggaranfykeldepart[0].nominal +
            kelmataanggarantopupdepart[0].nominaltopup -
            kelmataanggaranswitchdepartmin[0].bsu_inout +
            kelmataanggaranswitchdepartplus[0].bsu_inout;
          }
      
          let kelmataanggaranytdcse = Math.floor(
            nominalkelmataanggarandepartfy * presentase
          );
        
          let kelmtfydepart = (
            (realisasikeldepart[0].nominal / nominalkelmataanggarandepartfy) *
            100
          ).toFixed(1);

          if (isNaN(kelmtfydepart) == 0) {
            kelmtfydepart = kelmtfydepart;
          } else {
            kelmtfydepart = 0;
          }

          let kelmtytdepart = (
            (realisasikeldepart[0].nominal /
              (presentase * nominalkelmataanggarandepartfy)) *
            100
          ).toFixed(1);

          if (isNaN(kelmtytdepart) == 0) {
            kelmtytdepart = 0;
          }else if (isFinite(kelmtytdepart)){
            kelmtytdepart = 0;
          } else {
            kelmtytdepart = kelmtytdepart;
          }
          

          let kelsisamtanggarancse =
          nominalkelmataanggarandepartfy - realisasikeldepart[0].nominal;


      let getmataanggaran = await model.getmataanggaran(kdmatanggaran);
      let getkelmataanggaran = await model.getkelmataanggaran(kdkelmatanggaran);
      if (realisasikeldepart[0].nominal === null) {
        realisasikeldepart = 0 
      }else{
        realisasikeldepart = realisasikeldepart[0].nominal
      }

      if (realisasidepartmata[0].nominal === null) {
        realisasidepartmata = 0 
      }else{
        realisasidepartmata = realisasidepartmata[0].nominal
      }

      data_arrkeldepart.push({
        kode_kelompok_mata_anggaran: getkelmataanggaran[0].kode_kelompok_mata_anggaran,
        nama_kelompok_mata_anggaran: getkelmataanggaran[0].nama_kelompok_mata_anggaran,
        nominalmatarealisasidepart: realisasikeldepart,
        nominalmataanggaranfydepart: nominalkelmataanggarandepartfy,
        mataanggaranytddepart: kelmataanggaranytdcse,
        fydepart: kelmtfydepart,
        ytddepart: kelmtytdepart,
        sisaanggarancse: kelsisamtanggarancse,
      });

      data_arrmatadepart.push({
        kode_mata_anggaran: getmataanggaran[0].kode_mata_anggaran,
        nama_mata_anggaran: getmataanggaran[0].nama_mata_anggaran,
        nominalmatarealisasidepart: realisasidepartmata,
        nominalmataanggaranfydepart: nominalmataanggaranfydepart,
        mataanggaranytddepart: mataanggaranytdepart,
        fydepart: mtfydepart,
        ytddepart: mtytdepart,
        sisaanggarancse: sisamtanggarandepart,
      });
      const datagabung = data_arrkeldepart.concat(
        data_arrmatadepart,
        data_arrdepart
      );

      // console.log(data_arrmatadepart)
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: datagabung,
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

function totalrealisasi(req, res) {
  let opexs = req.body.opexs;
  let query = model.totalrealisasi(opexs);
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
  let opexs = req.body.opexs;
  let query = model.totalanggaran(opexs);
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

function sponsorshiplist(req, res) {
  let opex = req.body.opex;
  let query = model.getkodesubsponsorshiplist();
  query
    .then(async (result) => {
      var data_arr=[];
      for (let i = 0; i < result.length; i++) {
        // console.log(result);
        let kode_sub_mata_anggaran = result[i].kode_sub_mata_anggaran;

        let realisasisponsor = await model.realisasisponsor(
          opex,
          kode_sub_mata_anggaran
        );

        let anggaranfysponsor = await model.anggaranfysponsor(
          opex,
          kode_sub_mata_anggaran
        );

        let getsumtopupanggaransponsor = await model.getsumtopupanggaransponsor(
          opex,
          kode_sub_mata_anggaran
        );

        let getsumswitchanggarankurangsponsor = await model.getsumswitchanggarankurangsponsor(
          opex,
          kode_sub_mata_anggaran
        );

        let getsumswitchanggarantambahsponsor = await model.getsumswitchanggarantambahsponsor(
          opex,
          kode_sub_mata_anggaran
        );
        let nominalanggaranfysponsor;

        let nominalrealisaisponsor;
        if (realisasisponsor[0].nominal === null) {
          nominalrealisaisponsor = 0;
        } else {
          nominalrealisaisponsor = realisasisponsor[0].nominal;
         
        }

        if (anggaranfysponsor[0].nominal === null) {
          nominalanggaranfysponsor = 0;
       } else {
          nominalanggaranfysponsor =
         anggaranfysponsor[0].nominal +
         getsumtopupanggaransponsor[0].nominaltopup -
         getsumswitchanggarankurangsponsor[0].bsu_inout +
         getsumswitchanggarantambahsponsor[0].bsu_inout;
       }

        let fysponsor = (
          (realisasisponsor[0].nominal / nominalanggaranfysponsor) *
          100
        ).toFixed(1);

        if (isNaN(fysponsor) == 0) {
          fysponsor = fysponsor;
        } else {
          fysponsor = 0.0;
        }

        let sisaanggaransponsor = nominalanggaranfysponsor - realisasisponsor[0].nominal;

        data_arr.push({
          kode_mata_anggaran: result[i].kode_sub_mata_anggaran,
          nama_mata_anggaran: result[i].nama_sub_mata_anggaran,
          nominalrealisasisponsor: nominalrealisaisponsor,
          nominalanggaranfysponsor: nominalanggaranfysponsor,
          fydepart: fysponsor,
          sisaanggarancse: sisaanggaransponsor,
        });
        // console.log(realisasisponsor);  
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
      console.log(error);
    });
}

async function reportrealisasideparttes(kdmatanggaran, kddepartemen) {
  // console.log(kdmatanggaran,kddepartemen);
  var data_arr = [];
  var data_arr2 = [];
  let kdmatanggarantes = kdmatanggaran; 
  let kddepartementes = kddepartemen; 
  // console.log(kdmatanggarantes,kddepartementes);
  let query = model.reportrealisasi(kdmatanggarantes);
  let hasil = await query
    .then(async (result) => {
      // console.log(result)
      for (let i = 0; i < result.length; i++) {
        let kode_sub_mata_anggaran = result[i].kode_sub_mata_anggaran;
        

        data_arr.push({
          kode_sub_mata_anggaran: result[i].kode_sub_mata_anggaran,
          nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
          // nominalrealisasidepart: realisasidepart,
          // anggaranfydepart: anggaranfy,
          // anggaranytddepart: anggaranytddepart,
          // fycse: fydepart,
          // ytdcse: ytddepart,
          // sisaanggarancse: sisaanggarandepart,
        });
        // console.log(ytddepart)
      }
      // console.log(alldepart)
      return data_arr
    })
    let query2 = model.getdepartmen(711);
    let alldepart =  await query2
  .then(async (result2) => {
    for (let i = 0; i < result2.length; i++) {
      // let kode_departemen = result2[i].kode_departement;
      data_arr2.push({
        kode_departement: result2[i].kode_departement,
      });
    }
    return data_arr2
  })
  let datall = [];
    for (let a = 0; a < alldepart.length; a++) {
      for (let b = 0; b < hasil.length; b++) {
        // console.log(hasil[b].kode_sub_mata_anggaran)
        let anggaranfy = await model.getanggaranfydepart(
          hasil[b].kode_sub_mata_anggaran,
          alldepart[a].kode_departement
        );
        datall.push(
          anggaranfy[0].nominal
        )
      }
      let namaDepart = alldepart[a].kode_departement
      let newObjectData = {}
      newObjectData[namaDepart] = datall
      datall = []
      console.log(newObjectData);
    }
    
    return hasil
    // return JSON.stringify(data_arr);
}

async function tesarray(req,res) {
 let hu1 = "BKK";
 let hu2 = "BUM753";

  var result = await reportrealisasideparttes.call(this,hu1,hu2);
  
   res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
  // console.log(JSON.stringify(result));
  // let kdmatanggaran = req.body.kdmatanggaran;
  // let kddepartemen = req.body.kddepartemen;
  // reportrealisasidepart("BKK","BUM753")

  
  // console.log(reportrealisasidepart);
  // var arrays = [[1,2,3], [4,5], [6]];
  // var flat = [];
  //   for (var i = 0; i < arrays.length; i++) {
  //       flat = flat.concat(arrays[i]);
  //   }
  //   console.log(flat);
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
  tesarray,
  sponsorshiplist
};
