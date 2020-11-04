var coordinatorApplicationService = require("../services/coordinator-applications.service");

const errorHandler = function(err, res) {
  return res.status(500).send({ message: err.message });
};

// Get All CoordinatorApplications
const getAllApplications = async (req, res) => {
  try {
    const coordinatorApplications = await coordinatorApplicationService.getAllApplications();
    res.status(200).send(coordinatorApplications);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Find a CoordinatorApplication given a particular set of params
const findApplication = async (req, res) => {
  const searchQuery = req.query;

  try {
    const coordinatorApplication = await coordinatorApplicationService.findApplication(
      searchQuery
    );
    res.status(200).send(coordinatorApplication);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Create a new CoordinatorApplication
const createApplication = async (req, res, next) => {
  let newCoordinatorApplication = req.body.newCoordinatorApplication;
  let id = req.body.coordinatorId;

  try {
    const coordinatorApplication = await coordinatorApplicationService.createApplication(
      id,
      newCoordinatorApplication
    );
    res.status(200).send(coordinatorApplication);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Update CoordinatorApplication
const updateApplication = async (req, res) => {
  let updatedCoordinatorApplication = req.body.updatedApplication;
  let id = req.body._id;

  try {
    const coordinatorApplication = await coordinatorApplicationService.updateApplication(
      id,
      updatedCoordinatorApplication
    );
    res.status(200).send(coordinatorApplication);
  } catch (err) {
    errorHandler(err, res);
  }
};

// Permanently Delete CoordinatorApplication
const deleteApplication = async (req, res) => {
  let deletedCoordinatorApplication = req.body.deletedApplication;

  console.log(deletedCoordinatorApplication);

  try {
    const coordinatorApplication = await coordinatorApplicationService.removeApplication(
      deletedCoordinatorApplication
    );
    res.status(200).send(coordinatorApplication);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  getAllApplications,
  findApplication,
  createApplication,
  updateApplication,
  deleteApplication
};
