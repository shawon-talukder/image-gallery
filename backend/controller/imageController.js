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
const Image = require('../model/image');

// Model Scaffolding
const imageController = {};

// Model Structure
// @method: GET
// @returns: array of images
imageController.getImages = async (req, res) => {
  try {
    const images = await Image.find({}).sort('position');

    return res.status(200).json({ images });
  } catch (error) {
    return res.status(500).json({ message: 'There is a server side error!' });
  }
};

// @method: POST
// @returns: created image content
imageController.createImage = async (req, res) => {
  try {
    const imageUrl = req.body?.imageUrl && typeof req.body.imageUrl === 'string' && req.body.imageUrl.length > 0 ? req.body.imageUrl : false;

    if (!imageUrl) {
      return res.status(400).json({ message: 'All fields required!' });
    }

    // ref: https://stackoverflow.com/questions/19751420/mongoosejs-how-to-find-the-element-with-the-maximum-value
    const lastImage = await Image.find({}).sort('-position').limit(1);

    // get last image position
    const lastImagePosition = (lastImage.length > 0 && lastImage[0].position) || 0;

    // create image
    const image = await Image.create({
      imageUrl,
      position: lastImagePosition + 1,
    });

    if (!image) {
      return res.status(400).json({ message: 'Something went wrong!' });
    }
    return res.status(201).json({ data: image });
  } catch (error) {
    return res.status(500).json({ message: 'There is a server side error!' });
  }
};

// @method: PUT
// update all data's position one by one
// @returns: undefined
imageController.updateList = async (req, res) => {
  try {
    // get list from body
    // eslint-disable-next-line max-len
    const list = req.body.items && req.body.items instanceof Array && req.body.items.length > 0 ? req.body.items : false;

    if (!list) {
      return res.status(400).json({ message: 'invalid request!' });
    }

    // update each items position
    list.forEach(async (item) => {
      await Image.findOneAndUpdate(
        { _id: item.id },
        { position: item.position },
      );
    });

    return res.status(200).json({ message: 'reordered Successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'There is a server side error!' });
  }
};

// @method: delete
// delete all data one by one
// @returns: undefined
imageController.deleteList = async (req, res) => {
  try {
    // get list from body
    // eslint-disable-next-line max-len
    const list = req.body.items && req.body.items instanceof Array && req.body.items.length > 0 ? req.body.items : false;

    if (!list) {
      return res.status(400).json({ message: 'invalid request!' });
    }

    // update each items position
    list.forEach(async (item) => {
      // check if the item is in the database
      const image = await Image.findOne({ _id: item });

      if (!image.imageUrl) {
        return res.status(400).json({ message: 'invalid request!' });
      }

      // delete the image
      await Image.deleteOne(
        // eslint-disable-next-line no-underscore-dangle
        { _id: image._id },
      );

      // get remaining images that are greater than the position
      const remainingImages = await Image.find({ position: { $gt: image.position } }).sort('position').exec();

      // update each position value for remaining items
      // and reduce their position 1 step
      // eslint-disable-next-line no-restricted-syntax
      remainingImages.forEach(async (img) => {
        await Image.updateOne(
          { _id: img.id },
          { $set: { position: img.position - 1 } },
        );
      });

      return item;
    });

    return res.status(200).json({ message: 'Deleted Successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'There is a server side error!' });
  }
};

// Export Model
module.exports = imageController;
