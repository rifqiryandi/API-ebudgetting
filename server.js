require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const rfs = require("rotating-file-stream");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");
// enable cors
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// morgan logger
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});
// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// app.use(fileUpload());

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });

// app.use(morgan("dev"));
// app.use(morgan("combined", { stream: accessLogStream }));
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]",
    { stream: accessLogStream }
  )
);

// app.use(
//   morgan(":method :url :status :response-time :remote-addr :user-agent", {
//     // skip: function (res) {
//     //   return res.statusCode < 400;
//     // },
//     // stream: accessLogStream,
//   })
// );

app.get("/", (req, res) => {
  res.send("API Running");
});

// routes
require("./app/routes/auth.route")(app);
require("./app/routes/referensi.route")(app);
require("./app/routes/transaksi.route")(app);
require("./app/routes/users.route")(app);
require("./app/routes/externalweb.route")(app);
require("./app/routes/reporting.route")(app);
require("./app/routes/upload_file.route")(app);
require("./app/routes/histori.route")(app);
require("./app/routes/dashboard.route")(app);

app.listen(PORT, () => {
  console.log(`API listening on port ${PORT}`);
});
