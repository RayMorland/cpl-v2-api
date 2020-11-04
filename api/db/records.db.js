var mongoose = require('mongoose');
var Record = mongoose.model('Record');

const getAllRecords = async () => {
    try {
        const result = Record.find().populate('memberId').exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const findRecord = async (searchQuery) => {

    try {
        const result = await Record.find({
            "event": searchQuery.event,
            "division.name": searchQuery.division.name,
            "division.ageClass.min": searchQuery.division.ageClass.min,
            "division.ageClass.max": searchQuery.division.ageClass.max,
            "category": searchQuery.category,
            "testing": searchQuery.testing,
            "gender": searchQuery.gender,
            "weightClass": searchQuery.weightClass,
            "liftType": searchQuery.liftType,
            "currentRecord": searchQuery.currentRecord
        }).
            exec();

        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createRecord = async (recordData) => {
    console.log(recordData);
    let record = new Record(recordData);
    record._id = new mongoose.Types.ObjectId();
    record.creationDate = new Date();
    record.lastEditDate = new Date();

    try {
        const newRecord = await record.save();
        return newRecord;
    } catch (err) {
        throw new Error(err.message);
    }
}

const createCurrentRecord = async (newRecord, div, event) => {
    let record = new Record({
        _id: new mongoose.Types.ObjectId(),
        creationDate: new Date(),
        lastEditDate: new Date(),
        recordDate: new Date(),
        overthrownDate: null,
        currentRecord: true,
        memberId: newRecord.memberId,
        meetId: newRecord.meetId,
        resultId: null,
        liftId: null,
        division:  div,
        category: newRecord.category,
        testing: newRecord.testing,
        gender: newRecord.gender,
        weightClass: newRecord.weightClass,
        event: event,
        liftType: newRecord.liftType,
        weight: newRecord.highestWeight
    });

    try {
        const newRecord = await record.save();
        return newRecord;
    } catch (err) {
        throw new Error(err.message);
    }
}

const removeRecord = async (records) => {
    try {
        const result = await Record.findByIdAndRemove(
            { "_id": record._id }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateRecord = async (updatedRecord) => {

    updatedRecord.lastEditDate = new Date();

    try {
        const result = await Record.findByIdAndUpdate(
            { "_id": updatedRecord._id },
            updatedRecord,
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateRecordLiftId = async (recordId, liftId) => {

    // updatedRecord.lastEditDate = new Date();

    try {
        const result = await Record.findByIdAndUpdate(
            { "_id": recordId },
            { $set: { "liftId": liftId }},
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const updateRecordResultId = async (recordId, resultId) => {

    // updatedRecord.lastEditDate = new Date();

    try {
        const result = await Record.findByIdAndUpdate(
            { "_id": recordId },
            {$set: { "resultId": resultId }},
            { new: true }
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

const getResultFromRecord = async (record) => {
    try {
        const result = await Record.find(
            record
        ).populate(
            'result'
        ).exec();
        return result;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    getAllRecords,
    findRecord,
    createRecord,
    createCurrentRecord,
    removeRecord,
    updateRecord,
    updateRecordResultId,
    updateRecordLiftId,
    getResultFromRecord
}