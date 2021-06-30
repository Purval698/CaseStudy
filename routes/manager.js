const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const swaggerUi = require("swagger-ui-express"),
 swaggerDocument = require("../swaggerManager.json");

const {
  getStaff,
  getStaffById,
  postStaff,
  putStaffById,
  deleteStaffById,
} = require("../controllers/staff.js");


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

const app = express();

app.use(cookieParser())
app.use(bodyParser.json());





mongoose.connect(
    "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Manager?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Manager database connected"));



app.get("/Manager/Staff",checkToken, getStaff );

app.get("/Manager/Staff/:id",checkToken, getStaffById);

app.post("/Manager/Staff", checkToken,postStaff);

app.put("/Manager/Staff/:id",checkToken, putStaffById);

app.delete("/Manager/Staff/:id",checkToken, deleteStaffById);

app.get("/Manager/Inventory",checkToken, getInventory);

app.get("/Manager/Inventory/:id",checkToken, getInventoryById);

app.post("/Manager/Inventory",checkToken, postInventory);

app.put("/Manager/Inventory/:id",checkToken,putInventory);

app.delete("/Manager/Inventory/:id",checkToken, deleteInventory);

app.post("/Manager/SignUp", postManagerSignUp);

app.post("/Manager/Login",  postManagerLogin);

app.use(
  '/Manager',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
module.exports=app.listen(2001, () => {
  console.log(" Connected to Manager server");
});
