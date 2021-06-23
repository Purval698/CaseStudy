const mongoose = require("mongoose");

module.exports = mongoose.model("Guest", {
  fullName: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  mobileNum: {
    type: Number,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  arrivalDate: {
    type: Number,
    require: true
  },
  departureDate: {
    type: Number,
    require: true
  }
  
});
