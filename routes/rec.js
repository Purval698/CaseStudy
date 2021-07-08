const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const axios = require("axios");

const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swaggerRec.json");

require("dotenv").config();
app.use(bodyParser.json());
app.use(cookieParser());

// enable cors to the server
const corsOpt = {
  origin: process.env.CORS_ALLOW_ORIGIN || "*", // this work well to configure origin url in the server
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"], // to works well with web app, OPTIONS is required
  allowedHeaders: ["Content-Type", "Authorization"], // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options("*", cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work

mongoose.set("useFindAndModify", false);

const {
  getGuest,
  getGuestById,
  postGuest,
  deleteGuest,
  putGuest,
} = require("../controllers/guest");

// const {
//   getRoom,
//   getRoomById
// } = require("../controllers/availableRoom");

mongoose.connect(
  "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Reception?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Reception databse is connected");
  }
);

const {
  postReceptionSignUp,
  postReceptionLogin,
  checkToken,
} = require("../controllers/receptionLogin.js");

app.post("/Reception/Guest", checkToken, postGuest);
// app.post("/Reception/Guest", postGuest);

app.get("/Reception/Guest", checkToken, getGuest);

app.get("/Reception/Guest/:id", checkToken, getGuestById);

app.delete("/Reception/Guest/:id", checkToken, deleteGuest);

app.put("/Reception/Guest/:id", checkToken, putGuest);

//Room Availability

// app.get("/Reception/availablrRoom",checkToken, getRoom);

// app.get("/Reception/availablrRoom/:id",checkToken, getRoomById);

//REception Login

app.post("/Reception/SignUp", postReceptionSignUp);

app.post("/Reception/Login", postReceptionLogin);

//Axios used

app.get("/Reception/Room", checkToken, async (req, res) => {
  try {
    const response = await axios.get("http://localhost:1000/Owner/Room");
    res.status(200).send(response.data);
    console.log(response);
  } catch (err) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

app.use("/Reception", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app.listen(3000, () => {
  console.log("Reception server is connected");
});
