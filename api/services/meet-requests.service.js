const meetRequestsDb = require('../db/meet-requests.db');

const getAllMeetRequests = async () => {
    try {
        const result = await meetRequestsDb.getAllRequests();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findMeetRequest = async (searchQuery) => {
    try {
        const result = await meetRequestsDb.findRequest(searchQuery);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createMeetRequest = async (meetRequest) => {
    try { 
        const result = await meetRequestsDb.createRequest(meetRequest);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateMeetRequest = async (meetRequest) => {
    try {
        const result = await meetRequestsDb.updateRequest(meetRequest);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const deleteMeetRequest = async (meetRequest) => {
    try {
        const result = await meetRequestsDb.removeRequest(meetRequest);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getMeetFromRequest = async (meetRequest) => {
    try {
        const result = await meetRequestsDb.getMeetFromRequest(meetRequest);
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

const acceptMeetRequest = async (meetRequest) => {
    try {
        // Create stripe product for meet
        // Create meet from meet request with stripe product id
    } catch (err) {
        throw new Error(err.message);
    }
};

const rejectMeetRequest = async (meetRequest) => {
    try {
        // Update meet request with reject info
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    getAllMeetRequests,
    createMeetRequest,
    findMeetRequest,
    updateMeetRequest,
    deleteMeetRequest,
    getMeetFromRequest,
    acceptMeetRequest
};