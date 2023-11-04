/*
 *
 *
 ------->Title: 
 ->Description: 
 ------>Author: Shawon Talukder
 -------->Date: 11/04/2023
 *
 *
 */

// Dependencies
const Image = require("../model/image");

// Model Scaffolding
const imageController = {};

// Model Structure
// @method: GET
// @returns: array of images
imageController.getImages = async(req, res)=>{
    try {
        const images = await Image.find().sort("position");

        return res.status(200).json({images});
    } catch (error) {
        return res.status(500).json({message:"There is a server side error!"})
    }
}




// Export Model
module.exports = imageController