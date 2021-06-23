const mongoose = require("mongoose");
const room = mongoose.model("room", {
  roomType:{
    type: String,
    required: true,
  },
  roomPrice:{
    type: Number,
    required: true,
  },

keySpec:{
    type: String,
    required: true,
  },
});

module.exports = room;