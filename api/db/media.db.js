var mongoose = require('mongoose');
var MediaItem = mongoose.model('Media');

const getAllMediaItems = async () => {
    try {
        const result = await MediaItem.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findMediaItem = async (searchQuery) => {

    try {
        const result = await MediaItem.find(
            searchQuery
        ).
            exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createMediaItem = async (mediaItem) => {
    let newMediaItem = new MediaItem();

    newMediaItem._id = new mongoose.Types.ObjectId();
    newMediaItem.creationDate = new Date();
    newMediaItem.lastEditDate = new Date();
    newMediaItem.url = mediaItem;

    try {
        const result = await newMediaItem.save();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const removeMediaItem = async (mediaItem) => {
    try {
        const result = await MediaItem.findByIdAndRemove(
            { "_id": mediaItem._id }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateMediaItem = async (id, updatedMediaItem) => {

    updatedMediaItem.lastEditDate = new Date();

    try {
        const result = await MediaItem.findByIdAndUpdate(
            { "_id": id },
            updatedMediaItem,
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllMediaItems,
    findMediaItem,
    createMediaItem,
    updateMediaItem,
    removeMediaItem
}