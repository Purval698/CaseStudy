const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express"),
 swaggerDocument = require("../swaggerRec.json");

app.use(bodyParser.json());
app.use(cookieParser())

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


app.post("/Reception/Guest",checkToken, postGuest);

app.get("/Reception/Guest",checkToken, getGuest);

app.get("/Reception/Guest/:id",checkToken, getGuestById);

app.delete("/Reception/Guest/:id",checkToken, deleteGuest);

app.put("/Reception/Guest/:id",checkToken, putGuest);

app.post("/Reception/SignUp", postReceptionSignUp);

app.post("/Reception/Login",  postReceptionLogin);

app.use(
  '/Reception',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.listen(3000, () => {
  console.log("Reception server is connected");
});
