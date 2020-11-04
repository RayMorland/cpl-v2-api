const mediaService = require('../services/media.service');


const errorHandler = (err, res) => {
  console.log(err.message);
  return res.status(500).send({ message: err.message });
};

const allMediaItems = async (req, res) => {

  try {
    const mediaItems = await mediaService.getAllMediaItems();
    res.status(200).send(mediaItems);
  } catch (err) {
    errorHandler(err, res);
  }
};

const findMediaItem = async (req, res) => {
  let searchQuery = req.query;

  try {
    const media = await mediaService.findMediaItem(searchQuery);
    res.status(200).send(media);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createMediaItem = async (req, res) => {
  let newMedia = req.body.newMedia;

  try {
    const media = await mediaService.createMedia(newMedia);
    res.status(200).send(media);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateMediaItem = async (req, res) => {
  let updatedMedia = req.body.updatedMedia;

  try {
    const media = await mediaService.updateMedia(updatedMedia);
    res.status(200).send(media);
  } catch (err) {
    errorHandler(err, res);
  }
};

const removeMediaItem = async (req, res) => {
  let removedMedia = req.body.removedMedia;

  try {
    const media = await mediaService.removeMedia(removedMedia);
    res.status(200).send(media);
  } catch (err) {
    errorHandler(err, res);
  }
};

const uploadMediaItem = async (req, res) => {

  try {
    var mediaItem = await mediaService.uploadMediaItem(req, res);
    return res.status(200).send(mediaItem);
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message, results: {} });
  }
}

module.exports = {
  allMediaItems,
  createMediaItem,
  findMediaItem,
  updateMediaItem,
  removeMediaItem,
  uploadMediaItem
}
