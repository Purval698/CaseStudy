const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express"),
 swaggerDocument = require("../swaggerRoom.json");

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

app.get("/Owner/Room", getRoom);

app.get("/Owner/Room/:id", getRoomTypeById);

app.post("/Owner/Room", postRoomType);

app.put("/Owner/Room/:id", putRoom);

app.delete("/Owner/Room/:id",deleteRoom);

app.post("/Owner/SignUp", postOwnerSignUp);

app.post("/Owner/Login", checkToken, postOwnerLogin);

app.use(
  '/Owner',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(1000, () => {
  console.log("Owner server connected");
});
