const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FamPhoSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  photos: {
    'zero':{
      type: String,
      default: ['Vermin Supreme','https://tinyurl.com/r7nx2kv'],
    }, 
    '1':{
      type: String,
    },
    '2':{
      type: String,
    },
    '3':{
      type: String,
    },
    '4':{
      type: String,
    },
    '5':{
      type: String,
    },
    '6':{
      type: String,
    },
    '7':{
      type: String,
    },
    '8':{
      type: String,
    },
    '9':{
      type: String,
    },
    '10':{
      type: String,
    },
    '11':{
      type: String,
    }
  }
});

module.exports = FamPho = mongoose.model("famphos", FamPhoSchema);
