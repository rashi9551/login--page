const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

// connecting mongoose
mongoose.connect("mongodb://127.0.0.1:27017/users").then(console.log("done"));
const userschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const usersModel = new mongoose.model("details", userschema);

function signin(req, res, next) {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/");
  }
}

// login pgae
router.get("/", async (req, res) => {
  if (req.session.isAuth) {
    res.redirect("/home");
  } else {
    res.render("login");
  }
});
// signup page
router.get("/signup", (req, res) => {
  res.render("signup");
});
// login process
router.post("/login", async (req, res) => {
  try {
    const data = await usersModel.findOne({ username: req.body.username });
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (passwordMatch) {
      req.session.username = req.body.username;
      req.session.isAuth = true;
      res.redirect("/home");
    } else {
      res.render("login", { perror: "Invalid password" });
    }
  } catch {
    res.render("login", { unerror: "Invalid username" });
  }
});
// signup data collection
router.post("/sign", async (req, res) => {
  const emailexist = await usersModel.findOne({ email: req.body.email });
  if (emailexist) {
    res.render("signup", { emailexist: "e-mail already exist" });
  } else {
    const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const { username, email, password } = req.body;
    await usersModel.insertMany([
      { username: username, email: email, password: hashedpassword },
    ]);
    res.redirect("/");
  }
});
router.get("/home", signin, (req, res) => {
  if (req.session.isAuth) {
    res.render("home");
  } else {
    res.redirect("/");
  }
});
router.get("/logout", (req, res) => {
  req.session.isAuth = false;
  req.session.destroy();
  res.redirect("/");
});

module.exports = { router, usersModel };
