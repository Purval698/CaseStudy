const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Manager?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true })
.then(() => console.log("database connected"));

app.get("/Manager",(req,res) =>{
    res.send({type:"GET"});
});

app.post("/Manager",(req,res) =>{
    res.send({type:"POST"});
});

app.put("/Manager/:id",(req,res) =>{
    res.send({type:"PUT"});
});

app.delete("/Manager/:id",(req,res) =>{
    res.send({type:"DELETE"});
});

app.listen(4545, () =>{
    console.log("Manager server connected")
});