const resultService = require('../services/results.service');
const recordService = require('../services/records.service');
const liftsService = require('../services/lift.service');
const registrationService = require('../services/registrations.service');

const errorHandler = (err, res) => {
  console.log(err.message);
  return res.status(500).send({ message: err.message });
};

const allResults = async (req, res) => {

  try {
    const results = await resultService.allResults();
    res.status(200).send(results);
  } catch (err) {
    errorHandler(err, res);
  }
};

const findResult = async (req, res) => {
  let searchQuery = req.query;

  try {
    const result = await resultService.findResult(searchQuery);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createResult = async (req, res) => {
  let newResult = req.body.newResult;

  try {
    //  Create Lifts
    let lifts = [];
    for (const lift of newResult.lifts) {
      let newLift = await liftsService.createLift(lift);
      // create attempt in liftService
      lifts.push(newLift._id);
    }

    newResult.lifts = lifts;

    const result = await resultService.createResult(newResult);

    console.log(result);

    for (const lift of result.lifts) {
      const findLift = await liftsService.findLift(lift);
      let updatedLift = await liftsService.updateLiftResultId(lift, result._id);
      if (findLift.singleLiftRecord && findLift.singleLiftRecordId) {
        let updatedRecord = await recordService.updateRecordResultId(findLift.singleLiftRecordId, result._id);
        updatedRecord = await recordService.updateRecordLiftId(findLift.singleLiftRecordId, updatedLift._id);
      }
    }

    const registration = await registrationService.findRegistration({ _id: result.registrationId });

    let reg = registration[0];

    reg.resultId = result._id;

    const updatedRegistration = await registrationService.updateRegistration(reg._id, reg);

    console.log(updatedRegistration);

    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateResult = async (req, res) =>{
  let updatedResult = req.body.updatedResult;
  try {
    let lifts = []
    for (const lift of updatedResult.lifts) {
      let updatedLift = await liftsService.updateLift(lift);
      lifts.push(updatedLift._id);
    }

    updatedResult.lifts = lifts;

    const result = await resultService.updateResult(updatedResult);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err,res);
  }
};

const removeResult = async (req, res) => {
  let removedResult = req.body.deletedResult;
  
  try {
    const result = await resultService.removeResult(removedResult);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err,res);
  }
};

module.exports = {
  allResults,
  createResult,
  findResult,
  updateResult,
  removeResult
}
