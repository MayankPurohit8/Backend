//initalize a project with npm
//install express
//install ejs and set up it as view engine
//dynamic routing and how to get data from frontend at backend route
//setting up parsers for form
//setting up ejs for ejs pages
//setting up public static files

const express = require("express");
const { url } = require("inspector");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});
app.listen(3000, function () {
  console.log("running server");
});
