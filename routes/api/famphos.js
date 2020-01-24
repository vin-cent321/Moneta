const express = require("express");
const ImageRouter = express.Router();
var Image = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const multer = require("multer");
const cors = require("cors");


// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
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

ImageRouter.router('uploadmulter')
.post(upload.single('imageData'), (req, res, next) => {
  console.log(req.body);
  const newImage = new Image({
    imageName: req.body.imageName,
    imageData: req.file.path
  });

  newImage.save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        success: true,
        document: result
      });
    })
    .catch((err) => next(err));
});
// Load User model

module.exports = router;
