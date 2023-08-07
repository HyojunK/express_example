var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty = true;
app.set("views", "./views_file");
app.set("view engine", "pug");

app.get("/topic/new", (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.render("new", { topics: files });
  });
});

app.get(["/topic", "/topic/:id"], (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    var id = req.params.id;
    if (id) {
      fs.readFile("data/" + id, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send("Internal Server Error");
        }
        res.render("view", { title: id, topics: files, desc: data });
      });
    } else {
      res.render("view", {
        topics: files,
        title: "Welcome",
        desc: "Hello, JavaScript for server",
      });
    }
  });
});

// app.get("/topic/:id", (req, res) => {
//   var id = req.params.id;
//   fs.readdir("data", (err, files) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     }
//     fs.readFile("data/" + id, "utf-8", (err, data) => {
//       if (err) {
//         console.log(err);
//         res.status(500).send("Internal Server Error");
//       }
//       res.render("view", { title: id, topics: files, desc: data });
//     });
//   });
// });

app.post("/topic", (req, res) => {
  var title = req.body.title;
  var desc = req.body.desc;
  fs.writeFile("data/" + title, desc, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    res.redirect("/topic/" + title);
  });
});
app.listen(3000, () => {
  console.log("Connected 3000 port!");
});
