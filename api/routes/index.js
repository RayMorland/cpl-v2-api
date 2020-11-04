const express = require('express');
const jwt = require('express-jwt');
const app = express.Router();

const ctrlProfile = require('../controllers/profile');
const ctrlPayments = require('../controllers/payments');
const ctrlAuthentication = require('../controllers/authentication');
const ctrlNews = require('../controllers/news');
const ctrlMeets = require('../controllers/meets');
const ctrlRegistrations = require('../controllers/registrations');
const ctrlMedia = require('../controllers/media');
const ctrlLeagues = require('../controllers/leagues');
const ctrlMembership = require('../controllers/memberships');
const ctrlMembers = require('../controllers/members');
const ctrlCoordinators = require('../controllers/coordinators');
const ctrlResults = require('../controllers/results');
const ctrlNotifications = require('../controllers/notifications');
const ctrlUsers = require('../controllers/users');
const ctrlRecords = require('../controllers/records');
const ctrlStripe = require('../controllers/stripe');
const ctrlPlan = require('../controllers/plans');
const ctrlWebhooks = require('../controllers/stripe-webhooks');

const auth = require('../services/auth.service');

const Roles = {
    Public: 'public',
    Admin: 'admin',
    Member: 'member',
    Coordinator: 'coordinator'
};

// Auth
app.post('/login', ctrlAuthentication.login);
app.post('/register', ctrlAuthentication.register);
app.post('/authenticate', ctrlAuthentication.authenticate);

// Users 
app.get('/getusers',  auth.Validate(Roles.Admin), ctrlUsers.getUsers);
app.get('/finduser', auth.Validate(Roles.Admin), ctrlUsers.findUser);
app.get('/finduserbyemail', auth.Validate(Roles.Admin), ctrlUsers.findUserByEmail);
app.post('/createuser', ctrlUsers.createUser);
app.post('/updateuser', auth.Validate(Roles.Admin), ctrlUsers.updateUser);
app.post('/deleteuser', auth.Validate(Roles.Admin), ctrlUsers.deleteUser);

// Payments
app.post('/processregistrationpayment', auth.Validate(Roles.All), ctrlPayments.processPayment);

// Payment Endpoints for members
app.get('/listpaymentmethods', auth.Validate(Roles.All), ctrlPayments.listPaymentMethods);
app.get('/retrievepaymentmethod',  auth.Validate(Roles.All), ctrlPayments.retrievePaymentMethod);
app.get('/getmembersinvoices', auth.Validate(Roles.All), ctrlPayments.retrieveMemberInvoices);
app.post('/updatepaymentmethod', auth.Validate(Roles.All), ctrlPayments.updatePaymentMethod);
app.post('/createpaymentmethod',  auth.Validate(Roles.All), ctrlPayments.createPaymentMethod);

// Stripe webhooks
app.post('/webhook', ctrlWebhooks.webhook);

// News
app.get('/getnews', auth.Validate(Roles.All), ctrlNews.allNews);
app.get('/findnews', auth.Validate(Roles.All), ctrlNews.findNews);
app.post('/createnews',  auth.Validate(Roles.All), ctrlNews.createNews);
app.post('/updatenews',  auth.Validate(Roles.All), ctrlNews.updateNews);
app.post('/deletenews',  auth.Validate(Roles.All), ctrlNews.removeNews);

// Meets
app.get('/getmeets', auth.Validate(Roles.All), ctrlMeets.allMeets);
app.get('/findmeet', auth.Validate(Roles.All), ctrlMeets.findMeet);
app.get('/getmeetregistrations', auth.Validate(Roles.Admin), ctrlMeets.getRegistrations);
app.get('/getmeetresults',auth.Validate(Roles.All), ctrlMeets.getResults);
app.post('/createmeet', auth.Validate(Roles.Admin), ctrlMeets.createMeet);
// app.post('/submitmeet', ctrlMeets.submitMeet);
app.post('/updatemeet', auth.Validate(Roles.Admin), ctrlMeets.updateMeet);
app.post('/uploadmeetresults', auth.Validate(Roles.Admin), ctrlMeets.uploadMeetResults);
app.post('/createresultsfromspreadsheet', auth.Validate(Roles.Admin), ctrlMeets.createResultsFromMeetSpreadsheet);
app.post('/updatemeetresultslink', auth.Validate(Roles.Admin), ctrlMeets.updateMeetResultsLink);
app.post('/changemeetstatus', auth.Validate(Roles.Admin), ctrlMeets.changeMeetStatus);
app.post('/changeregistrationopen', auth.Validate(Roles.Admin), ctrlMeets.changeRegistrationOpen);
app.post('/deletemeet', auth.Validate(Roles.Admin), ctrlMeets.deleteMeet);
app.post('/paymeetfee', auth.Validate(Roles.Coordinator), ctrlPayments.payMeetFee);

// Meet Registrations
app.get('/getregistrations', auth.Validate(Roles.All), ctrlRegistrations.allRegistrations);
app.get('/findregistration', auth.Validate(Roles.All), ctrlRegistrations.findRegistration);
app.post('/admincreateregistration', auth.Validate(Roles.All), ctrlRegistrations.adminCreateRegistration);
app.post('/createregistration', auth.Validate(Roles.All), ctrlRegistrations.createRegistration);
app.post('/createregistrationsspreadsheet', auth.Validate(Roles.All), ctrlRegistrations.createRegistrationsSpreadsheet);
app.post('/completeregistration', auth.Validate(Roles.All), ctrlRegistrations.completeRegistration);
app.post('/updateregistration', auth.Validate(Roles.All), ctrlRegistrations.updateRegistration);
app.post('/deleteregistration', auth.Validate(Roles.All), ctrlRegistrations.removeRegistration);

// Results
app.get('/getresults', auth.Validate(Roles.All), ctrlResults.allResults);
app.get('/findresult', auth.Validate(Roles.All), ctrlResults.findResult);
app.post('/createresult', auth.Validate(Roles.All), ctrlResults.createResult);
app.post('/updateresult', auth.Validate(Roles.All), ctrlResults.updateResult);
app.post('/deleteresult', auth.Validate(Roles.All), ctrlResults.removeResult);

// Records
app.get('/getrecords', auth.Validate(Roles.All), ctrlRecords.allRecords);
app.get('/findrecord', auth.Validate(Roles.All), ctrlRecords.findRecord);
app.post('/createrecord', auth.Validate(Roles.All), ctrlRecords.createRecord);
app.post('/updaterecord', auth.Validate(Roles.All), ctrlRecords.updateRecord);
app.post('/deleterecord', auth.Validate(Roles.All), ctrlRecords.removeRecord);
app.post('/getresultfromrecord', auth.Validate(Roles.All), ctrlRecords.getResultFromRecord);

// Media
app.get('/getallmediaitems', auth.Validate(Roles.All), ctrlMedia.allMediaItems);
app.get('/findmediaitem', auth.Validate(Roles.All), ctrlMedia.findMediaItem);
app.post('/createmediaitem', auth.Validate(Roles.All), ctrlMedia.createMediaItem);
app.post('/deletemediaitem', auth.Validate(Roles.All), ctrlMedia.removeMediaItem);
app.post('/updatemediaitem', auth.Validate(Roles.All), ctrlMedia.updateMediaItem);
app.post('/uploadmediaitem', auth.Validate(Roles.All), ctrlMedia.uploadMediaItem);

// Site Info
app.get('/getallleagues', auth.Validate(Roles.All), ctrlLeagues.getLeagues);
app.get('/findLeague', auth.Validate(Roles.All), ctrlLeagues.findLeague);
app.post('/createleague', auth.Validate(Roles.All), ctrlLeagues.createLeague);
app.post('/updateleague', auth.Validate(Roles.All), ctrlLeagues.updateLeague);
app.post('/deleteleague', auth.Validate(Roles.All), ctrlLeagues.deleteLeague);

// Memberships
app.get('/getmemberships', auth.Validate(Roles.All), ctrlMembership.getMemberships);
app.get('/findmembership', auth.Validate(Roles.All), ctrlMembership.findMembership);
app.get('/getmemberswithmembership', auth.Validate(Roles.All), ctrlMembership.membersWithMembership);
app.get('/getmembershipplans', auth.Validate(Roles.All), ctrlMembership.membershipPlans);
app.post('/createmembership', auth.Validate(Roles.All), ctrlMembership.createMembership);
app.post('/updatemembership', auth.Validate(Roles.All), ctrlMembership.updateMembership);
app.post('/deletemembership', auth.Validate(Roles.All), ctrlMembership.deleteMembership);

// Plans 
app.get('/listallplans', auth.Validate(Roles.All), ctrlPlan.listAllPlans);
app.get('/retrieveplans', auth.Validate(Roles.All), ctrlPlan.retrievePlan);
app.post('/createplan',  auth.Validate(Roles.All),ctrlPlan.createPlan);
app.post('/updateplan',  auth.Validate(Roles.All),ctrlPlan.updatePlan);
app.post('/deleteplan',  auth.Validate(Roles.All),ctrlPlan.deletePlan);

// Members
app.get('/getmembers', auth.Validate(Roles.All), ctrlMembers.getMembers);
app.get('/findmember', auth.Validate(Roles.All),ctrlMembers.findMember);
app.get('/getmembersregistrations', auth.Validate(Roles.All), ctrlMembers.membersRegistrations);
app.get('/getmembersresults', auth.Validate(Roles.All), ctrlMembers.membersResults);
app.get('/getmembersrecords', auth.Validate(Roles.All), ctrlMembers.membersRecords);
app.get('/getmembersmembership', auth.Validate(Roles.All), ctrlMembers.membersMembership);
app.post('/createmember', auth.Validate(Roles.All), ctrlMembers.createMember);
app.post('/createmembersubscription', auth.Validate(Roles.All), ctrlPayments.createMemberSubscription);
app.post('/updatemember', auth.Validate(Roles.All), ctrlMembers.updateMember);
app.post('/deletemember', auth.Validate(Roles.All), ctrlMembers.deleteMember);
app.post('/addmembershiptomember', auth.Validate(Roles.All), ctrlMembers.addMembership);
// app.post('/uploadprofilepicture', ctrlMembers.uploadProfilePicture);

// Coordinators
app.get('/getcoordinators', auth.Validate(Roles.All), ctrlCoordinators.getCoordinators);
app.get('/findcoordinator', auth.Validate(Roles.All), ctrlCoordinators.findCoordinator);
app.get('/coordinatorsmeets', auth.Validate(Roles.All), ctrlCoordinators.getCoordinatorsMeets);
app.post('/createcoordinator', auth.Validate(Roles.All), ctrlCoordinators.createCoordinator);
app.post('/admincreatecoordinator', auth.Validate(Roles.All), ctrlCoordinators.createCoordinator);
app.post('/updatecoordinator', auth.Validate(Roles.All), ctrlCoordinators.updateCoordinator);
app.post('/deletecoordinator', auth.Validate(Roles.All), ctrlCoordinators.deleteCoordinator);
app.post('/uploadcoordinatorlogo', auth.Validate(Roles.All), ctrlCoordinators.uploadLogo);

// Coordinator's Stripe Api
app.post('/addexternalaccount', auth.Validate(Roles.All), ctrlPayments.createBankForCoordinator);
app.post('/createbank', auth.Validate(Roles.All), ctrlPayments.createBankForCoordinator);
app.get('/listpayoutstocoordinator',  auth.Validate(Roles.All),ctrlPayments.listPayoutsToCoordinator);
app.get('/listchargesforcoordinator', auth.Validate(Roles.All), ctrlPayments.listChargesForCoordinator);
app.get('/getcoordinatorbalancetransactions', auth.Validate(Roles.All), ctrlPayments.getConnectedBalanceTransactions);

// app.get('/notify', ctrlNotifications.notify);
app.get('/listallnotifications', auth.Validate(Roles.All), ctrlNotifications.listAllNotifications);
app.get('/retrievenotifications',  auth.Validate(Roles.All), ctrlNotifications.retrieveNotifications);
app.post('/createnotification', auth.Validate(Roles.All), ctrlNotifications.createNotification);
app.post('/updatenotification', auth.Validate(Roles.All), ctrlNotifications.updateNotification);
app.post('/deletenotification',  auth.Validate(Roles.All),ctrlNotifications.deleteNotification);

app.get('/getusernotifications',  auth.Validate(Roles.All), ctrlNotifications.getUserNotifications);
app.get('/getadminnotifications',  auth.Validate(Roles.All), ctrlNotifications.getAdminNotifications);

// Admin specific endpoints
app.post('/admincreatemember', auth.Validate(Roles.All), ctrlMembers.adminCreateMember);

module.exports = app;
