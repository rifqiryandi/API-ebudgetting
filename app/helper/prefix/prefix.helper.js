let model = require("../../model/referensi.model");

function prefixid(nopend) {
  return new Promise(async function (resolve) {
    // console.log(nopend);
    let query = model.getprefix();
    query
      .then((result) => {
        // console.log(result[0].id);
        var lastid = result[0].id;
        if (lastid === null) {
          lastid = 1;
        }
        resolve(lastid);
        // console.log(noticket);
      })
      .catch(function (error) {
        resolve(error);
      });
  });
}


function prefixidpk() {
  return new Promise(async function (resolve) {
    // console.log(nopend);
    let query = model.getprefixpk();
    query
      .then((result) => {
        // console.log(result[0].id);
        var lastid = result[0].id;
        if (lastid === null) {
          lastid = 1;
        }
        resolve(lastid);
        // console.log(noticket);
      })
      .catch(function (error) {
        resolve(error);
      });
  });
}
function getstring2(lastid) {
  var lengtlasid = lastid.toString();
  var lengtid = lengtlasid.length;
  // console.log(lengtid);
  if (lengtid === 1) {
    lengtlasid = "000" + lastid;
  } else if (lengtid === 2) {
    lengtlasid = "00" + lastid;
  } else {
    lengtlasid = "0" + lastid;
  }
  return lengtlasid;
}
function notes(req, res) {
  return new Promise(async function (resolve) {
    let query = model.note();
    query
      .then((result) => {
        var noted = result[0];
        // console.log(notes);
        resolve(noted);
      })
      .catch(function (error) {
        resolve(error);
      });
  });
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDates(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}
// module.exports = prefixticket;
module.exports = { prefixid, notes, formatDate, formatDates, prefixidpk };
