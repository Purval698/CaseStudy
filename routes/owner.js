const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swaggerRoom.json");
var cors = require("cors");

const app = express();

const {
  postOwnerSignUp,
  postOwnerLogin,
  checkToken,
} = require("../controllers/ownerLogin.js");

const mongoose = require("mongoose");

const {
  getRoom,
  getRoomTypeById,
  postRoomType,
  putRoom,
  deleteRoom,
} = require("../controllers/roomType");
require("dotenv").config();
require("../models/roomType");
app.use(bodyParser.json());


// enable cors to the server
const corsOpt = {
  origin: process.env.CORS_ALLOW_ORIGIN || "*", // this work well to configure origin url in the server
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // to works well with web app, OPTIONS is required
  allowedHeaders: ["Content-Type", "Authorization"], // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options("*", cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work

mongoose.connect(
  "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Owner?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Owner database is connected..");
  }
);

app.get("/Owner/Room", getRoom);

app.get("/Owner/Room/:id", getRoomTypeById);

app.post("/Owner/Room", postRoomType);

app.put("/Owner/Room/:id", putRoom);

app.delete("/Owner/Room/:id", deleteRoom);

app.post("/Owner/SignUp", postOwnerSignUp);

app.post("/Owner/Login", postOwnerLogin);

app.use("/Owner", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(1000, () => {
  console.log("Owner server connected");
});
