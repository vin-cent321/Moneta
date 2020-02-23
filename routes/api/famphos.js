const express = require("express");
const router = express.Router();
var Image = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const multer = require("multer");
const fs = require("file-system");

// Load input validation
// const validateRegisterInput = require("../../validation/register");
// const validateLoginInput = require("../../validation/login");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // console.log(req.body)
    cb(null, 'client/public/images/uploads');
    //client/build/public
  },
  filename: function(req, file, cb) {
    // console.log(req.file, file.originalname)
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {
    files: 12
  },
  fileFilter: fileFilter
});

router.post("/", upload.single('image'), (req, res, next) => {
  // console.log("this is file " + req.file + "BOTTOM");
  if (req.file) {
    res.json({
      imageUrl: `/images/uploads/${req.file.filename}`
    });
  }
  else res.status("409").json("No files to upload");
});

module.exports = router;
