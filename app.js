const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// Pug 템플릿 엔진 사용
app.locals.pretty = true;
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/template", (req, res) => {
  res.render("temp", { time: Date(), title: "Hello Pug" });
});

// static 파일 서비스
app.use(express.static("public"));
app.get("/logo", (req, res) => {
  res.send('Hello Node.js, <img src="nodejs_logo.png">');
});

// 시멘틱 URL
app.get("/topic/:id", (req, res) => {
  var topics = ["JavaScript is...", "Nodejs is...", "Express is..."];
  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.params.id]}
  `;
  res.send(output);
});

app.get("/topic/:id/:mode", (req, res) => {
  res.send(req.params.id + ", " + req.params.mode);
});

// POST 예제 - form
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/form", (req, res) => {
  res.render("form");
});
app.get("/form_receiver", (req, res) => {
  var title = req.query.title;
  var desc = req.query.desc;

  res.send(title + ", " + desc);
});
app.post("/form_receiver", (req, res) => {
  var title = req.body.title;
  var desc = req.body.desc;

  res.send(title + ", " + desc);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/dynamic", (req, res) => {
  var output = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dynamic Page</title>
    </head>
    <body>
        Hello, This is dynamic page!
    </body>
    </html>
    `;
  res.send(output);
});

app.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
