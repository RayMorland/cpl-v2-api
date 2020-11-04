const registrationService = require('../services/registrations.service');
const paymentService = require('../services/stripe.service');
const coordinatorService = require('../services/coordinators.service');
const membersService = require('../services/members.service');
const meetsService = require('../services/meets.service');
const notificationService = require('../services/notification.service');
const stripeApi = require('../utils/stripe.util');
const registrationUtil = require('../utils/registration.util');

const errorHandler = (err, res) => {
  console.log(err.message);
  return res.status(500).send({ message: err.message });
};

const allRegistrations = async (req, res) => {

  try {
    const registrations = await registrationService.allRegistrations();
    res.status(200).send(registrations);
  } catch (err) {
    errorHandler(err, res);
  }
};

const findRegistration = async (req, res) => {
  let searchQuery = req.query;

  try {
    const registration = await registrationService.findRegistration(searchQuery);
    res.status(200).send(registration);
  } catch (err) {
    errorHandler(err, res);
  }
};

const adminCreateRegistration = async (req, res) => {
  let newRegistration = req.body.newRegistration;

  try {
    const registration = await registrationService.createRegistration(newRegistration);
    res.status(200).send(registration);
  } catch (err) {
    errorHandler(err, res);
  } finally {
    
  }
};

const createRegistration = async (req, res) => {
  let newRegistration = req.body.newRegistration;

  try {
    const registration = await registrationService.createRegistration(newRegistration);
    const meet = await meetsService.findMeet({ _id: registration.meetId });
    const coordinator = await coordinatorService.findCoordinator({ _id: meet[0].coordinator._id });
    const member = await membersService.findMember({ _id: registration.memberId });
    // await notificationService.createAdminNotification('memberRegisteredForMeet', registration);
    // await notificationService.addUserNotification('memberRegisteredForMeet', member.userId, registration);
    // await notificationService.addUserNotification('memberRegisteredForMeet', coordinator.userId, registration);
    const paymentIntent = await stripeApi.createPaymentIntentForRegistration(registration, member.stripeId, coordinator.stripeId, meet[0]._id);
    // code to email registrant
    res.status(200).send({ registration: registration, clientSecret: paymentIntent });
  } catch (err) {
    errorHandler(err, res);
  } finally {
    
  }
};

const createRegistrationsSpreadsheet = async (req, res) => {

  let meetId = req.body.meetId;

  try {
    const result = await registrationService.createRegistrationsSpreadsheet(meetId);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
}

const completeRegistration = async (req, res) => {
  try {
    const registration = await registrationService.findRegistration({"_id": req.body._id});
    const meet = await meetsService.findMeet({'_id': registration.meetId});
    const regPdf = await registrationUtil.generateMemberRegistrationPdf(registration, meet);
    res.status(200).send(registration);
  } catch (err) {
    errorHandler(err, res);
  }
}

const updateRegistration = async (req, res) =>{
  let updatedRegistration = req.body.updatedRegistration;
  let id = req.body._id;

  try {
    const registration = await registrationService.updateRegistration(id, updatedRegistration);
    res.status(200).send(registration);
  } catch (err) {
    errorHandler(err,res);
  }
};

const removeRegistration = async (req, res) => {
  let removedRegistration = req.body.deletedRegistration;
  
  try {
    const registration = await registrationService.removeRegistration(removedRegistration);
    res.status(200).send(registration);
  } catch (err) {
    errorHandler(err,res);
  }
};

module.exports = {
  allRegistrations,
  adminCreateRegistration,
  createRegistration,
  createRegistrationsSpreadsheet,
  completeRegistration,
  findRegistration,
  updateRegistration,
  removeRegistration
}