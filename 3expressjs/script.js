//express js is an npm package and framework
//it manages everything from recieving requests to sending response

const express = require("express");
const app = express();

//routes creation : part of the url after '/'

//app.get(route,requestHandler(request,response){})

app.use(function (req, res, next) {
  //middleware: will be used before app.get()
  console.log("middleware initated");
  next(); //jump to next .use or .get
});

app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/profile", function (req, res) {
  res.send("yes");
});

app.listen(3000);

//middlewares :: processing in middle of request to server and response from server
