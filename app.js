const express = require("express");
const app = express();

//static files
app.use(express.static(__dirname + "/public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/src/views");

//routes front-end
app.get("/", (req, res) => {
  res.render('index.ejs', {title: "Index"})
});

app.get("/login", (req, res) => {
  res.render("login.ejs", {title: "Log In"});
});

app.get("/signin", (req, res) => {
  res.render("signin.ejs", {title: "Sign In"});
});

app.get("/home", (req, res) => {
  res.render("home.ejs", {title: "Home"});
});

//routes api

app.use("/api/v1/users", require("./src/routes/users.routes"));

module.exports = { app };
