var mongoose = require('mongoose');
var Notification = mongoose.model('GlobalNotification');

const listAllGlobalNotifications = async () => {
    try {
        const result = Notification.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const retrieveGlobalNotifications = async (searchQuery) => {

    try {
        const result = await Notification.find(
            searchQuery
        ).
            exec();

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createGlobalNotification = async (notificationType, notification) => {
    let createdNotification = new Notification();
    createdNotification._id = new mongoose.Types.ObjectId();
    createdNotification.creationDate = new Date();
    createdNotification.lastEditDate = new Date();
    createdNotification.content = notification;
    createdNotification.type = notificationType;

    try {
        const newNotification = await createdNotification.save();
        return newNotification;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateGlobalNotification = async (id, updatedNotification) => {

    updatedNotification.lastEditDate = new Date();

    try {
        const result = await Notification.findByIdAndUpdate(
            { "_id": id },
            updatedNotification,
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteGlobalNotification = async (Notification) => {
    try {
        const result = await Notification.findByIdAndRemove(
            { "_id": Notification._id }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    listAllGlobalNotifications,
    retrieveGlobalNotifications,
    createGlobalNotification,
    deleteGlobalNotification,
    updateGlobalNotification
}