const resultsDb = require('../db/results.db');

const getAllResults = async () => {

    try {
        const result = await resultsDb.getAllResults();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findResult = async (searchQuery) => {

    try {
        const result = await resultsDb.findResult(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createResult = async (newResultInfo) => {

    try {
        // const result = await resultsDb.findResult(newResultInfo);
        // if (result.length > 0) {
        //     return true;
        // } else {
            const newResult = await resultsDb.createResult(newResultInfo);
            return newResult;
        // }
    } catch (err) {
        throw new Error(err.message);
    }
};

const createResultFromSpreadsheet = async (newResultInfo, lifts, meetId) => {

    try {
        // const result = await resultsDb.findResult(newResultInfo);
        // if (result.length > 0) {
        //     return true;
        // } else {
            const newResult = await resultsDb.createResultFromSpreadsheet(newResultInfo, lifts, meetId);
            return newResult;
        // }
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateResult = async (id, updatedResult) => {

    try {
        const result = await resultsDb.updateResult(id, updatedResult);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const removeResult = async (deletedResult) => {
    try {
        const result = await resultsDb.removeResult(deletedResult);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllResults,
    createResult,
    createResultFromSpreadsheet,
    findResult,
    updateResult,
    removeResult
};