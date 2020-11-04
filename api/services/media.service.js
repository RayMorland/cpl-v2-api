const mediaItemsDb = require('../db/media.db');
const fileUploadUtil = require('../utils/file-upload.util');

const getAllMediaItems = async () => {

    try {
        const result = await mediaItemsDb.getAllMediaItems();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findMediaItem = async (searchQuery) => {

    try {
        const result = await mediaItemsDb.findMediaItem(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createMediaItem = async (newMediaItem) => {

    try {
        const result = await mediaItemsDb.findMediaItem(newMediaItem);
        if (result.length > 0) {
            return true;
        } else {
            const newMediaItem = await MediaItemsDb.createMediaItem(newMediaItem);
            return newMediaItem;
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateMediaItem = async (updatedMediaItem) => {

    try {
        const result = await mediaItemsDb.updateMediaItem(updatedMediaItem);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteMediaItem = async (deletedMediaItem) => {
    try {
        const result = await mediaItemsDb.getMediaItemMeets(deletedMediaItem);
        return result;
    } catch (err) {
        errorHandler(err);
    }
};

const uploadMediaItem = async (req, res) => {
    try {
        var mediaItem = await fileUploadUtil.uploadFile(req, res);
        var newMediaItem = await mediaItemsDb.createMediaItem(mediaItem);
        return newMediaItem;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    createMediaItem,
    findMediaItem,
    getAllMediaItems,
    updateMediaItem,
    deleteMediaItem,
    uploadMediaItem
};