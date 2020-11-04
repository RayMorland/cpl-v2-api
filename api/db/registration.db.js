var mongoose = require('mongoose');
var Registration = mongoose.model('Registration');

const allRegistrations = async () => {
    try {
        const result = await Registration.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const findRegistration = async (searchQuery) => {

    try {
        const result = await Registration.find(
            searchQuery
        ).
            populate('meetId').
            exec();

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createRegistration = async (newRegistration) => {
    let registration = new Registration(newRegistration);
    registration._id = new mongoose.Types.ObjectId();
    registration.creationDate = new Date();
    registration.lastEditDate = new Date();
    registration.status = 'unpaid';

    try {
        const newRegistration = await registration.save();
        return newRegistration;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateRegistration = async (id, updatedRegistration) => {

    updatedRegistration.lastEditDate = new Date();
    try {
        const result = await Registration.findByIdAndUpdate(
            { "_id": id },
            updatedRegistration,
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const removeRegistration = async (removedRegistration) => {
    try {
        const result = await Registration.findByIdAndRemove(
            { "_id": removedRegistration }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    allRegistrations,
    findRegistration,
    createRegistration,
    updateRegistration,
    removeRegistration
};
