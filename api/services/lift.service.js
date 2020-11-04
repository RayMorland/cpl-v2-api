const liftDb = require('../db/lift.db');
const attemptDb = require('../db/attempt.db');
const recordDb = require('../db/records.db');
const recordsDb = require('../db/records.db');

const createLift = async (newLift) => {

    try {
        let attempt1 = await attemptDb.createAttempt(newLift.attempt1);
        let attempt2 = await attemptDb.createAttempt(newLift.attempt2);
        let attempt3 = await attemptDb.createAttempt(newLift.attempt3);

        // Check if total record for each division and event lifter is entered in

        for (const event of newLift.events) {
            for (const div of newLift.divisions) {
                
                let record = await recordsDb.findRecord({
                    event: event,
                    division: div,
                    category: newLift.category,
                    testing: newLift.testing,
                    gender: newLift.gender,
                    weightClass: newLift.weightClass,
                    liftType: newLift.liftType,
                    currentRecord: true
                });

                
                if (record[0] && record.length > 0) {
                    if (newLift.highestWeight > record[0].weight) {
                        record[0].currentRecord = false;
                        record[0].overthrownDate = new Date();
                        let oldRecord = await recordDb.updateRecord(record[0]);
                        let newRecord = await recordDb.createCurrentRecord(newLift, div, event);
                        newLift.singleLiftRecord = true;
                        newLift.singleLiftRecordId = newRecord._id;
                    }
                } else {
                    let newRecord = await recordDb.createCurrentRecord(newLift, div, event);
                    newLift.singleLiftRecord = true;
                    newLift.singleLiftRecordId = newRecord._id;
                }
            }
        }

        const lift = await liftDb.createLift(newLift, attempt1, attempt2, attempt3);
        return lift;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createLiftFromResultsSpreadsheet = async (newLift, attempt1, attempt2, attempt3, liftType, meetId) => {

    try {
        let att1 = await attemptDb.createAttemptFromSpreadsheet(attempt1);
        let att2 = await attemptDb.createAttemptFromSpreadsheet(attempt2);
        let att3 = await attemptDb.createAttemptFromSpreadsheet(attempt3);

        const lift = await liftDb.createLiftFromSpreadSheet(newLift, att1, att2, att3, liftType, meetId);
        return lift;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateLift = async (updatedLift) => {
    try {
        let attempt1 = await attemptDb.updateAttempt(updatedLift.attempt1);
        let attempt2 = await attemptDb.updateAttempt(updatedLift.attempt2);
        let attempt3 = await attemptDb.updateAttempt(updatedLift.attempt3);

        for (const event of updatedLift.events) {
            for (const div of updatedLift.divisions) {
                
                let record = await recordsDb.findRecord({
                    event: event,
                    division: div,
                    category: updatedLift.category,
                    testing: updatedLift.testing,
                    gender: updatedLift.gender,
                    weightClass: updatedLift.weightClass,
                    liftType: updatedLift.liftType,
                    currentRecord: true
                });

                
                if (record[0] && record.length > 0) {
                    if (updatedLift.highestWeight > record[0].weight) {
                        record[0].currentRecord = false;
                        record[0].overthrownDate = new Date();
                        let oldRecord = await recordDb.updateRecord(record[0]);
                        let newRecord = await recordDb.createCurrentRecord(updatedLift, div, event);
                        updatedLift.singleLiftRecord = true;
                        updatedLift.singleLiftRecordId = newRecord._id;
                    }
                } else {
                    let newRecord = await recordDb.createCurrentRecord(updatedLift, div, event);
                    updatedLift.singleLiftRecord = true;
                    updatedLift.singleLiftRecordId = newRecord._id;
                }
            }
        }

        const lift = await liftDb.updateLift(updatedLift, attempt1, attempt2, attempt3);
        return lift;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateLiftFromSpreadsheet = async (updateLift) => {
    try {
        const result = await liftDb.updateLift(updateLift);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}

const updateLiftResultId = async (liftId, resultId) => {
    try {
        const updatedLiftResult = await liftDb.updateLiftResultId(liftId, resultId);
        return updatedLiftResult;
    } catch (err) {
        throw new Error(err);
    }
}

const findLift = async (liftId) => {
    try {
        const result = await liftDb.findLift(liftId);
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    createLift,
    updateLift,
    updateLiftFromSpreadsheet,
    updateLiftResultId,
    createLiftFromResultsSpreadsheet,
    findLift
}