var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');

const listAllNotifications = async () => {
    try {
        const result = Notification.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const retrieveNotifications = async (userId) => {

    try {
        const result = await Notification.findOne(
            { "userId": userId}
        ).
            exec();

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createNotification = async (userId) => {
    let createdNotification = new Notification();
    createdNotification._id = new mongoose.Types.ObjectId();
    createdNotification.creationDate = new Date();
    createdNotification.lastEditDate = new Date();
    createdNotification.userId = userId;

    try {
        const newNotification = await createdNotification.save();
        return newNotification;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateNotification = async (id, updatedNotification) => {

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

const addUserNotification = async (userId, notification) => {

    try {
        const result = await Notification.findOneAndUpdate(
            { "userId": userId },
            { "$push": { "notifications": notification } },
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const deleteNotification = async (Notification) => {
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
    listAllNotifications,
    retrieveNotifications,
    createNotification,
    addUserNotification,
    deleteNotification,
    updateNotification
}