var express = require("express");
var router = express.Router();
const userModel = require("../models/users");
// const loginModel = require("../models/login");
// var db = require("../config/mongoose-connection");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const multer = require("multer");
const bookModel = require("../models/book");
// require("dotenv").config();
const { IsLoggedIn } = require("../middleware/isLoggedin");
const { isAdmin } = require("../middleware/adminAuth");
// const {isAdmin} = require("../middleware/adminAuth")
// const {adminAuth} = require("../middleware/isLoggedin")
const adminModel = require("../models/admin");
const { token } = require("morgan");
const jwtSecret = process.env.SECRET_KEY;
console.log(process.env.NODE_ENV);

// import {Admin_email} from "../config/admin-only";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
/* GET home page. */

//  Upload an image

// main page route
router.get("/", function (req, res) {
  res.render("index");
  console.log(req.cookies);
});
//login route
router.get("/login/user", async function (req, res) {
  res.render("login");
});
router.post("/login/user", async function (req, res) {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.render("error");

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result == true) {
      var token = jwt.sign({ email: req.body.email }, "ayush");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      res.render("error");
    }
  });
});

router.get("/register", function (req, res) {
  res.render("register");
});

// register route

router.post("/register", upload.single("upldimg"), async function (req, res) {
  let user = await userModel.findOne({ email: req.body.email });
  if (user) res.send("email already exist");
  else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const user = await userModel.create({
          fname: req.body.fname,
          lname: req.body.lname,
          username: req.body.username,
          phone: req.body.pnumber,
          email: req.body.email,
          age: req.body.age,
          password: hash,
          Address: req.body.Address,
          Image: req.file.filename,
          language: req.body.language,
          gender: req.body.gender,
          genre: req.body.genere,
        });
        var usertoken = jwt.sign({ email: req.body.email }, "ayush");
        res.cookie("token", usertoken);
        console.log(user);
        res.render("sucess");
      });
    });
  }
});
// Profile route
router.get("/profile", IsLoggedIn, async function (req, res) {
  try {
    if (!req.user || !req.user.email) {
      return res.status(500).send("user not found");
    }
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.send("invalid request");
    else {
      return res.render("profile", { user: user });
    }
  } catch (err) {
    res.send("error");
  }
});

// user read route

router.get("/user", isAdmin, async function (req, res) {
  let alluser = await userModel.find();
  console.log(alluser);
  res.render("user", { users: alluser });
});

// delete route
router.get("/delete/:id", isAdmin, async function (req, res) {
  const user = req.params.id;
  await userModel.findOneAndDelete(user);
  res.redirect("/read");
});
// logout route
router.get("/logout", function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
});

// update routes
router.get("/user/update", async function (req, res) {
  res.render("update");
});
router.post("/user/update", async function (req, res) {
  try {
    const user = await userModel.findOne({ email: req.body.email_id });
    if (!user) return res.send("user not found");
    else {
      const hashPasssword = await bcrypt.hash(req.body.pass, 10);
      const updatedUser = await userModel.findOneAndUpdate(
        { email: req.body.email_id },
        { password: hashPasssword },
        { new: true }
      );
      console.log(updatedUser);
      res.redirect("/profile");
    }
  } catch (err) {
    res.render("error");
  }
});

router.get("/books", function (req, res) {
  res.render("booksSearch");
});

// createBook route
router.get("/createBooks", isAdmin, function (req, res) {
  res.render("addBooks");
});
console.log(process.env.NODE_ENV);

router.post("/createBooks", async function (req, res) {
  try {
    const books = await bookModel.create({
      description: req.body.des,
      book: req.body.books,
      author: req.body.author,
      link: req.body.link,
      Image: req.body.img,
    });
    console.log(books);
    res.redirect("/adminDash");
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});
//delete book route
router.get("/delete", async function (req, res) {
  const books = await bookModel.find(); // Fetch all books
  console.log(books);
  res.render("delete", { books: books });
});

// Delete book route
router.get("/deleteBook/:id", isAdmin, async function (req, res) {
  const book = req.params.id;
  await bookModel.findByIdAndDelete(book);
  res.redirect("/delete");
});

// Read books route
router.get("/readBooks", IsLoggedIn, async function (req, res) {
  const books = await bookModel.find();
  res.render("readBooks", { books: books });
});

// Admin register
router.post("/register/admin", async function (req, res) {
  const admin = await adminModel.find();
  const { names, email_id, number, pass } = req.body;
  try {
    if (admin.length > 0) {
      res.send("admin cannot be created");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pass, salt, async function (err, hash) {
          const adminCreated = await adminModel.create({
            fname: names,
            phone: number,
            email: email_id,
            password: hash,
            secret: jwtSecret,
          });
          console.log(adminCreated);
          res.render("sucess");
        });
      });
    }
  } catch (err) {
    res.render("error");
  }
});

router.get("/admin/login", function (req, res) {
  res.render("adminlogin");
});

// Admin login
router.post("/admin/login", async function (req, res) {
  const email = req.body.email.trim();
  try {
    const email = await adminModel.find();
    console.log(email);
    
    const admin = await adminModel.findOne({email});
    console.log(admin);
    console.log(req.body);
    
    if (!admin) {
      return res.send("error");
    }
    else if (admin.secret === req.body.sec_key) {
      bcrypt.compare(req.body.password, admin.password, function (err, result) {
        // if (err) {
        //   res.render("error");
        // }
        if (result == true) {
          const adminToken = jwt.sign({ email: req.body.email }, jwtSecret);
          res.cookie("token", adminToken);
          res.redirect("/adminDash");
        } else {
          res.render("error");
        }
      });
    } else {
      res.render("error");
    }
  } catch {
    res.render("error");
  }
});
// admindash route
router.get("/adminDash", isAdmin, function (req, res) {
  res.render("admindash");
});
router.get("/register/admin", function (req, res) {
  res.render("adminregister");
});

module.exports = router;
