const mongoose = require("mongoose");

const staff = mongoose.model("Staff", {
  staffName: {
    type: String,
    required: [true, "Name of staff required"],
  },
  email: {
    type: String,
    required: [true, "Email required"],
  },
  age: {
    type: String,
    required: [true, "age of required"],
  },
  contactNum: {
    type: Number,
    required: [true, "contact of staff required"],
  },
});

module.exports = staff;