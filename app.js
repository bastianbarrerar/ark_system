const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { validateToken, checkAuthenticated, logOut } = require("./JWT");


//static files
app.use(express.static(__dirname + "/public"));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set("views", __dirname + "/src/views");
app.use(cookieParser());

//routes front-end
app.get("/", checkAuthenticated, (req, res) => {
  res.render('index.ejs', {title: "Index"})
});

app.get("/login", checkAuthenticated, (req, res) => {
  res.render("login.ejs", { title: "Log In" });
});

app.get("/signin", checkAuthenticated, (req, res) => {
  res.render("signin.ejs", { title: "Sign In" });
});

app.get("/home", validateToken, (req, res) => {
  res.render("home.ejs", {title: "Home"});
});

app.get("/logout", logOut);


//routes api

app.use("/users", require("./src/routes/users.routes"));

module.exports = { app };
