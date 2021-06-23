const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const {
  postOwnerSignUp,
  postOwnerLogin,
  checkToken,
} = require("../controllers/ownerLogin.js");

const mongoose = require("mongoose");

const{getRoom,getRoomTypeById,postRoomType,putRoom,deleteRoom} = require("../controllers/roomType")

require("../models/roomType");
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Owner?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Owner database is connected..");
  }
);

app.get("/owner/room", getRoom);

app.get("/owner/room/:id", getRoomTypeById);

app.post("/owner/room", postRoomType);

app.put("/owner/room/:id", putRoom);

app.delete("/owner/room/:id",deleteRoom);

app.post("/owner/SignUp", postOwnerSignUp);

app.post("/owner/Login", checkToken, postOwnerLogin);

app.listen(6000, () => {
  console.log("Owner server connected");
});
