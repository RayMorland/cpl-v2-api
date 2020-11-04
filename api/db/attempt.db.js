var mongoose = require('mongoose');
var Attempt = mongoose.model('Attempt');

const createAttempt = async (newAttempt) => {
    let attempt = new Attempt(newAttempt);
    attempt._id = new mongoose.Types.ObjectId();

    try {
        const result = await attempt.save();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const createAttemptFromSpreadsheet = async (attempt) => {
    let newAttempt = new Attempt({
        weight: attempt,
        success: attempt >= 0
    });

    newAttempt._id = new mongoose.Types.ObjectId();

    try {
        const result = await newAttempt.save();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateAttempt = async (updatedAttempt) => {

    try {
        const result = await Attempt.findOneAndUpdate(
            { "_id": updatedAttempt._id },
            updatedAttempt,
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

module.exports = {
    createAttempt,
    updateAttempt,
    createAttemptFromSpreadsheet
}