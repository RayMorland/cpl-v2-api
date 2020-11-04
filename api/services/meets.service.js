const meetsDb = require("../db/meets.db");
const requestsDb = require("../db/meet-requests.db");
const coordinatorDb = require("../db/coordinators.db");
const stripeApi = require("../utils/stripe.util");
const fileUploadUtil = require("../utils/file-upload.util");
const recordsUtil = require("../utils/records.util");
const liftsDb = require("../db/lift.db");
const liftService = require("./lift.service");
const resultService = require("./results.service");
const { checkIfResultIsRecord } = require("../utils/records.util");
const recordsService = require("./records.service");
const attemptDb = require("../db/attempt.db");

const getAllMeets = async () => {
  try {
    const result = meetsDb.allMeets();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findMeet = async (searchQuery) => {
  try {
    const result = meetsDb.findMeet(searchQuery);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMeet = async (meet) => {
  try {
    const result = await meetsDb.findMeet(meet);
    if (result != null) {
      if (result.length > 0) {
        throw new Error("Meet already exists");
      } else {
        newMeet = await meetsDb.createMeet(meet);
        return newMeet;
      }
    }
    throw new Error("Null Result");
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMeet = async (id, updatedMeet) => {
  try {
    const result = await meetsDb.updateMeet(id, updatedMeet);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMeetResultsLink = async (id, link) => {
  try {
    const meet = await meetsDb.updateMeetResultsLink(id, link);
    return meet;
  } catch (err) {
    throw new Error(err.message);
  }
};

const uploadMeetResults = async (req, res) => {
  try {
    var results = await fileUploadUtil.uploadFile(req, res);

    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createResultsFromMeetSpreadsheet = async (id, file) => {
  try {
    var groups = await recordsUtil.parseExcel(file);
    var results = [];

    for (const group of groups) {
      let lifts = [];

      // Create attempts and lifts for result
      if (
        group.results.squat1 !== undefined &&
        group.results.squat2 !== undefined &&
        group.results.squat3 != undefined
      ) {
        let squatLift = await liftService.createLiftFromResultsSpreadsheet(
          group,
          group.results.squat1,
          group.results.squat2,
          group.results.squat3,
          "squat",
          id
        );
        lifts.push(squatLift);
      }
      if (
        group.results.bench1 !== undefined &&
        group.results.bench2 !== undefined &&
        group.results.bench3 != undefined
      ) {
        let benchLift = await liftService.createLiftFromResultsSpreadsheet(
          group,
          group.results.bench1,
          group.results.bench2,
          group.results.bench3,
          "bench",
          id
        );
        lifts.push(benchLift);
      }
      if (
        group.results.deadlift1 !== undefined &&
        group.results.deadlift2 !== undefined &&
        group.results.deadlift3 != undefined
      ) {
        let deadliftLift = await liftService.createLiftFromResultsSpreadsheet(
          group,
          group.results.deadlift1,
          group.results.deadlift2,
          group.results.deadlift3,
          "deadlift",
          id
        );
        lifts.push(deadliftLift);
      }
      // Create result and add lifts

      const newResult = await resultService.createResultFromSpreadsheet(
        group,
        lifts,
        id
      );
      results.push(newResult);
    }

    for (const result of results) {
      for (const lift of result.lifts) {
        // Update Attempts with result Id
        lift.attempt1.liftId = lift._id;
        lift.attempt1.resultId = result._id;
        await attemptDb.updateAttempt(lift.attempt1);
        lift.attempt2.liftId = lift._id;
        lift.attempt2.resultId = result._id;
        await attemptDb.updateAttempt(lift.attempt2);
        lift.attempt3.liftId = lift._id;
        lift.attempt3.resultId = result._id;
        await attemptDb.updateAttempt(lift.attempt3);

        // Update Lifts with result Id
        lift.resultId = result._id;
        const updatedLift = await liftService.updateLiftFromSpreadsheet(lift);
        console.log(updatedLift);

        // Check if lifts are records
        const records = await recordsService.checkAndCreateRecord(lift);
        if (records.length > 0) {
          updatedLift.isRecord = true;
          updatedLift.records = records.map((record) => record._id);
          await liftService.updateLiftFromSpreadsheet(updatedLift);
        }
      }
    }

    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

const changeMeetStatus = async (id, status) => {
  try {
    const result = await meetsDb.changeMeetStatus(id, status);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const changeRegistrationOpen = async (id, regOpen) => {
  try {
    const result = await meetsDb.changeRegistrationOpen(id, regOpen);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteMeet = async (meet) => {
  try {
    const result = await meetsDb.removeMeet(updatedMeet);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMeetRegistrations = async (meet) => {
  try {
    const result = await meetsDb.meetRegistrations(meet);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMeetResults = async (meet) => {
  try {
    const result = await meetsDb.meetResults(meet);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getRequestFromMeet = async (meet) => {
  try {
    const result = await meetsDb.getRequestFromMeet(meet);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createMeet,
  findMeet,
  getAllMeets,
  updateMeet,
  updateMeetResultsLink,
  uploadMeetResults,
  createResultsFromMeetSpreadsheet,
  changeMeetStatus,
  changeRegistrationOpen,
  deleteMeet,
  getMeetRegistrations,
  getMeetResults,
  getRequestFromMeet,
};
