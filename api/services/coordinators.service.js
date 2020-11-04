const coordinatorsDb = require('../db/coordinators.db');
const coordinatorApplicationsDb = require('../db/coordinator-applications.db');
const stripeApi = require('../utils/stripe.util');

const getAllCoordinators = async () => {

    try {
        const result = await coordinatorsDb.allCoordinators();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findCoordinator = async (searchQuery) => {

    try {
        const result = await coordinatorsDb.findCoordinator(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createCoordinator = async (newCoordinatorInfo, req) => {
    try {
        // const result = await coordinatorsDb.findCoordinator({email: newCoordinatorInfo.email });
        // console.log(result);
        // if (result != null && result != undefined) {
        //     if (result.length > 0) {
        //         throw new Error("Coordinator already exists");
        //     } else {
                let newCoordinator = await coordinatorsDb.createCoordinator(newCoordinatorInfo);
                let connectAccount = await stripeApi.createConnectAccount(newCoordinator, req);
                let updatedCoordinator = await coordinatorsDb.updateCoordinator(
                    newCoordinator._id, 
                    { 
                        stripeId: connectAccount.id
                    });
                return updatedCoordinator;
        //     }
        // }
        // throw new Error("Null Result");
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateCoordinator = async (id, updatedCoordinator) => {

    try {
        const result = await coordinatorsDb.updateCoordinator(id, updatedCoordinator);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteCoordinator = async (deletedCoordinator) => {
    try {
        const result = await coordinatorsDb.getCoordinatorMeets(deletedCoordinator);
        return result;
    } catch (err) {
        errorHandler(err);
    }
};

const getCoordinatorsMeets = async (coordinator) => {
    try {
        const result = await coordinatorsDb.getCoordinatorsMeets(coordinator);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createCoordinator,
    findCoordinator,
    getAllCoordinators,
    updateCoordinator,
    deleteCoordinator,
    getCoordinatorsMeets
}