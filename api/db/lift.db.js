var mongoose = require('mongoose');
var Lift = mongoose.model('Lift');

const createLift = async (newLift, attempt1, attempt2, attempt3) => {
    let lift = new Lift({
        _id: new mongoose.Types.ObjectId(),
        status: newLift.status,
        memberId: newLift.memberId,
        meetId: newLift.meetId,
        gender: newLift.gender,
        testing: newLift.testing,
        category: newLift.category,
        events: newLift.events,
        divisions: newLift.divisions,
        weightClass: newLift.weightClass,
        attempt1: attempt1,
        attempt2: attempt2,
        attempt3: attempt3,
        liftType: newLift.liftType,
        rackPosition: newLift.rackPosition,
        rackHeight: newLift.rackHeight,
        startingWeight: newLift.startingWeight,
        highestWeight: newLift.highestWeight,
        isRecord: newLift.isRecord,
        records: newLift.records,
        resultId: null
    });

    try {
        const result = await lift.save();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};
const createLiftFromSpreadSheet = async (newLift, attempt1, attempt2, attempt3, liftType, meetId) => {
    let lift = new Lift({
        _id: new mongoose.Types.ObjectId(),
        status: 'active',
        memberId: null,
        meetId: meetId,
        gender: newLift.gender,
        testing: null,
        category: newLift.category,
        events: newLift.events,
        divisions: newLift.divisions,
        weightClass: newLift.weightClass,
        attempt1: attempt1,
        attempt2: attempt2,
        attempt3: attempt3,
        liftType: liftType,
        rackPosition: null,
        rackHeight: null,
        startingWeight: null,
        highestWeight: null,
        isRecord: false,
        records: null,
        resultId: null
    });

    try {
        const result = await lift.save();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
};

const updateLift = async (updatedLift) => {

    updatedLift.lastEditDate = new Date();

    console.log(updatedLift);

    try {
        const result = await Lift.findOneAndUpdate(
            { "_id": updatedLift._id },
            updatedLift,
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateLiftResultId = async (liftId, resultId) => {
    try {
        const result = await Lift.findByIdAndUpdate(
            liftId,
            {$set: {"resultId": resultId}},
            { new: true }
        ).
            exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const findLift = async (liftId) => {
    try {
        const result = await Lift.findOne(
            liftId
        ).
            exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    createLift,
    updateLift,
    updateLiftResultId,
    createLiftFromSpreadSheet,
    findLift
}