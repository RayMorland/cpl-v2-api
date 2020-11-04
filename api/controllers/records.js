const recordService = require('../services/records.service');

const errorHandler = (err, res) => {
  console.log(err.message);
  return res.status(500).send({ message: err.message });
};

const allRecords = async (req, res) => {

  try {
    const records = await recordService.getAllRecords();
    res.status(200).send(records);
  } catch (err) {
    errorHandler(err, res);
  }
};

const findRecord = async (req, res) => {
  let searchQuery = req.query;

  try {
    const record = await recordService.findRecord(searchQuery);
    res.status(200).send(record);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createRecord = async (req, res) => {
  let newRecord = req.body.newRecord;
  
  try {
    const record = await recordService.createRecord(newRecord);
    // code to email registrant
    res.status(200).send(record);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateRecord = async (req, res) => {
  let updatedRecord = req.body.updatedRecord;

  try {
    const record = await recordService.updateRecord(updatedRecord);
    res.status(200).send(record);
  } catch (err) {
    errorHandler(err, res);
  }
};

const removeRecord = async (req, res) => {
  let removedRecord = req.body.removedRecord;

  try {
    const record = await recordService.removeRecord(removedRecord);
    res.status(200).send(record);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getResultFromRecord = async (record) => {
  try {
    const result = recordsService.getResultFromRecord(record);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}



module.exports = {
  allRecords,
  createRecord,
  findRecord,
  updateRecord,
  removeRecord,
  getResultFromRecord
}