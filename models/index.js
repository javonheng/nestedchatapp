const dbConfig = require("../configs/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log(`Connection was successful!`);
  })
  .catch((err) => {
    console.log(`Unable to connect to database: ${err}`);
  });

db.sequelize = sequelize;
db.comments = require("./comment.model.js")(sequelize, Sequelize);
db.refCommentStage = require("./RefCommentStage.model.js")(
  sequelize,
  Sequelize
);
module.exports = db;
