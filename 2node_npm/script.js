//nodejs is javascript runtime environment

//npm init -> store details of the project

const fs = require("fs");

fs.writeFile("text.txt", "hello world!", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Done!");
  }
});

fs.appendFile("text.txt", "how are you...?", function (err) {
  if (err) {
    console.log("err");
    console.log("Done!");
  }
});

fs.rename("text.txt", "new.txt", function (err) {
  if (err) {
    console.log(err);
  } else console.log("Done");
});

fs.copyFile("new.txt", "new2.txt", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Done");
  }
});

fs.unlink("new.txt", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("removed!");
  }
});

fs.rmdir();
