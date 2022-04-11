module.exports = {
  HOST: "mysql",
  USER: "root",
  PASSWORD: "my-secret-pw",
  DB: "tezos",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
