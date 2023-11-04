// Dependencies
const express = require("express");

//internal
const { 
    getImages,
} = require("../controller/imageController");

// Model Scaffolding
const imageRouter = express.Router();

// Configuration

// Model Structure
// get all images
imageRouter.get("/", getImages);

// Export Model
module.exports = imageRouter