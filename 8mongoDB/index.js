const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/read", async function (req, res) {
  const users = await userModel.find();
  res.render("read", { users: users });
});

app.post("/create", async function (req, res) {
  const { name, email, url } = req.body;
  let createduser = await userModel.create({
    name,
    email,
    url,
  });

  res.render("index");
});

app.get("/delete/:id", async function (req, res) {
  const deleteduser = await userModel.findOneAndDelete({
    _id: req.params.id,
  });

  res.redirect("/read");
});

app.get("/edit/:id", async function (req, res) {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:id", async function (req, res) {
  let { name, email, url } = req.body;
  let updateduser = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, url },
    { new: true }
  );
  res.redirect("/read");
});
app.listen(3000);
