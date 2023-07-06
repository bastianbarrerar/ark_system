const express = require("express");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view-engine', 'ejs')

//routes
app.get("/", (req, res) => {
  res.render('home.ejs')
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/signin", (req, res) => {
  res.render("signin.ejs");
});


module.exports = { app };
