/*
 *
 *
 ------->Title: image Schema & Model
 ->Description: this file is to handle schema related to image, structuring model
 ------>Author: Shawon Talukder
 -------->Date: 11/01/2023
 *
 *
 */

// Dependencies
const mongoose = require("mongoose");

// schema structure
const imageSchema = new mongoose.Schema({
    position: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

// Model Structure
const Image = mongoose.model("image", imageSchema);

// Export Model
module.exports = Image