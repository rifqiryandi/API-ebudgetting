require("dotenv").config();
let ENV;
// console.log(process.env.ACCESS_TOKEN_SECRET);
if (process.env.NODE_ENV == "DEV") {
  ENV = {
    AUTHSDM: {
      SSO_TOKEN_URL: process.env.SSO_TOKEN_URL,
      SSO_TOKEN_POSKEY: process.env.SSO_TOKEN_POSKEY,
      SSO_TOKEN_AUTH: process.env.SSO_TOKEN_AUTH,
      SSO_LOGIN_URL: process.env.SSO_LOGIN_URL,
      SSO_LOGIN_POSKEY: process.env.SSO_LOGIN_POSKEY,
      DEV_TOKEN_URL: process.env.DEV_TOKEN_URL,
      DEV_AUTHORIZATION_POS_SDM: process.env.DEV_AUTHORIZATION_POS_SDM,
      DEV_SDM_URL: process.env.DEV_SDM_URL,
      DEV_POSKEY_SDM: process.env.DEV_POSKEY_SDM,
    },
    DATABASE: {
      DB_HOST: process.env.DEV_DB_HOST,
      DB_USER: process.env.DEV_DB_USER,
      DB_PASS: process.env.DEV_DB_PASS,
      DB_NAME: process.env.DEV_DB_NAME,

      DB_SSO_HOST: process.env.DEV_DB_SSO_HOST,
      DB_SSO_USER: process.env.DEV_DB_SSO_USER,
      DB_SSO_PASS: process.env.DEV_DB_SSO_PASS,
      DB_SSO_NAME: process.env.DEV_DB_SSO_NAME,

      DB_SSO_KTR_HOST: process.env.DEV_DB_SSO_KTR_HOST,
      DB_SSO_KTR_USER: process.env.DEV_DB_SSO_KTR_USER,
      DB_SSO_KTR_PASS: process.env.DEV_DB_SSO_KTR_PASS,
      DB_SSO_KTR_NAME: process.env.DEV_DB_SSO_KTR_NAME,
    },
    SECRET: {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    },
  };
} else {
  ENV = {
    AUTHSDM: {
      SSO_TOKEN_URL: process.env.SSO_TOKEN_URL,
      SSO_TOKEN_POSKEY: process.env.SSO_TOKEN_POSKEY,
      SSO_TOKEN_AUTH: process.env.SSO_TOKEN_AUTH,
      SSO_LOGIN_URL: process.env.SSO_LOGIN_URL,
      SSO_LOGIN_POSKEY: process.env.SSO_LOGIN_POSKEY,
      DEV_TOKEN_URL: process.env.DEV_TOKEN_URL,
      DEV_AUTHORIZATION_POS_SDM: process.env.DEV_AUTHORIZATION_POS_SDM,
      DEV_SDM_URL: process.env.DEV_SDM_URL,
      DEV_POSKEY_SDM: process.env.DEV_POSKEY_SDM,
    },
    DATABASE: {
      DB_HOST: process.env.DEV_DB_HOST,
      DB_USER: process.env.DEV_DB_USER,
      DB_PASS: process.env.DEV_DB_PASS,
      DB_NAME: process.env.DEV_DB_NAME,

      DB_SSO_HOST: process.env.DEV_DB_SSO_HOST,
      DB_SSO_USER: process.env.DEV_DB_SSO_USER,
      DB_SSO_PASS: process.env.DEV_DB_SSO_PASS,
      DB_SSO_NAME: process.env.DEV_DB_SSOKTR_NAME,
    },
    SECRET: {
      ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    },
  };
}
// console.log(ENV);

module.exports = { ENV };
