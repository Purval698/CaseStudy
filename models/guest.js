const mongoose = require("mongoose");

module.exports = mongoose.model("Guest", {
  fullName: {
    type: String,
   required: true
  },
  roomNum: {
    type:Number,
   required:  true,
   unique: true
  },
  roomType:{
    type: String,
    required:true
  },
  address: {
    type: String,
   required: true
  },
  mobileNum: {
    type: Number,
   required: true,
   unique: true
  },
  age: {
    type: Number,
   required: true
  },
  arrivalDate: {
    type: String,
   required: true
  },
  departureDate: {
    type: String,
   required: true
  },
  bill:{
    type:Number,
    required: true
  }
  
});
