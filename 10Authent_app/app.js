const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { urlencoded } = require("body-parser");
const exp = require("constants");
const path = require("path");

const userModel = require("./models/userModel");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "./public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/create", async function (req, res) {
  const { name, email, password, age } = req.body;
  bcrypt.genSalt(10, async function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let createdUser = await userModel.create({
        name,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "hello123");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email: req.body.email });
  if (user) {
  }
});
app.post("/logout", function (req, res) {
  res.cookie("token", token);
  res.redirect("/");
});

app.listen(3000);
