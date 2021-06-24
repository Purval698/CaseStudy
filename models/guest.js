const mongoose = require("mongoose");

module.exports = mongoose.model("Guest", {
  fullName: {
    type: String,
   required: true
  },
  roomNum: {
    type:Number,
   required:  true
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
   required: true
  },
  age: {
    type: Number,
   required: true
  },
  arrivalDate: {
    type: Number,
   required: true
  },
  departureDate: {
    type: Number,
   required: true
  },
  bill:{
    type:Number,
    required: true
  }
  
});
