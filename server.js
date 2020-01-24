const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const fs = require("file-system");
const multer = require("multer");
const users = require("./routes/api/users");
const cors = require("cors");
const path = require("path");
const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors());
// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// UP2 TEST =======================================================================
// UP2 TEST =======================================================================
// UP2 TEST =======================================================================
// UP2 TEST =======================================================================
 
      //pulled from https://www.genuitec.com/react-image-upload/ and it doesn't work

// const express = require('express'); 
// const multer = require('multer');
// const cors = require('cors');
// const app = express();
// app.use(express.static('public'))
var storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, 'public/images/uploads')
},
filename: (req, file, cb) => {
cb(null, Date.now() + '-' + file.originalname)
}
});
const upload = multer({ storage })
app.use(cors());
app.post('/upload', upload.single('image'), (req, res) => {
if (req.file)
res.json({
imageUrl: `images/uploads/${req.file.filename}`
});
else 
res.status("409").json("No Files to Upload.");
});

// UP2 TEST =======================================================================
// UP2 TEST =======================================================================
// UP2 TEST =======================================================================
// UP2 TEST =======================================================================

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
