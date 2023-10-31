// Dependencies
const express = require("express");

// Model Scaffolding
const imageRouter = express.Router();

// Configuration

// Model Structure
imageRouter.get("/", (req, res)=>{
    res.send({message:"hello from image"});
});

// Export Model
module.exports = imageRouter