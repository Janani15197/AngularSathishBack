const express = require("express");

const app =express();
// const User = require("./Models/user");
const mongoose= require("mongoose");
const user = require("./Routes/user");

mongoose.connect("mongodb://devi:W5PnnnDnNodssxiMm7n07VvEeV1bxhWtmMnT2qTZPkNHyblu6lBbIWw5zb3Gn6hb8B0LIxwMxV4YPLiWCkPoWg==@devi.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@devi@")
.then(()=>{
    console.log("Connected to Database");
    })
    .catch(()=>{
      console.log("Connection Failed");
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.use('/api/user',user)

module.exports = app;
