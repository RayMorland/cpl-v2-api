var meetRequestService = require('../services/meet-requests.service');

var errorHandler = function (err, res) {
  return res.status(500).send({ message: err.message });
};

// Get All MeetRequests
const allMeetRequests = async (req, res) => {
  try {
    const meetRequests = await meetRequestService.getAllMeetRequests();
    res.status(200).send(meetRequests);
  } catch (err) {
    errorHandler(err,res);
  }
}

// Find a MeetRequest given a particular set of params
const findMeetRequest = async (req, res) => {

  const searchQuery = req.query

  try {
    const meetRequest = await meetRequestService.findMeetRequest(searchQuery);
    res.status(200).send(meetRequest)
  } catch (err) {
    errorHandler(err,res);
  }
}

// Create a new MeetRequest
const createMeetRequest = async (req, res, next) => {

  let newMeetRequest = req.body.newMeetRequest;

  try {
    const meetRequest = await meetRequestService.createMeetRequest(newMeetRequest);
    res.status(200).send(meetRequest);
  } catch (err) {
    errorHandler(err,res);
  }
}

// Update MeetRequest
const updateMeetRequest = async (req, res) => {
  let updatedMeetRequest = req.body.updatedMeetRequest;

  try { 
    const meetRequest = await meetRequestService.updateMeetRequest(updatedMeetRequest);
    res.status(200).send(meetRequest);
  } catch (err) {
    errorHandler(err,res);
  }
}

// Permanently Delete MeetRequest
const deleteMeetRequest = async (req, res) => {
  let deletedMeetRequest = req.body.deletedMeetRequest;

  try {
    const meetRequest = await meetRequestService.deleteMeetRequest(deletedMeetRequest);
    res.status(200).send(meetRequest);
  } catch (err) {
    errorHandler(err,res);
  }
}

const getMeetFromRequest = async (req, res) => {
    const request = req.query.request;

    try {
        const result = await meetRequestService.getMeetFromRequest(request);
        res.status(200).send(result);
    } catch (err) {
        errorHandler(err.message);
    }
}

module.exports = {
  allMeetRequests,
  findMeetRequest,
  createMeetRequest,
  updateMeetRequest,
  deleteMeetRequest,
  getMeetFromRequest
};