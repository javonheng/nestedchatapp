module.exports = (sequelize, Sequelize) => {
  const COMMENT_TABLE = sequelize.define("COMMENT_TABLE", {
    COMMENT_ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    USER_ID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    USERNAME: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    PARENT_COMMENT_ID: {
      type: Sequelize.INTEGER,
    },
    DESCRIPTION: {
      type: Sequelize.STRING(1234),
    },
    IS_DELETED: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    REF_COMMENT_STAGE_ID: {
      type: Sequelize.INTEGER,
      references: {
        model: "REF_COMMENT_STAGE_TABLE",
        key: "REF_COMMENT_STAGE_ID",
      },
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
  return COMMENT_TABLE;
};
