require("dotenv").config();

const { DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

function setUpRefTables() {
  const createRefStage =
    "create table IF NOT EXISTS REF_COMMENT_STAGE_TABLE (REF_COMMENT_STAGE_ID int NOT NULL, DESCRIPTION varchar(255), PRIMARY KEY (REF_COMMENT_STAGE_ID))";
  database.query(createRefStage, (err) => {
    if (err) throw err;
    res.send("Table created!");
  });
  const insertStage1 =
    'INSERT IGNORE into REF_COMMENT_STAGE_TABLE values (1, "DISCUSSION")';
  database.query(insertStage1, (err) => {
    if (err) throw err;
    res.send("Row 1 created!");
  });
  const insertStage2 =
    'INSERT IGNORE into REF_COMMENT_STAGE_TABLE values (2, "COMMENT 1")';
  database.query(insertStage2, (err) => {
    if (err) throw err;
    res.send("Row 2 created!");
  });
  const insertStage3 =
    'INSERT IGNORE into REF_COMMENT_STAGE_TABLE values (3, "COMMENT 2")';
  database.query(insertStage3, (err) => {
    if (err) throw err;
    res.send("Row 3 created!");
  });
  const insertStage4 =
    'INSERT IGNORE into REF_COMMENT_STAGE_TABLE values (4, "COMMENT 3")';
  database.query(insertStage4, (err) => {
    if (err) throw err;
    res.send("Row 4 created!");
  });
  const insertStage5 =
    'INSERT IGNORE into REF_COMMENT_STAGE_TABLE values (5, "COMMENT 4")';
  database.query(insertStage5, (err) => {
    if (err) throw err;
    res.send("Row 5 created!");
  });
  const insertStage6 =
    'INSERT IGNORE into REF_COMMENT_STAGE_TABLE values (6, "COMMENT 5")';
  database.query(insertStage6, (err) => {
    if (err) throw err;
    res.send("Row 6 created!");
  });
}

module.exports = {
  setUpRefTables,
};
