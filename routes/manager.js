// imports
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swaggerManager.json");
var cors = require("cors");

// initialize express
const app = express();

// middlewares
require("dotenv").config();
app.use(cookieParser());
app.use(bodyParser.json());


// enable cors to the server
const corsOpt = {
  origin: process.env.CORS_ALLOW_ORIGIN || "*", // this work well to configure origin url in the server
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // to works well with web app, OPTIONS is required
  allowedHeaders: ["Content-Type", "Authorization"], // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options("*", cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work

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

mongoose
  .connect(
    "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Manager?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Manager database connected"));

app.get("/Manager/Staff", getStaff);

app.get("/Manager/Staff/:id", checkToken, getStaffById);

app.post("/Manager/Staff", checkToken, postStaff);

app.put("/Manager/Staff/:id", checkToken, putStaffById);

app.delete("/Manager/Staff/:id", checkToken, deleteStaffById);

//Inventory APIs

app.get("/Manager/Inventory", checkToken, getInventory);

app.get("/Manager/Inventory/:id", checkToken, getInventoryById);

app.post("/Manager/Inventory", checkToken, postInventory);

app.put("/Manager/Inventory/:id", checkToken, putInventory);

app.delete("/Manager/Inventory/:id", checkToken, deleteInventory);

app.post("/Manager/SignUp", postManagerSignUp);

app.post("/Manager/Login", postManagerLogin);

app.use("/Manager", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app.listen(2001, () => {
  console.log("Connected to Manager server");
});
