const express = require("express");
const cors = require("cors");
const googleAuth = require("./googleAuth");
const session = require("express-session");
const app = express();
var corsOptions = {
  origin: "http://localhost:3001",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const { setUpRefTables } = require("./configs/database");

const db = require("./models");
db.sequelize.sync();

app.get("/init", (req, res) => {
  setUpRefTables();
});

require("./routes/comment.routes")(app);

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.post("/api/login", async (req, res) => {
  const user = await googleAuth(req.body.token);
  req.session.userId = user.userId;
  res.status(201);
  res.json(user);
});

app.post("/api/logout", async (req, res) => {
  if (req.body.userId) {
    await req.session.destroy();
    res.status(200);
    res.json({ message: "Logout Successfully." });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Comment Tezos Test application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
