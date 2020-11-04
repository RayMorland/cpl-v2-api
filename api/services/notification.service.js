const notificationDb = require('../db/notifications.db');
const notificationUtil = require('../utils/notification.util');
const globalNotificationsDb = require('../db/global-notifications.db');
const adminNotificationsDb = require('../db/admin-notifications.db');

const listAllNotifications = async () => {
    try {
        const result = await notificationDb.listAllNotifications();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const retrieveNotifications = async (searchQuery) => {

    try {
        const result = await notificationDb.retrieveNotifications(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getGlobalNotifications = async () => {
    try {
        const notifications = await globalNotificationDb.retrieveGlobalNotifications();
        return notifications;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createGlobalNotification = async (notificationType, notification) => {

    try {
        const newNotification = await globalNotificationsDb.createGlobalNotification(notificationType, notification);
        return newNotification;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAdminNotifications = async () => {
    try {
        const notifications = await adminNotificationsDb.listAllNotifications();
        return notifications;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createAdminNotification = async (notificationType, data) => {
    try {
        const notification = notificationUtil.buildNotification(notificationType, data);
        const newNotification = await adminNotificationsDb.createNotification(notificationType, notification);
        return newNotification;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getUserNotifications = async (userId) => {
    try {
        const notifications = await notificationDb.retrieveNotifications(userId);
        return notifications;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createUserNotification = async (userId) => {
    try {
        const newNotification = await notificationDb.createNotification(userId);
        return newNotification;
    } catch (err) {
        throw new Error(err.message);
    }
};

const addUserNotification = async (notificationType, userId, data) => {

    try {
        const notification = notificationUtil.buildNotification(notificationType, data);
        const newNotification = await notificationDb.addUserNotification(userId, notification);
        return newNotification;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateNotification = async (id, updatedNotification) => {

    try {
        const result = await notificationDb.updatedNotification(id, updatedNotification);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteNotification = async (notification) => {
    try {
        const result = await notificationDb.deleteNotification(notification);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createAdminNotification,
    createGlobalNotification,
    getUserNotifications,
    getAdminNotifications,
    getGlobalNotifications,
    createUserNotification,
    addUserNotification,
    updateNotification,
    deleteNotification,
    retrieveNotifications,
    listAllNotifications
}