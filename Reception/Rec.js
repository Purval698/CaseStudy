const express = require("express");
const app = express();

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Purval-:Shailaja@123@population.mu5nf.mongodb.net/Reception?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true }, () =>{
    console.log("Reception databse is connected")
});

app.get("/Reception",(req,res) =>{
    res.send({type:"GET"});
});

app.post("/Reception",(req,res) =>{
    res.send({type:"POST"});
});

app.put("/Reception/:id",(req,res) =>{
    res.send({type:"PUT"});
});

app.delete("/Reception/:id",(req,res) =>{
    res.send({type:"DELETE"});
});


app.listen(6767, () =>{
    console.log("Reception server is connected");
}); 