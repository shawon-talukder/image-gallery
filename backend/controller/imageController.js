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
        const images = await Image.find({}).sort("position");

        return res.status(200).json({ images });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"There is a server side error!" })
    }
}

// @method: POST
// @returns: created image content
imageController.createImage = async(req, res)=>{
    try {
        const imageUrl = req.body?.imageUrl && typeof req.body.imageUrl === "string" && req.body.imageUrl.length > 0 ? req.body.imageUrl : false;

        if(!imageUrl){
            return res.status(400).json({message:"All fields required!"});
        }

        // ref: https://stackoverflow.com/questions/19751420/mongoosejs-how-to-find-the-element-with-the-maximum-value
        const lastImage = await Image.find({}).sort('-position').limit(1);

        // get last image position
        const lastImagePosition =  lastImage.length > 0 && lastImage[0].position || 0;

        
        // create image
        const image = await Image.create({
            imageUrl,
            position: lastImagePosition + 1
        });

        if(!image){
            return res.status(400).json({ message: "Something went wrong!" });
        }
        return res.status(201).json({ data: image });
    } catch (error) {
        return res.status(500).json({message:"There is a server side error!"})
    }
}


// Export Model
module.exports = imageController