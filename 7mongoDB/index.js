const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", function (req, res) {
  res.send("HELLO WORLD");
});

app.get("/create", async function (req, res) {
  let createduser = await userModel.create({
    name: "Mayank",
    userName: "mayank",
    email: "mayank@gmail.com",
  });
  res.send(createduser);
});

app.get("/update", async function (req, res) {
  const updateduser = await userModel.findOneAndUpdate(
    { name: "mayank" },
    { userName: "Mayank Purohit" },
    { new: true }
  );
  res.send(updateduser);
});

app.get("/read", async function (req, res) {
  const users = await userModel.find();
  res.send(users);
});

app.get("/delete", async function (req, res) {
  const deleteduser = await userModel.findOneAndDelete({ name: "mayank" });
  res.send("user del");
});

app.listen(3000);
