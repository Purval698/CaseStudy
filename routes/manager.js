const express = require("express");
const app = express();
const staff = require("../models/staff");
const Inventory = require("../models/inventory");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("../swagger.json");

const {
  getStaff,
  getStaffById,
  postStaff,
  putStaffById,
  deleteStaffById,
} = require("../controllers/staff.js");

app.use(bodyParser.json());

const {
  getInventory,
  getInventoryById,
  postInventory,
  putInventory,
  deleteInventory
} = require("../controllers/inventory.js");

const mongoose = require("mongoose");

require("../models/staff");

require("../models/inventory");

mongoose.connect(
    "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Manager?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Manager database connected"));

app.get("/Manager/staff",getStaff );

app.get("/Manager/staff/:id", getStaffById);

app.post("/Manager/staff", postStaff);

app.put("/Manager/staff/:id", putStaffById);

app.delete("/Manager/staff/:id", deleteStaffById);

app.get("/Manager/Inventory", getInventory);

app.get("/Manager/Inventory/:id", getInventoryById);

app.post("/Manager/Inventory", postInventory);

app.put("/Manager/Inventory/:id",putInventory);

app.delete("/Manager/Inventory/:id", deleteInventory);

app.use(
  '/Manager',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(5000, () => {
  console.log(" Connected to Manager server");
});
