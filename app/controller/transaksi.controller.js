let helper = require("../helper/prefix/prefix.helper");
let model = require("../model/transaksi.model");
// let valid = require("../helper/response/validation.helper");

function inputanggaran(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let nominal = req.body.nominal;
  let userid = req.body.userid;
  let tahun = req.body.tahun;
  let keterangan = req.body.keterangan;
  let status = req.body.status;
  let query = model.inputanggaran(
    kdsubmatanggaran,
    kddepartemen,
    nominal,
    userid,
    tahun,
    keterangan,
    status
  );
  query
    .then((result) => {
      console.log(result);
      if (result === "1Tambah") {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Berhasil Simpan",
        });
      } else if (result >= 1) {
        res.status(400).json({
          responCode: 400,
          Msg: "Data Sudah Ada",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function listtransaksi(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let kelmatanggaran = req.body.kelmatanggaran;
  let matanggaran = req.body.matanggaran;
  let status = req.body.status;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let tahun = req.body.tahun;
  let query = model.listtransaksi(
    kdsubmatanggaran,
    kddepartemen,
    kelmatanggaran,
    matanggaran,
    status,
    perPage,
    currentPage,
    cari,
    tahun
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.data.length >= 1) {
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

function listpresentasianggaran(req, res) {
  // let kdsubmatanggaran = req.body.kdsubmatanggaran;
  // let kddepartemen = req.body.kddepartemen;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let query = model.listpresentasianggaran(
    // kdsubmatanggaran,
    // kddepartemen,
    perPage,
    currentPage,
    cari
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.data.length >= 1) {
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

function inputpresenanggaran(req, res) {
  // let id_anggaran = req.body.id_anggaran;
  let bulan = req.body.bulan;
  let tahun = req.body.tahun;
  let userid = req.body.userid;
  let presentasi = req.body.presentasi;
  // let nominal = req.body.nominal;
  // let sisanominal = req.body.sisanominal;
  let query = model.inputpresenanggaran(
    // id_anggaran,
    bulan,
    userid,
    presentasi,
    tahun
    // nominal,
    // sisanominal
  );
  query
    .then((result) => {
      console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function getidanggaran(req, res) {
  let idanggaran = req.body.idanggaran;
  let status = req.body.status;
  let kddepartemen = req.body.kddepartemen;
  let kdmatanggaran = req.body.kdmatanggaran;
  let idanggaranawal = req.body.idanggaranawal;
  let query = model.getidanggaran(
    idanggaran,
    status,
    kddepartemen,
    kdmatanggaran,
    idanggaranawal
  );
  query
    .then(async (result) => {
      let bsu_keg;
      var data_arr = [];
      for (let i = 0; i < result.length; i++) {
        let id_anggaran = result[i].id;
        let getsisakegiatan = await model.getsisanggarankegiatan(id_anggaran);
        let nominal_anggaran = getsisakegiatan[0].nominal_a;
        let nominal_kegiatan = getsisakegiatan[0].nominal_k;
        // console.log(getsisakegiatan[0].nominal_a);
        if (nominal_kegiatan == null) {
          bsu_keg = 0;
        } else {
          bsu_keg = nominal_kegiatan;
        }
        let penjumlah = nominal_anggaran - bsu_keg;
        data_arr.push({
          id: result[i].id,
          kode_sub_mata_anggaran: result[i].kode_sub_mata_anggaran,
          kode_departemen: result[i].kode_departemen,
          nominal: result[i].nominal,
          tahun: result[i].tahun,
          create_by: result[i].create_by,
          create_date: result[i].create_date,
          update_date: result[i].update_date,
          keterangan: result[i].keterangan,
          status_anggaran: result[i].status_anggaran,
          susunan_anggaran: result[i].susunan_anggaran,
          nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
          nama_departement: result[i].nama_departement,
          nominal_kegiatan: penjumlah,
          sisa_nominal_pengajaun: result[i].sisa_pengajuan,
        });
        // console.log(bsu_keg);
      }

      // console.log(data_arr);
      // let sisa =
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
}

function validasialokasi(req, res) {
  let id_anggaran = req.body.id_anggaran;
  let status = req.body.status;
  let query = model.validasialokasi(id_anggaran, status);
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

function validasikegiatan(req, res) {
  let id_kegiatan = req.body.id_kegiatan;
  let status = req.body.status;
  let query = model.validasikegiatan(id_kegiatan, status);
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

function inskegiatan(req, res) {
  let id_anggaran = req.body.id_anggaran;
  let kegiatan = req.body.kegiatan;
  let nominal = req.body.nominal;
  let userid = req.body.userid;
  let bulan = req.body.bulan;
  let opex = req.body.opex;
  let keterangan = req.body.keterangan;
  let query = model.inskegiatan(id_anggaran, kegiatan, nominal, userid, bulan,opex,keterangan);
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function listkegiatan(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let status = req.body.status;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let bulan = req.body.bulan;
  let query = model.listkegiatan(
    kdsubmatanggaran,
    kddepartemen,
    status,
    perPage,
    currentPage,
    cari,
    bulan
  );
  query
    .then((result) => {
      // console.log(result);
      if (result.data.length >= 1) {
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

function getidkegiatan(req, res) {
  let idkegiatan = req.body.idkegiatan;
  let status = req.body.status;
  let kddepartemen = req.body.kddepartemen;
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let bulan = req.body.bulan;
  let query = model.getidkegiatan(idkegiatan, status, kddepartemen, kdsubmatanggaran,bulan);
  query
    .then(async (result) => {
      let bsu_keg;
      var data_arr = [];
      for (let i = 0; i < result.length; i++) {
        let id_anggaran = result[i].id_anggaran;
        let getsisakegiatan = await model.getsisanggarankegiatan(id_anggaran);
        let nominal_anggaran = getsisakegiatan[0].nominal_a;
        let nominal_kegiatan = getsisakegiatan[0].nominal_k;
        // console.log(getsisakegiatan);
        if (nominal_kegiatan == null) {
          bsu_keg = 0;
        } else {
          bsu_keg = nominal_kegiatan;
        }
        let penjumlah = nominal_anggaran - bsu_keg;
        data_arr.push({
          id: result[i].id,
          id_anggaran: result[i].id_anggaran,
          kode_sub_mata_anggaran: result[i].kode_sub_mata_anggaran,
          kode_departemen: result[i].kode_departement,
          uraian_kegiatan: result[i].kegiatan,
          nominal: result[i].nominal,
          tahun: result[i].tahun,
          create_by: result[i].create_by,
          create_date: result[i].create_date,
          update_date: result[i].update_date,
          keterangan: result[i].keterangan,
          status_anggaran: result[i].status_anggaran,
          susunan_anggaran: result[i].susunan_anggaran,
          nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
          nama_departement: result[i].nama_departement,
          sisa_nominal: penjumlah,
          nominal_anggaran: nominal_anggaran,
          sisa_nominal_pengajuan: result[i].sisa_pengajuan,
        });
        // console.log(bsu_keg);
      }

      // console.log(data_arr);
      // let sisa =
      if (result.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Data Tersedia",
          data: data_arr,
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
      console.log(error)
    });
}

function inspengajuan(req, res) {
  let id_anggaran = req.body.id_anggaran;
  let jnspengajuan = req.body.jnspengajuan;
  let id_kegiatan = req.body.id_kegiatan;
  let nominal = req.body.nominal;
  let userid = req.body.userid;
  let uraian_kegiatan = req.body.uraian_kegiatan;
  let sisa_nominal = req.body.sisa_nominal;
  let bulan_pengajuan = req.body.bulan_pengajuan;
  let query = model.inspengajuan(
    id_anggaran,
    jnspengajuan,
    id_kegiatan,
    nominal,
    userid,
    uraian_kegiatan,
    sisa_nominal,
    bulan_pengajuan
  );
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
          idpengajuan: result,
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result,
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

function inspengajuanpb(req, res) {
  let id_anggaran = req.body.id_anggaran;
  let jnspengajuan = req.body.jnspengajuan;
  let nominal_kegiatan = req.body.nominal_kegiatan;
  let nominal_pengajuan = req.body.nominal_pengajuan;
  let userid = req.body.userid;
  let uraian_kegiatan = req.body.uraian_kegiatan;
  let sisa_nominal = req.body.sisa_nominal;
  let bulan_pengajuan = req.body.bulan_pengajuan;
  let query = model.inspengajuanpb(
    id_anggaran,
    jnspengajuan,
    nominal_kegiatan,
    nominal_pengajuan,
    userid,
    uraian_kegiatan,
    sisa_nominal,
    bulan_pengajuan
  );
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
          idpengajuan: result,
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result,
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

function getpengajuanpk(req, res) {
  let id_pengajuan = req.body.id_pengajuan;
  let kddepartemen = req.body.kddepartemen;
  let query = model.getpengajuanpk(id_pengajuan,kddepartemen);
  query
    .then(async (result) => {
      // console.log(result);
      let bsu_pengajuan;
      var data_arr = [];
      for (let i = 0; i < result.length; i++) {
        // let id_anggaran = result[i].id;
        // let getsisapengajuan = await model.getsisanggaranpengajuan(id_anggaran);
        let nominal = result[i].nominal;
        let nominal_realisasi = result[i].nominal_realisasi;
        // console.log(getsisapengajuan[0].nominal_k);
        if (nominal_realisasi == null) {
          bsu_pengajuan = 0;
        } else {
          bsu_pengajuan = nominal_realisasi;
        }
        let penjumlah = nominal - bsu_pengajuan;
        // console.log(penjumlah);
        data_arr.push({
          id: result[i].id,
          id_anggaran: result[i].id_anggaran,
          id_pengajuan: result[i].id_pengajuan,
          jenis_pengajuan: result[i].jenis_pengajuan,
          nominal_pengajuan: result[i].nominal,
          create_date: result[i].create_date,
          update_date: result[i].update_date,
          user_id: result[i].user_id,
          nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
          nama_departement: result[i].nama_departement,
          sisa_nominal: penjumlah,
        });
        // console.log(bsu_pengajuan);
      }

      // console.log(data_arr);
      // let sisa =
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
          //  nomor_ticket: result2[0].nomor_ticket,
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

function listpengajaun(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let status_anggaran = req.body.status_anggaran;
  let status_pengajuan = req.body.status_pengajuan;
  let jenis_pengajuan = req.body.jenis_pengajuan;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let query = model.listpengajaun(
    kdsubmatanggaran,
    kddepartemen,
    status_anggaran,
    status_pengajuan,
    jenis_pengajuan,
    perPage,
    currentPage,
    cari
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.data.length >= 1) {
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

function listrealisasi(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let jenis_pengajuan = req.body.jenis_pengajuan;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let status_pengajuan = req.body.status_pengajuan;
  let tanggalawal = req.body.tanggalawal;
  let tanggalakhir = req.body.tanggalakhir;
  let query = model.listrealisasi(
    kdsubmatanggaran,
    kddepartemen,
    jenis_pengajuan,
    perPage,
    currentPage,
    cari,
    status_pengajuan,
    tanggalawal,
    tanggalakhir
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.data.length >= 1) {
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

async function validasipengajuan(req, res) {
  let rubrik = req.body.rubrik;
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let nominal = req.body.nominal;
  let id_pengajuan = req.body.id_pengajuan;
  let id_anggaran = req.body.id_anggaran;
  let status = req.body.status;
  let alasan = req.body.alasan;
  let idkeg = req.body.idkeg;
  // let lengtlasid;
  // const prefix = helper.prefixid();
  // console.log("jijij");
  try {
    const prefix = await helper.prefixid();
    var lengtlasid = prefix.toString();
    var lengtid = lengtlasid.length;
    // console.log(lengtid);
    if (lengtid === 1) {
      lengtlasid = "000" + prefix;
    } else if (lengtid === 2) {
      lengtlasid = "00" + prefix;
    } else {
      lengtlasid = "0" + prefix;
    }
    var dateNow = new Date().toISOString().slice(0, 10);
    var tahun = dateNow.substring(0, 4);
    var bulan = dateNow.substring(5, 7);
    var hari = dateNow.substring(8, 10);
    var tanggal = tahun + "" + bulan + "" + hari;

    let query = model.validasipengajuan(
      rubrik,
      kdsubmatanggaran,
      nominal,
      lengtlasid,
      id_pengajuan,
      id_anggaran,
      status,
      alasan,
      idkeg
    );
    query.then((result) => {
      var prefix =
        rubrik +
        "-" +
        kdsubmatanggaran +
        "-" +
        tanggal +
        "-" +
        nominal +
        "-" +
        lengtlasid;
      // console.log(result);
      if (result) {
        if (status == "1") {
          res.status(200).json({
            responCode: 200,
            Msg: "Validasi Berhasil",
            kode_unik: prefix,
          });
        } else {
          res.status(200).json({
            responCode: 200,
            Msg: "Retur Berhasil",
          });
        }
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    });
    // console.log(
    //   rubrik + "-" + kdsubmatanggaran + "-" + nominal + "-" + lengtlasid
    // );
  } catch (e) {
    res.status(500).json({
      responCode: 500,
      // 'Msg': (err.response.data.fault.message).trim(),
      Msg: "Error Server",
    });
  }
  // let query = model.validasipengajuan(id_pengajuan, status, id_anggaran);
  // query
  //   .then((result) => {
  //     // console.log(result.length);
  //     if (result) {
  //       res.status(200).json({
  //         responCode: 200,
  //         Msg: "Validasi Berhasil",
  //       });
  //     } else {
  //       res.status(401).json({
  //         responCode: 401,
  //         Msg: result.sqlMessage,
  //       });
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     res.status(400).json({
  //       responCode: 400,
  //       // 'Msg': (err.response.data.fault.message).trim(),
  //       Msg: error,
  //     });
  //   });
}

async function validasipengajuanpk(req, res) {
  let rubrik = req.body.rubrik;
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let nominal = req.body.nominal;
  let id_pengajuan = req.body.id_pengajuan;
  let status = req.body.status;
  let alasan = req.body.alasan;
  let idkeg = req.body.idkeg;
  // let lengtlasid;
  // const prefix = helper.prefixid();
  // console.log("jijij");
  try {
    const prefix = await helper.prefixidpk();
    var lengtlasid = prefix.toString();
    var lengtid = lengtlasid.length;
    // console.log(lengtid);
    if (lengtid === 1) {
      lengtlasid = "000" + prefix;
    } else if (lengtid === 2) {
      lengtlasid = "00" + prefix;
    } else {
      lengtlasid = "0" + prefix;
    }
    var dateNow = new Date().toISOString().slice(0, 10);
    var tahun = dateNow.substring(0, 4);
    var bulan = dateNow.substring(5, 7);
    var hari = dateNow.substring(8, 10);
    var tanggal = tahun + "" + bulan + "" + hari;

    let query = model.validasipengajuanpk(
      rubrik,
      kdsubmatanggaran,
      nominal,
      lengtlasid,
      id_pengajuan,
      status,
      alasan,
      idkeg
    );
    query.then((result) => {
      var prefix =
        rubrik +
        "-" +
        kdsubmatanggaran +
        "-" +
        tanggal +
        "-" +
        nominal +
        "-" +
        lengtlasid;
      // console.log(result);
      if (result) {
        if (status == "1") {
          res.status(200).json({
            responCode: 200,
            Msg: "Validasi Berhasil",
            kode_unik: prefix,
          });
        } else {
          res.status(200).json({
            responCode: 200,
            Msg: "Retur Berhasil",
          });
        }
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      responCode: 500,
      // 'Msg': (err.response.data.fault.message).trim(),
      Msg: "Error Server",
    });
  }
}

function inspengajuanpk(req, res) {
  let id_pengajuan = req.body.id_pengajuan;
  let nominal = req.body.nominal;
  let cek = req.body.cek;
  let sisa_nominal = req.body.sisa_nominal;
  let id_anggaran = req.body.id_anggaran;
  let uraian_kegiatan = req.body.uraian_kegiatan;
  let bulan_kegiatan = req.body.bulan_kegiatan;
  let query = model.inspengajuanpk(
    id_pengajuan,
    nominal,
    cek,
    sisa_nominal,
    id_anggaran,
    uraian_kegiatan,
    bulan_kegiatan
  );
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function listpengajaunpk(req, res) {
  let idpengajuan = req.body.idpengajuan;
  let kddepartemen = req.body.kddepartemen;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let query = model.listpengajaunpk(
    idpengajuan,
    kddepartemen,
    perPage,
    currentPage,
    cari
  );
  query
    .then(async (result) => {
      let bsu_pengajuan;
      var data_arr = [];
      for (let i = 0; i < result.data.length; i++) {
        // console.log(result.data[i].id_pk);
        let id_pengajuan = result.data[i].id_pengajuan;
        let total_nominal = await model.getsisanggaranpengajuanpk(id_pengajuan);
        if (total_nominal == null) {
          bsu_pengajuan = 0;
        } else {
          bsu_pengajuan = total_nominal[0].total_nominal;
        }
        let nominal = result.data[i].nominal_pengajuan;
        let penjumlah = nominal - bsu_pengajuan;
        // console.log(total);
        data_arr.push({
          kode_departement: result.data[i].kode_departement,
          kode_sub_mata_anggaran: result.data[i].kode_sub_mata_anggaran,
          id_pengajuan: result.data[i].id_pengajuan,
          id_pk: result.data[i].id_pk,
          id_anggaran: result.data[i].id_anggaran,
          nama_departement: result.data[i].nama_departement,
          nama_kelompok_mata_anggaran:
            result.data[i].nama_kelompok_mata_anggaran,
          nama_mata_anggaran: result.data[i].nama_mata_anggaran,
          nama_sub_mata_anggaran: result.data[i].nama_sub_mata_anggaran,
          jenis_pengajuan: result.data[i].jenis_pengajuan,
          uraian_realisasi: result.data[i].uraian_realisasi,
          nominal_pengajuan: result.data[i].nominal_pengajuan,
          nominal_realisasi: result.data[i].nominal_realisasi,
          bulan_realisasi: result.data[i].bulan_realisasi,
          uraian_pengajuan: result.data[i].uraian_pengajuan,
          status_pengajuan: result.data[i].status_pengajuan,
          kode_unik: result.data[i].kode_unik,
          alasan: result.data[i].alasan,
          sisa_realisasi: penjumlah,
        });
        // console.log(bsu_pengajuan);
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
      console.log(error);
    });
}

function listretur(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let query = model.listretur(
    kdsubmatanggaran,
    kddepartemen,
    perPage,
    currentPage,
    cari
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.data.length >= 1) {
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

function retur(req, res) {
  let id_anggaran = req.body.id_anggaran;
  let jnspengajuan = req.body.jnspengajuan;
  let id_kegiatan = req.body.id_kegiatan;
  let nominal = req.body.nominal;
  let userid = req.body.userid;
  let uraian_kegiatan = req.body.uraian_kegiatan;
  let sisa_nominal = req.body.sisa_nominal;
  let id = req.body.id;
  let query = model.retur(
    id_anggaran,
    jnspengajuan,
    id_kegiatan,
    nominal,
    userid,
    uraian_kegiatan,
    sisa_nominal,
    id
  );
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
          idpengajuan: id,
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result,
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

function returpk(req, res) {
  let id_pengajuan = req.body.id_pengajuan;
  let nominal = req.body.nominal;
  let cek = req.body.cek;
  let sisa_nominal = req.body.sisa_nominal;
  let id_anggaran = req.body.id_anggaran;
  let uraian_kegiatan = req.body.uraian_kegiatan;
  let bulan_kegiatan = req.body.bulan_kegiatan;
  let id = req.body.id;
  let query = model.returpk(
    id_pengajuan,
    nominal,
    cek,
    sisa_nominal,
    id_anggaran,
    uraian_kegiatan,
    bulan_kegiatan,
    id
  );
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function realisasi(req, res) {
  let id_pengajuan = req.body.id_pengajuan;
  let tanggal_pengajuan = req.body.tanggal_pengajuan;
  let tanggal_realisasi = req.body.tanggal_realisasi;
  let kode_pengajuan = req.body.kode_pengajuan;
  let kode_buku = req.body.kode_buku;
  let nominal = req.body.nominal;
  let keterangan = req.body.keterangan;
  let user_id = req.body.user_id;
  let pkp = req.body.pkp;
  let nomor_faktur = req.body.nomor_faktur;
  let tanggal_faktur = req.body.tanggal_faktur;
  let query = model.realisasi(
    id_pengajuan,
    tanggal_pengajuan,
    tanggal_realisasi,
    kode_pengajuan,
    kode_buku,
    nominal,
    keterangan,
    user_id,
    pkp,
    nomor_faktur,
    tanggal_faktur
  );
  query
    .then((result) => {
      // console.log(result);
      if (result >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
          id: result[0],
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function getpengajuan(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let status_anggaran = req.body.status_anggaran;
  let status_pengajuan = req.body.status_pengajuan;
  let jenis_pengajuan = req.body.jenis_pengajuan;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  if (jenis_pengajuan == "PK") {
    let query = model.listpengajaunpkvalid(
      kdsubmatanggaran,
      kddepartemen,
      status_anggaran,
      status_pengajuan,
      jenis_pengajuan,
      perPage,
      currentPage,
      cari
    );
    query
      .then((result) => {
        // console.log(result.length);
        if (result.data.length >= 1) {
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
  } else {
    let query = model.listpengajaun(
      kdsubmatanggaran,
      kddepartemen,
      status_anggaran,
      status_pengajuan,
      jenis_pengajuan,
      perPage,
      currentPage,
      cari
    );
    query
      .then((result) => {
        // console.log(result.length);
        if (result.data.length >= 1) {
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
}

function getidpengajuan(req, res) {
  let idpengajuan = req.body.idpengajuan;
  let kddepartemen = req.body.kddepartemen;
  let status_pengajuan = req.body.status_pengajuan;
  let jenis_pengajuan = req.body.jenis_pengajuan;
  if (jenis_pengajuan == "PK") {
    let query = model.listpengajaunpkvalidid(
      idpengajuan,
      kddepartemen,
      status_pengajuan,
      jenis_pengajuan
    );
    query
      .then((result) => {
        console.log(result);
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
  } else {
    let query = model.listpengajaunid(
      idpengajuan,
      kddepartemen,
      status_pengajuan,
      jenis_pengajuan
    );
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
          });
        }
      })
      .catch(function (error) {
        res.status(500).json({
          responCode: 500,
          Msg: error,
        });
        console.log(error);
      });
  }
}

// function getidkegiatan(req, res) {
//   let idkegiatan = req.body.idkegiatan;
//   let status = req.body.status;
//   let kddepartemen = req.body.kddepartemen;
//   let query = model.getidkegiatan(idkegiatan, status, kddepartemen);
//   query
//     .then(async (result) => {
//       let bsu_keg;
//       var data_arr = [];
//       for (let i = 0; i < result.length; i++) {
//         let id_anggaran = result[i].id_anggaran;
//         let getsisakegiatan = await model.getsisanggarankegiatan(id_anggaran);
//         let nominal_anggaran = getsisakegiatan[0].nominal_a;
//         let nominal_kegiatan = getsisakegiatan[0].nominal_k;
//         // console.log(getsisakegiatan);
//         if (nominal_kegiatan == null) {
//           bsu_keg = 0;
//         } else {
//           bsu_keg = nominal_kegiatan;
//         }
//         let penjumlah = nominal_anggaran - bsu_keg;
//         data_arr.push({
//           id: result[i].id,
//           id_anggaran: result[i].id_anggaran,
//           kode_sub_mata_anggaran: result[i].kode_sub_mata_anggaran,
//           kode_departemen: result[i].kode_departement,
//           uraian_kegiatan: result[i].kegiatan,
//           nominal: result[i].nominal,
//           tahun: result[i].tahun,
//           create_by: result[i].create_by,
//           create_date: result[i].create_date,
//           update_date: result[i].update_date,
//           keterangan: result[i].keterangan,
//           status_anggaran: result[i].status_anggaran,
//           susunan_anggaran: result[i].susunan_anggaran,
//           nama_sub_mata_anggaran: result[i].nama_sub_mata_anggaran,
//           nama_departement: result[i].nama_departement,
//           sisa_nominal: penjumlah,
//           nominal_anggaran: nominal_anggaran,
//           sisa_nominal_pengajuan: result[i].sisa_pengajuan,
//         });
//         // console.log(bsu_keg);
//       }

//       // console.log(data_arr);
//       // let sisa =
//       if (result) {
//         res.status(200).json({
//           responCode: 200,
//           Msg: "Data Tersedia",
//           data: data_arr,
//         });
//       } else {
//         res.status(400).json({
//           responCode: 400,
//           Msg: "Data Tidak Tersedia",
//           //  nomor_ticket: result2[0].nomor_ticket,
//         });
//       }
//     })
//     .catch(function (error) {
//       res.status(500).json({
//         responCode: 500,
//         // 'Msg': (err.response.data.fault.message).trim(),
//         Msg: "Error Server",
//       });
//     });
// }

function topupanggaran(req, res) {
  let idanggaran = req.body.idanggaran;
  let nominalawal = req.body.nominalawal;
  let nominaltopup = req.body.nominaltopup;
  let penanggungjwb = req.body.penanggungjwb;
  let keterangan = req.body.keterangan;
  let query = model.topupanggaran(
    idanggaran,
    nominalawal,
    nominaltopup,
    penanggungjwb,
    keterangan
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function listopupanggaran(req, res) {
  let kdsubmatanggaran = req.body.kdsubmatanggaran;
  let kddepartemen = req.body.kddepartemen;
  let status = req.body.status;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let query = model.listopupanggaran(
    kdsubmatanggaran,
    kddepartemen,
    status,
    perPage,
    currentPage,
    cari
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.data.length >= 1) {
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

function validasitopup(req, res) {
  let id_topup = req.body.id_topup;
  let status = req.body.status;
  let nominal = req.body.nominal;
  let id_anggaran = req.body.id_anggaran;
  let query = model.validasitopup(id_topup, status, nominal, id_anggaran);
  query
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Validasi Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result,
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

function switchanggaran(req, res) {
  let idanggaran_awal = req.body.idanggaran_awal;
  let idanggaran_final = req.body.idanggaran_final;
  let nominalawal = req.body.nominalawal;
  let nominalfinal = req.body.nominalfinal;
  let nominalinout = req.body.nominalinout;
  let penanggungjwb = req.body.penanggungjwb;
  let keterangan = req.body.keterangan;
  let status = req.body.status;
  let userid = req.body.userid;
  let jenis_switchanggaran = req.body.jenis_switchanggaran;
  let query = model.switchanggaran(
    idanggaran_awal,
    idanggaran_final,
    nominalawal,
    nominalfinal,
    nominalinout,
    penanggungjwb,
    keterangan,
    status,
    userid,
    jenis_switchanggaran
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.length >= 1) {
        res.status(200).json({
          responCode: 200,
          Msg: "Simpan Data Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result.sqlMessage,
        });
      }
    })
    .catch(function (error) {
      // console.log(error);
      res.status(400).json({
        responCode: 400,
        // 'Msg': (err.response.data.fault.message).trim(),
        Msg: error,
      });
    });
}

function listswitchanggaran(req, res) {
  // let kdsubmatanggaran = req.body.kdsubmatanggaran;

  let status = req.body.status;
  let perPage = req.body.perPage;
  let currentPage = req.body.currentPage;
  let cari = req.body.cari;
  let jenis_switchanggaran = req.body.jenis_switchanggaran;
  let kddepartemen = req.body.kddepartemen;
  let query = model.listswitchanggaran(
    // kdsubmatanggaran,
    status,
    perPage,
    currentPage,
    cari,
    jenis_switchanggaran,
    kddepartemen
  );
  query
    .then((result) => {
      // console.log(result.length);
      if (result.data.length >= 1) {
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

function validasiswitchanggaran(req, res) {
  let id_switchanggaran = req.body.id_switchanggaran;
  let status = req.body.status;
  let nominal_awal = req.body.nominal_awal;
  let nominal_final = req.body.nominal_final;
  let id_anggaran_awal = req.body.id_anggaran_awal;
  let id_anggaran_final = req.body.id_anggaran_final;
  let query = model.validasiswitchanggaran(
    id_switchanggaran,
    status,
    nominal_awal,
    nominal_final,
    id_anggaran_awal,
    id_anggaran_final
  );
  query
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Validasi Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result,
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

function validasirealisasi(req, res) {
  let id_realisasi = req.body.id_realisasi;
  let status = req.body.status;
  let tanggal_pengajuan = req.body.tanggal_pengajuan;
  let tanggal_realisasi = req.body.tanggal_realisasi;
  let kode_buku = req.body.kode_buku;
  let userid = req.body.userid;
  let status_validasi = req.body.status_validasi;
  let query = model.validasirealisasi(
    id_realisasi,
    status,
    tanggal_pengajuan,
    tanggal_realisasi,
    kode_buku,
    userid,
    status_validasi
  );
  query
    .then((result) => {
      console.log(result);
      if (result) {
        res.status(200).json({
          responCode: 200,
          Msg: "Validasi Berhasil",
        });
      } else {
        res.status(401).json({
          responCode: 401,
          Msg: result,
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

module.exports = {
  inputanggaran,
  listtransaksi,
  inputpresenanggaran,
  getidanggaran,
  listpresentasianggaran,
  validasialokasi,
  inskegiatan,
  listkegiatan,
  validasikegiatan,
  getidkegiatan,
  inspengajuan,
  getpengajuanpk,
  listpengajaun,
  validasipengajuan,
  inspengajuanpk,
  listpengajaunpk,
  listretur,
  retur,
  returpk,
  validasipengajuanpk,
  realisasi,
  getpengajuan,
  inspengajuanpb,
  getidpengajuan,
  listrealisasi,
  topupanggaran,
  listopupanggaran,
  validasitopup,
  switchanggaran,
  listswitchanggaran,
  validasiswitchanggaran,
  validasirealisasi,
};
