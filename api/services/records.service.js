const recordsDb = require("../db/records.db");

const getAllRecords = async () => {
  try {
    const result = await recordsDb.getAllRecords();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findRecord = async (searchQuery) => {
  try {
    const result = await recordsDb.findRecord(searchQuery);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createRecord = async (newRecordInfo) => {
  try {
    // const result = await recordsDb.findRecord(newRecordInfo);
    // if (result.length > 0) {
    //     return true;
    // } else {
    const newRecord = await recordsDb.createRecord(newRecordInfo);
    return newRecord;
    // }
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateRecord = async (updatedRecord) => {
  try {
    const result = await recordsDb.updaterecord(updatedRecord);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateRecordResultId = async (id, resultId) => {
  try {
    const result = await recordsDb.updateRecordResultId(id, resultId);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateRecordLiftId = async (id, liftId) => {
  try {
    const result = await recordsDb.updateRecordLiftId(id, liftId);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeRecord = async (deletedRecord) => {
  try {
    const result = await recordsDb.removeRecord(deletedRecord);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getResultFromRecord = async (record) => {
  try {
    const result = await recordsDb.getResultFromRecord(record);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const checkAndCreateRecord = async (lift) => {
  let records = [];

  try {
    // check if record exists for result type
    for (const event of lift.events) {
      for (const division of lift.divisions) {
        let record = await recordsDb.findRecord({
          currentRecord: true,
          division: division,
          category: lift.category,
          tested: lift.testing,
          gender: lift.gender,
          weightClass: lift.weightClass,
          ageClass: lift.ageClass,
          lift: lift.liftType,
          event: event,
        });

        if (record.length === 0) {
          let newRecord = await recordsDb.createCurrentRecord(
            lift,
            division,
            event
          );
          records.push(newRecord);
        }
      }
    }
    return records;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllRecords,
  createRecord,
  findRecord,
  updateRecord,
  updateRecordResultId,
  updateRecordLiftId,
  removeRecord,
  getResultFromRecord,
  checkAndCreateRecord,
};
