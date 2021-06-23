const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express"),
 swaggerDocument = require("../swaggerInventoryManager.json");

const app = express();

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
  deleteInventory,
} = require("../controllers/inventory.js");

const {
  postManagerSignUp,
  postManagerLogin,
  checkToken,
} = require("../controllers/managerLogin.js");

const mongoose = require("mongoose");

require("../models/staff");

require("../models/inventory");

mongoose.connect(
    "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Manager?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Manager database connected"));

app.get("/Manager/Staff",getStaff );

app.get("/Manager/Staff/:id", getStaffById);

app.post("/Manager/Staff", postStaff);

app.put("/Manager/Staff/:id", putStaffById);

app.delete("/Manager/Staff/:id", deleteStaffById);

app.get("/Manager/Inventory", getInventory);

app.get("/Manager/Inventory/:id", getInventoryById);

app.post("/Manager/Inventory", postInventory);

app.put("/Manager/Inventory/:id",putInventory);

app.delete("/Manager/Inventory/:id", deleteInventory);

app.post("/Manager/SignUp", postManagerSignUp);

app.post("/Manager/Login", checkToken, postManagerLogin);

app.use(
  '/Manager',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(5001, () => {
  console.log(" Connected to Manager server");
});
