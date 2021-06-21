const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

app.post("/Guest", postGuest);

app.get("/Guest", getGuest);

app.get("/Guest/:id", getGuestById);

app.delete("/Guest/:id", deleteGuest);

app.put("/Guest/:id", putGuest);

app.listen(4000, () => {
  console.log("Reception server is connected");
});
