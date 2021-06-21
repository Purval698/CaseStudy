const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Owner?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Owner database is connected..");
  }
);

app.get("/Owner", (req, res) => {
  res.send({ type: "GET" });
});

app.post("/Owner", (req, res) => {
  res.send({ type: "POST" });
});

app.put("/Owner/:id", (req, res) => {
  res.send({ type: "PUT" });
});

app.delete("/Owner/:id", (req, res) => {
  res.send({ type: "DELETE" });
});

app.listen(6000, () => {
  console.log("Owner server connected");
});
