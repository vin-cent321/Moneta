const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const FamPhos = require("../../models/FamPho");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/addphoto", (req, res) => {
// Form validation - If I had one!
  
FamPhos.findOne({ photos: req.body.photo }).then(photo => {
    if (photo) {
      return res.status(400).json({ photo: "photo already exists" });
    } else {
      const newFamPho = new FamPho({
        zero: req.body.name,
        
      });

    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

module.exports = router;
