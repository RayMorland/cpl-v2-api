const stripeService = require("../services/stripe.service");
const meetService = require("../services/meets.service");
const stripeUtil = require("../utils/stripe.util");
const membersService = require("../services/members.service");
const membershipService = require("../services/memberships.service");
const usersService = require("../services/users.service");

var errorHandler = function (err, res) {
  return res.status(500).send({ message: err.message });
};

const processPayment = async (req, res) => {
  try {
    const result = await stripeService.createCharge(req.body.registration);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createMemberSubscription = async (req, res) => {
  const registrationInfo = req.body.registration;

  console.log(registrationInfo);

  try {
    // Update Customer with payment method
    const updatedCustomer = await stripeService.createCard(registrationInfo);
    // Subscribe member to plan
    const subscription = await stripeService.createSubscription(
      registrationInfo
    );
    // Update members status if subscription is success
      const member = await membersService.findMember({ _id: registrationInfo.member._id });

      member.membership.stripeSubscription = subscription.id;
      member.membership.feePaid = true;

    const updatedMember = await membersService.updateMember(
      member._id,
      member
    );

    const user = await usersService.findUser({ _id: updatedMember.userId });

    user.status = "active";

    const updatedUser = await usersService.updateUser(user);

    console.log(updatedUser);

    res.status(200).send(updatedMember);
  } catch (err) {
    errorHandler(err, res);
  }
};

const subscribeMemberToPlan = async (req, res) => {
  const subscriptionInfo = req.body;

  try {
    const subscription = stripeService.createSubscription(subscriptionInfo);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateMembersSubscription = async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
};

const cancelMembersSubscription = async (req, res) => {
  try {
  } catch (err) {
    errorHandler(err, res);
  }
};

const listPaymentMethods = async (req, res) => {
  const search = req.query;

  try {
    const result = await stripeService.listPaymentMethods(search);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createPaymentMethod = async (req, res) => {
  const newPaymentMethod = req.body.newPaymentMethod;

  try {
    const result = await stripeService.createPaymentMethod(newPaymentMethod);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updatePaymentMethod = async (req, res) => {
  const updatedPaymentMethod = req.body.updatedPaymentMethod;

  try {
    const result = await stripeService.updatePaymentMethod(
      updatedPaymentMethod
    );
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const retrievePaymentMethod = async (req, res) => {
  const paymentMethod = req.query;

  try {
    const result = await stripeService.retrievePaymentMethod(paymentMethod);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createBankForCoordinator = async (req, res) => {
  const bankToken = req.body.token.token.id;
  const coordinatorStripeId = req.body.id;

  try {
    // const bankToken = await stripeUtil.createBankToken(bankInfo);
    const account = await stripeService.createExternalAccount(
      coordinatorStripeId,
      bankToken
    );
    return account;
  } catch (err) {
    throw new Error(err);
  }
};

const payMeetFee = async (req, res) => {
  const token = req.body.token;
  const meet = req.body.meetId;

  try {
    const payment = await stripeService.createChargeForMeetFee(token);
    const updatedMeet = await meetService.updateMeet(meet, {
      status: "active",
    });
    res.status(200).send(updatedMeet);
  } catch (err) {
    errorHandler(err, res);
  }
};

const listPayoutsToCoordinator = async (req, res) => {
  const stripeId = req.query.stripeId;

  try {
    const payouts = await stripeService.listPayoutsToCoordinator(stripeId);
    res.status(200).send(payouts);
  } catch (err) {
    errorHandler(err, res);
  }
};

const listChargesForCoordinator = async (req, res) => {
  const stripeId = req.query.stripeId;

  try {
    const charges = await stripeService.listChargesForCoordinator({
      id: stripeId,
    });
    res.status(200).send(charges);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getConnectedBalanceTransactions = async (req, res) => {
  const stripeId = req.query.stripeId;

  try {
    const transactions = await stripeService.getConnectedBalanceTransactions(
      stripeId
    );
    res.status(200).send(transactions);
  } catch (err) {
    errorHandler(err);
  }
};

const completeRegistrationPayment = async (req, res) => {
  try {
  } catch (err) {}
};

const retrieveMemberInvoices = async (req, res) => {
  const memberId = req.query._id;

  try {
    const member = await membersService.findMember({ _id: memberId });
    const payouts = await stripeService.retrieveCustomerInvoices(
      member.StripeId
    );
    res.status(200).send(payouts);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  processPayment,
  createMemberSubscription,
  subscribeMemberToPlan,
  updateMembersSubscription,
  cancelMembersSubscription,
  listPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  retrievePaymentMethod,
  createBankForCoordinator,
  payMeetFee,
  listPayoutsToCoordinator,
  listChargesForCoordinator,
  getConnectedBalanceTransactions,
  retrieveMemberInvoices,
};
