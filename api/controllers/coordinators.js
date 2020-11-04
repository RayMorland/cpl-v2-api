var mongoose = require('mongoose');
var Coordinator = mongoose.model('Coordinator');
var coordinatorService = require('../services/coordinators.service');
const userService = require('../services/users.service');
const paymentService = require('../services/stripe.service');
const notificationService = require('../services/notification.service');
const fileUploadUtil = require('../utils/file-upload.util');

const errorHandler = function (err, res) {
    return res.status(500).send({ message: err.message });
};

const getCoordinators = async (req, res) => {

    try {
        const result = await coordinatorService.getAllCoordinators();
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
};

const submitCoordinatorApplication = async (req, res) => {

    const meetApplication = req.body.meetApplication;

    try {
        const result = await coordinatorService.submitCoordinatorApplication(meetApplication);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
};

const findCoordinator = async (req, res) => {

    const coordinator = req.query;

    try {
        const result = await coordinatorService.findCoordinator(coordinator);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
};

const createCoordinator = async (req, res) => {

    const coordinator = req.body.newCoordinator;

    try { 
        const user = await userService.createUser(coordinator, "coordinator");
        coordinator.userId = user.newUser._id;
        const result = await coordinatorService.createCoordinator(coordinator, req);
        const updatedUser = await userService.updateUser({_id: user.newUser._id, data: {typeId: result._id }});
        // await notificationService.createUserNotification(updatedUser._id);
        // await notificationService.addUserNotification("coordinatorCreated", updatedUser._id, result);
        // await notificationService.createAdminNotification("coordinatorCreated", result);
        res.status(200).send([result, user.token]);
    } catch (err) {
        errorHandler(err, res);
    }
}

const updateCoordinator = async (req, res) => {

    const updatedCoordinator = req.body.updatedCoordinator;
    const id = req.body._id;

    try {
        const result = await coordinatorService.updateCoordinator(id, updatedCoordinator);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
}

const deleteCoordinator = async (req, res) => {

    const coordinator = req.body.deleteCoordinator;

    try {
        const result = await coordinatorService.deleteCoordinator(coordinator);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
}

const getCoordinatorsMeets = async (req, res) => {

    const coordinator = req.query._id;

    try {
        const result = await coordinatorService.getCoordinatorsMeets(coordinator);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err, res);
    }
}

const addExternalAccountToCoordinator = async (req, res) => {
    const externalAccount = req.body;

    try {
        const account = await paymentService.createExternalAccount(externalAccount);
        res.status(200).send(account);
    } catch (err) {
        errorHandler(err, res);
    }
}

const uploadLogo = async (req, res) => {
    try {
        var logo = await fileUploadUtil.uploadFile(req, res);
        return res.status(200).send(logo);
    } catch (err) {
        errorHandler(err, res);
    }
}

module.exports = {
    getCoordinators,
    submitCoordinatorApplication,
    updateCoordinator,
    findCoordinator,
    createCoordinator,
    deleteCoordinator,
    getCoordinatorsMeets,
    addExternalAccountToCoordinator,
    uploadLogo
};