var mongoose = require('mongoose');
var Request = mongoose.model('MeetRequest');

const getAllRequests = async () => {

    try {
        const result = await Request.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const findRequest = async (searchQuery) => {
    try {
        const result = await Request.findOne(
            searchQuery
        ).
        exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createRequest = async (request) => {
    let meetRequest = new Request();
    meetRequest._id = new mongoose.Types.ObjectId();
    meetRequest.meet = request._id;
    meetRequest.coordinator = request.coordinator;
    meetRequest.creationDate = new Date();
    meetRequest.lastEditDate = new Date();
    meetRequest.submissions.push({
        date: new Date(),
        rejectInfo: {}
    });

    try {
        const newMeetRequest = await meetRequest.save();
        return newMeetRequest;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateRequest = async (request) => {
    try {
        const result = await Request.findByIdAndUpdate(
            request._id
        ).
        exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const removeRequest = async (request) => {
    try {
        const result = await Request.findByIdAndRemove(
            request._id
        ).
        exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getMeetFromRequest = async(request) => {
    try {
        const result = await Request.findOne({
            _id: request
        }).
        populate('meet').
        exec();
        return result;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    getAllRequests,
    findRequest,
    createRequest,
    updateRequest,
    removeRequest,
    getMeetFromRequest
}