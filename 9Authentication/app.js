const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(cookieParser());
/*//to set and retireve a cookie
app.get("/", function (req, res) {
  res.cookie("name", "harsh");
  res.send("done");
});

app.get("/read", function (req, res) {
  console.log(req.cookies);
  res.send("hi");
});

app.listen(3000);
*/

//encryption using bcrypt

app.get("/", function (req, res) {
  res.send("hello");
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("hello123", salt, function (err, hash) {
      console.log(hash);
    });
  });
});

//decryption using bycrypt

app.get("/decrypt", function (req, res) {
  res.send("decrypted");
  bcrypt.compare(
    "hello23",
    "$2b$10$.g2PveHSd58hL5LjIekhke3JQgtbGlssivLejwibu2LzxPXxRjcSO",
    function (err, result) {
      console.log(result);
    }
  );
});
app.listen(3000);
