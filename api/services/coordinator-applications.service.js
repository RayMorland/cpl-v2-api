const applicationsDb = require('../db/coordinator-applications.db');
const coordinatorsDb = require('../db/coordinators.db');

const getAllApplications = async () => {

    try {
        const result = await applicationsDb.getAllApplications();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findApplication = async (searchQuery) => {

    try {
        const result = await applicationsDb.findApplication(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createApplication = async (id, newApplicationInfo) => {

    try {
        //const result = await applicationsDb.findApplication(newApplicationInfo);
        const result = [];
        if (result.length > 0) {
            throw new Error("Coordinator Application already exists");
        } else {
            const newApplication = await applicationsDb.createApplication(id, newApplicationInfo);
            const updatedCoordinator = await coordinatorsDb.updateCoordinator(id, {
                application: newApplication._id, 
                status: "pending" 
            });
            console.log(newApplication);
            return newApplication;
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

const acceptApplication = async (application) => {
    // Create coordinator
    // Create connected account for coordinator
};

const rejectApplication = async (application) => {
    //  Push reject info to application
};

const updateApplication = async (id, updatedApplication) => {

    try {
        const result = await applicationsDb.updateApplication(id, updatedApplication);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const removeApplication = async (deletedApplication) => {
    try {
        const result = await applicationsDb.removeApplication(deletedApplication);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllApplications,
    createApplication,
    findApplication,
    updateApplication,
    removeApplication,
    acceptApplication,
    rejectApplication
};