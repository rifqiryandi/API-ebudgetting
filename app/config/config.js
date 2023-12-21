require("dotenv").config();
let ENV;

if (process.env.NODE_ENV == "DEV") {
  ENV = {
    DATABASE: {
      DB_HOST: process.env.DEV_DB_HOST,
      DB_USER: process.env.DEV_DB_USER,
      DB_PASS: process.env.DEV_DB_PASS,
      DB_NAME: process.env.DEV_DB_NAME,
    },
    SECRET: {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    },
  };
} else {
  ENV = {
    DATABASE: {
      DB_HOST: process.env.PROD_DB_HOST,
      DB_USER: process.env.PROD_DB_USER,
      DB_PASS: process.env.PROD_DB_PASS,
      DB_NAME: process.env.PROD_DB_NAME,
    },
    SECRET: {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    },
  };
}
// console.log(ENV);

module.exports = { ENV };
