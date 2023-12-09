let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/dashboard.model");
// let valid = require("../helper/response/validation.helper");

exports.listdashboard = async (req, res) => {
  // console.log("asdasd");
  let nopend = req.body.nopend;
  let hakakses = req.body.hakakses;
  var data_arr = [];
  try {
    const jenis = await model.jenisdirian(hakakses);
    // console.log(jenis[0].deskripsi);
    for (let i = 0; i < jenis.length; i++) {
      let jenisid = jenis[i].id;
      let kantor = jenis[i].deskripsi;
      const jnskantor = await model.jumlah_dinamis(jenisid, nopend, hakakses);
      const jnskantor_aktif = await model.jumlah_dinamisaktif(
        jenisid,
        nopend,
        hakakses
      );
      const jnskantor_nonaktif = await model.jumlah_dinamisnonaktif(
        jenisid,
        nopend,
        hakakses
      );
      let ktr = jnskantor[0].jumlah;
      let ktraktif = jnskantor_aktif[0].jumlah;
      let ktrnonaktif = jnskantor_nonaktif[0].jumlah;
      // console.log(regional[0].jumlah);
      data_arr.push({
        // kantor: kantor + "|" + ktr + "|" + ktraktif + "|" + ktrnonaktif,
        kantor: kantor,
        jumlahtotal: ktr,
        jumlahtotalaktif: ktraktif,
        jumlahtotalnonakatif: ktrnonaktif,
        jenis: jenisid,
      });
    }
    // console.log(data_arr);
    // const regional = await model.jumlah_pusat(nopend, hakakses);
    // const kcu = await model.jumlah_kcu(nopend, hakakses);
    // const kc = await model.jumlah_kc(nopend, hakakses);
    // const kcp = await model.jumlah_kcp(nopend, hakakses);
    // const le = await model.jumlah_le(nopend, hakakses);
    // const mps = await model.jumlah_mps(nopend, hakakses);
    // const spp = await model.jumlah_spp(nopend, hakakses);
    // const dc = await model.jumlah_dc(nopend, hakakses);
    // const mailroom = await model.jumlah_mailroom(nopend, hakakses);

    // data_arr.push({
    //   Jumlah_regional: regional[0].regional + "|" + 6,
    //   Jumlah_kcu: kcu[0].kcu + "|" + 8,
    //   Jumlah_kc: kc[0].kc + "|" + 7,
    //   Jumlah_kcp: kcp[0].kcp + "|" + 11,
    //   Jumlah_le: le[0].le + "|" + 17,
    //   Jumlah_mps: mps[0].mps + "|" + 22,
    //   Jumlah_spp: spp[0].spp + "|" + 31,
    //   Jumlah_dc: dc[0].dc + "|" + 5,
    //   Jumlah_mailroom: mailroom[0].mailroom + "|" + 23,
    // });
    // // console.log(data_arr);
    res.status(200).json({
      responCode: 200,
      Msg: "Data Tersedia",
      data: data_arr,
    });

    // const asks = await Ask.find();
    // res.render("home", { stories, asks });
  } catch (e) {
    res.status(500).json({
      responCode: 500,
      // 'Msg': (err.response.data.fault.message).trim(),
      Msg: "Error Server",
    });
  }
};

exports.listdashboardetail = (req, res) => {
  let jenis = req.body.jenis;
  let status = req.body.status;
  let nopend = req.body.nopend;
  let hakakses = req.body.hakakses;
  let query = model.listdashboardetail(jenis, status, nopend, hakakses);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: result,
        });
      } else {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Tidak Tersedia",
          //  nomor_ticket: result2[0].nomor_ticket,
        });
      }
    })
    .catch(function (error) {
      res.status(500).json({
        responCode: 500,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: "Error Server",
      });
    });
};
