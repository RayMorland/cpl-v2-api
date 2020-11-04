const mongoose = require('mongoose');
const Meet = mongoose.model('Meet');
const meetService = require('../services/meets.service');
const coordinatorService = require('../services/coordinators.service');
const notificationService = require('../services/notification.service');

var errorHandler = (err, res) => {
  return res.status(500).send({ message: err.message });
};

// Get All Meets
const allMeets = async (req, res) => {
  try {
    const meets = await meetService.getAllMeets();
    res.status(200).send(meets);
  } catch (err) {
    errorHandler(err,res);
  }
};

// Find a meet given a particular set of params
const findMeet = async (req, res) => {

  const searchQuery = req.query

  try {
    const meet = await meetService.findMeet(searchQuery);
    res.status(200).send(meet)
  } catch (err) {
    errorHandler(err, res);
  }
};

// Create a new Meet
const createMeet = async (req, res, next) => {
  let newMeet = req.body.newMeet;

  try {
    const meet = await meetService.createMeet(newMeet);
    // notificationService.createAdminNotification('meetCreated', meet);
    // notificationService.addUserNotification('meetCreated', meet.coordinator._id , meet);
    res.status(200).send(meet);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Update meet
const updateMeet = async (req, res) => {
  let updatedMeet = req.body.updatedMeet;
  let _id = req.body.id;

  try { 
    const meet = await meetService.updateMeet(_id, updatedMeet);
    res.status(200).send(meet);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateMeetResultsLink = async (req, res) => {
  let link = req.body.link;
  let _id = req.body.id;

  try { 
    const meet = await meetService.updateMeetResultsLink(_id, link);
    res.status(200).send(meet);
  } catch (err) {
    errorHandler(err, res);
  }
};

const uploadMeetResults = async (req, res) => {
  try {
    var meetResults = await meetService.uploadMeetResults(req, res);
    return res.status(200).send(meetResults);
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message, results: {} });
  }
}

const createResultsFromMeetSpreadsheet = async (req, res) => {

  let file = req.body.file;
  let id = req.body.meetId;

  try {
    var result = await meetService.createResultsFromMeetSpreadsheet(id, file);
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message, results: {} });
  }
}

const changeMeetStatus = async (req, res) => {
  let status = req.body.status;
  let _id = req.body.id;

  try { 
    const meet = await meetService.changeMeetStatus(_id, status);
    res.status(200).send(meet);
  } catch (err) {
    errorHandler(err, res);
  }
};

const changeRegistrationOpen = async (req, res) => {
  let _id = req.body.id;
  let regOpen = req.body.open;

  try { 
    const meet = await meetService.changeRegistrationOpen(_id, regOpen);
    res.status(200).send(meet);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Permanently Delete Meet
const deleteMeet = async (req, res) => {
  let deletedMeet = req.body.deletedMeet;

  try {
    const meet = await meetService.deleteMeet(deletedMeet);
    res.status(200).send(meet);
  } catch (err) {
    errorHandler(err,res);
  }
};

// Add meet to Stripe as a product
const createStripeIdForMeet = async (req, res) => {
  function callback(customer) {
    Meet.
      findById({ _id: req.body._id }).
      exec((err, Meet) => {
        if (err) {
          errorHandler(err);
        }
        Meet.paymentInfo.stripeId = customer.id;
        Meet.save((err, Meet) => {
          if (err) {
            errorHandler(err);
          }
          res.status(200).json(customer);
        });
      })
  }

  stripe.customers.create({
    email: req.body.email,
    description: 'Customer for ' + req.body.email,
    source: "tok_mastercard",
  }, function (err, customer) {
    if (err) {
      errorHandler(err);
    }
    callback(customer);
  });
};

// Function to be run after the meet is complete. Takes meet spreadsheet and updates meet, results, and records

const completeMeet = async (req, res) => {

};

// Get Registrations for a meet

const getRegistrations = async (req, res) => {
  let meet = req.query;

  try {
    const registrations = await meetService.getMeetRegistrations(meet);
    res.status(200).send(registrations);
  } catch (err) {
    errorHandler(err,res);
  }
};

// Get results for a meet

const getResults = async (req, res) => {
  let meet = req.query;

  try {
    const result = await meetService.getMeetResults(meet);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err,res);
  }
};

module.exports = {
  allMeets,
  findMeet,
  createMeet,
  updateMeet,
  updateMeetResultsLink,
  uploadMeetResults,
  createResultsFromMeetSpreadsheet,
  changeMeetStatus,
  changeRegistrationOpen,
  deleteMeet,
  createStripeIdForMeet,
  completeMeet,
  getRegistrations,
  getResults
};