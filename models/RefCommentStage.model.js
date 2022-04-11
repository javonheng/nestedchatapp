module.exports = (sequelize, Sequelize) => {
  const REF_COMMENT_STAGE_TABLE = sequelize.define("REF_COMMENT_STAGE_TABLE", {
    REF_COMMENT_STAGE_ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    DESCRIPTION: {
      type: Sequelize.STRING,
    },
  });
  return REF_COMMENT_STAGE_TABLE;
};
