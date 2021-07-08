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
  roomNum:{
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default:true
}
});

module.exports = room;