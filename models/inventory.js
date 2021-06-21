const mongoose = require("mongoose");
const Inventory = mongoose.model("Inventory", {
  roomNum: {
    type: Number,
    required: true,
  },
  inventoryName: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = Inventory;