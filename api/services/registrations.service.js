const registrationsDb = require('../db/registration.db');
const membersDb = require('../db/members.db');
const registrationUtil = require('../utils/registration.util');
var mongoose = require('mongoose');
var Registration = mongoose.model('Registration');

const allRegistrations = async () => {

    try {
        const result = await registrationsDb.allRegistrations();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findRegistration = async (searchQuery) => {

    try {
        const result = await registrationsDb.findRegistration(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createRegistration = async (newRegistrationInfo) => {

    let newRegistration;
    let stripeCharge;
    let registrationPdf;
    let updatedRegistration;

    try {
        const result = await Registration.
            find({
                meetId: newRegistrationInfo.meetId,
                memberId: newRegistrationInfo.memberId
            }).
            exec();
        if (result != null && result != undefined) {
            if (result.length > 0) {
                throw new Error("Registration already exists");
            } else {
                newRegistration = await registrationsDb.createRegistration(newRegistrationInfo);
                return newRegistration;
            }
        }
        throw new Error("Null Result");
    } catch (err) {
        throw new Error(err.message);
    }
};

const createRegistrationsSpreadsheet = async (meetId) => {

    try {
        const result = await registrationUtil.generateRegistrationsSpreadsheet(meetId);
        console.log('ciao', result);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateRegistration = async (id, updatedRegistration) => {

    try {
        const result = await registrationsDb.updateRegistration(id, updatedRegistration);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const removeRegistration = async (removedRegistration) => {

    try {
        const result = await registrationsDb.removeRegistration(removedRegistration);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createRegistration,
    createRegistrationsSpreadsheet,
    findRegistration,
    allRegistrations,
    updateRegistration,
    removeRegistration
}