// Dependencies
const express = require('express');

// internal
const {
  getImages,
  createImage,
  updateList,
  deleteList,
} = require('../controller/imageController');

// Model Scaffolding
const imageRouter = express.Router();

// Configuration

// Model Structure
// get all images
imageRouter.get('/', getImages);

// create an image
imageRouter.post('/', createImage);

// update position
imageRouter.put('/reorder', updateList);

// delete images
imageRouter.delete('/', deleteList);

// Export Model
module.exports = imageRouter;
