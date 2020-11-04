var mongoose = require('mongoose');
var Application = mongoose.model('CoordinatorApplication');

const getAllApplications = async () => {
    try {
        const result = await Application.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findApplication = async (searchQuery) => {

    try {
        const result = await Application.find(
            searchQuery
        ).
            exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createApplication = async (id, application) => {
    let newCoordinatorApplication = new Application();

    newCoordinatorApplication._id = new mongoose.Types.ObjectId();
    newCoordinatorApplication.creationDate = new Date();
    newCoordinatorApplication.lastEditDate = new Date();
    newCoordinatorApplication.status = 'application';
    newCoordinatorApplication.coordinator = new mongoose.Types.ObjectId(id);

    try {
        const result = await newCoordinatorApplication.save();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const removeApplication = async (application) => {
    try {
        const result = await Application.findByIdAndRemove(
            { "_id": application._id }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateApplication = async (id, updatedApplication) => {

    updatedApplication.lastEditDate = new Date();

    try {
        const result = await Application.findByIdAndUpdate(
            { "_id": id },
            updatedApplication,
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getCoordinatorFromApplication = async (application) => {
    try {
        const result = Application.find(
            application
        ).
        populate('coordinator').
        exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllApplications,
    findApplication,
    createApplication,
    updateApplication,
    removeApplication,
    getCoordinatorFromApplication
}