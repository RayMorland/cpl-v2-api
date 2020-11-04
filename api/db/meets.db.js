var mongoose = require('mongoose');
var Meet = mongoose.model('Meet');

// Get all meets
const allMeets = async () => {
    try {
        const result = await Meet.find().exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

// Find a meet given search params
const findMeet = async (searchQuery) => {

    try {
        const result = await Meet.find(
            searchQuery
        ).
            exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

// Create a new meet
const createMeet = async (newMeet) => {
    let meet = new Meet(newMeet);
    meet._id = new mongoose.Types.ObjectId();
    meet.creationDate = new Date();
    meet.lastEditDate = new Date();
    meet.status = 'created';

    try {
        const newMeet = await meet.save();
        return newMeet;
    } catch (err) {
        throw new Error(err.message);
    }
}

// Remove a meet permanently
const removeMeet = async (meet) => {
    try {
        const result = await Meet.findByIdAndRemove(
            { "_id": meet._id }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

// Update a meet
const updateMeet = async (id, updatedMeet) => {

    try {
        const result = await Meet.findOneAndUpdate(
            { "_id": id },
            updatedMeet,
            {
                new: true,
                upsert: true
            }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateMeetResultsLink = async (id, link) => {
    try {
        const result = await Meet.update(
            { "_id": id },
            { "resultsDocumentUrl": link },
            {
                upsert: false
            }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const changeMeetStatus = async (id, status) => {

    try {
        const result = await Meet.findOneAndUpdate(
            { "_id": id },
            { "status": status },
            {
                new: true
            }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const changeRegistrationOpen = async (id, regOpen) => {

    try {
        const result = await Meet.findOneAndUpdate(
            { "_id": id },
            { "registrationClosed": !regOpen },
            {
                new: true
            }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

// Get all the registrations for a meet
const meetRegistrations = async (meet) => {

    try {
        const result = await Meet.
            findOne(meet).
            populate('registrations').
            exec();
        if (result.registrations.length > 0) {
            return result.registrations;
        }
        return [];
    } catch (err) {
        throw new Error(err.message);
    }
}

const meetResults = async (meet) => {

    try {
        const result = await Meet.
            findOne(meet).
            populate({
                path: 'results',
                populate: 
                    {path: 'lifts', populate: 
                        [
                            {path: 'attempt1'},
                            {path: 'attempt2'},
                            {path: 'attempt3'},
                            {path: 'singleLiftRecordId'}
                        ]
                    }
                    }).
            exec();
        if (result.results.length > 0) {
            return result.results;
        }
        return [];
    } catch (err) {
        throw new Error(err.message);
    }
}

const getRequestFromMeet = async (meet) => {
    try {
        const result = await Meet.find({
            _id: meet
        }).populate(
            'request'
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    allMeets,
    findMeet,
    createMeet,
    removeMeet,
    updateMeet,
    updateMeetResultsLink,
    changeMeetStatus,
    changeRegistrationOpen,
    meetRegistrations,
    meetResults,
    getRequestFromMeet
}