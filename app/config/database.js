let CONF = require("../config/config");

const knex1 = require("knex")({
  client: "mysql",
  connection: {
    host: CONF.ENV.DATABASE.DB_HOST,
    port: 3306,
    user: CONF.ENV.DATABASE.DB_USER,
    password: CONF.ENV.DATABASE.DB_PASS,
    database: CONF.ENV.DATABASE.DB_NAME,
  },
});

module.exports = { knex1 };
