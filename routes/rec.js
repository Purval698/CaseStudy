const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express"),
 swaggerDocument = require("../swaggerRec.json");

app.use(bodyParser.json());

mongoose.set("useFindAndModify", false);

const {
  getGuest,
  getGuestById,
  postGuest,
  deleteGuest,
  putGuest
} = require("../controllers/guest");

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
  checkToken
} = require("../controllers/receptionLogin.js");


app.post("/Reception/Guest", postGuest);

app.get("/Reception/Guest", getGuest);

app.get("/Reception/Guest/:id", getGuestById);

app.delete("/Reception/Guest/:id", deleteGuest);

app.put("/Reception/Guest/:id", putGuest);

app.post("/Reception/SignUp", postReceptionSignUp);

app.post("/Reception/Login", checkToken, postReceptionLogin);

app.use(
  '/Reception',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(4001, () => {
  console.log("Reception server is connected");
});
