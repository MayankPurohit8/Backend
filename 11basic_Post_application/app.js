const express = require("express");
const app = express();
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.set("view engine", "ejs");
const postModel = require("./models/post");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", function (req, res) {
  res.render("index");
});

app.post("/create", async function (req, res) {
  const { username, name, email, age, password } = req.body;

  let user = await userModel.findOne({ email });

  if (user) {
    res.status(500).render("/login");
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        let createduser = await userModel.create({
          username,
          name,
          email,
          age,
          password: hash,
        });

        let token = jwt.sign({ email, userId: req.body._id }, "shh");
        res.cookie("token", token);

        res.redirect("/");
      });
    });
  }
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post("/login", async function (req, res) {
  const { email, password } = req.body;

  let user = await userModel.findOne({ email });

  if (!user) {
    res.status(600).redirect("/register");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email, userId: user.__id }, "shh");
      res.cookie("token", token);
      res.status(200).send("/profile");
    } else res.redirect("/login");
  });
});

app.get("/logout", isLoggedin, function (req, res) {
  res.cookie("token", "");
  res.send("/login ");
});

function isLoggedin(req, res, next) {
  if (req.cookies.token === "" || !req.cookies.token) res.redirect("/login");
  else {
    let data = jwt.verify(req.cookies.token, "shh");
    req.user = data;
    next();
  }
}

app.get("/profile", isLoggedin, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");

  res.render("profile", { user: user });
});

app.post("/post", isLoggedin, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });

  let newPost = await postModel.create({
    user: user._id,
    content: req.body.content,
  });

  user.posts.push(newPost._id);
  await user.save();
  res.redirect("/profile");
});

app.listen(3000);
