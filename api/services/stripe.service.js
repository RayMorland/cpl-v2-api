const stripeApi = require("../utils/stripe.util");
const meetDb = require("../db/meets.db");
const coordinatorDb = require("../db/coordinators.db");
const memberDb = require("../db/members.db");

// // Admin Access Stripe API

/* Events
 */

const retrieveEvent = async (event) => {
  try {
    const result = stripeApi.retrieveEvent(event);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const listEvents = async () => {
  try {
    const result = stripeApi.listEvents();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Charges
    Used for paying meet fees when registering for a meet
*/

const getCharges = async (chargeData) => {
  try {
    const result = stripeApi.retrieveEvent(event);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const retrieveCharge = async (chargeData) => {
  try {
    const charge = await stripeApi.retrieveCharge(chargeData);
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createChargeForRegistration = async (chargeData) => {
  try {
    const meet = await meetDb.findMeet(chargeData.meet);
    const member = await memberDb.findMember({
      _id: chargeData.registration.memberId,
    });
    const coordinator = await coordinatorDb.findCoordinator({
      _id: meet[0].coordinator,
    });
    const chargeInfo = {
      meet: meet[0],
      coordinator: coordinator[0],
      member: member[0],
      data: chargeData,
    };
    const charge = await stripeApi.createCharge(chargeInfo);
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createChargeForMeetFee = async (chargeData) => {
  try {
    const charge = await stripeApi.createChargeForMeetFee(chargeData);
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateCharge = async (chargeData) => {
  try {
    const charge = await stripeApi.updateCharge(chargeData);
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

const captureCharge = async (chargeData) => {
  try {
    const charge = await stripe.charges.capture("ch_1FMo3O2eZvKYlo2C6i2r8arv");
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

const listChargesForCoordinator = async (stripeId) => {
  try {
    const charges = await stripeApi.listChargesForCoordinator(stripeId);
    return charges;
  } catch (err) {
    throw new Error(err.message);
  }
};
/* Products are either meet registrations (including fees, certificates, etc...) or membership plans

*/
const getProducts = async () => {
  try {
    const products = await stripeApi.getProducts();
    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findProduct = async (productInfo) => {
  try {
    const product = await stripeApi.findProduct(productInfo);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createProduct = async (productInfo) => {
  try {
    const product = await stripeApi.createProduct(productInfo);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateProduct = async (productInfo) => {
  try {
    const product = await stripeApi.updateProduct(productInfo);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteProduct = async (productInfo) => {
  try {
    const product = stripeApi.deleteProduct(productInfo);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Memerships  
    Memberships are products that have plans members can subscribe to
*/
const getPlans = async (planInfo) => {
  try {
    const plans = stripeApi.getPlans(planInfo);
    return plans;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findPlan = async (planInfo) => {
  try {
    const plan = await stripeApi.findPlan(planInfo);
  } catch (err) {
    throw new Error(err.message);
  }
};

const createPlan = async (planInfo) => {
  try {
    const plan = await stripeApi.createPlan(planInfo);
    return plan;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updatePlan = async (planInfo) => {
  try {
    const plan = await stripeApi.updatePlan(planInfo);
    return plan;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deletePlan = async (planInfo) => {
  try {
    const plan = await stripeApi.deletePlan(planInfo);
    return plan;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Subscriptions
 */

const listSubscriptions = async () => {
  try {
    const subscriptions = await stripeApi.listSubscriptions();
    return subscriptions;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createSubscription = async (subscriptionInfo) => {
  try {
    const subscription = await stripeApi.createSubscription({
      customer: subscriptionInfo.member.stripeId,
      items: [
        {
          plan: subscriptionInfo.plan,
        },
      ],
    });
    return subscription;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findSubscription = async (subscriptionInfo) => {
  try {
    const subscription = await stripeApi.findSubscription(subscriptionInfo);
    return subscription;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateSubscription = async (subscriptionInfo) => {
  try {
    const result = await stripeApi.updateSubscription(subscriptionInfo);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const cancelSubscription = async (subscriptionInfo) => {
  try {
    const subscription = await stripeApi.cancelSubscription(subscriptionInfo);
    return subscription;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findUsersByPlan = async (planInfo) => {
  try {
    const subscriptions = await stripeApi.findUsersByPlan(planInfo);
    return subscriptions;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Members Access Stripe API As Customers
    Members subscribe to memberships(plans);
*/

const listCustomers = async () => {
  try {
    const customers = await stripeApi.listCustomers();
    return customers;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findCustomer = async (customerInfo) => {
  try {
    const customer = await stripeApi.findCustomer(customerInfo);
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createCustomer = async (customerInfo) => {
  const newCustomer = {
    email: customerInfo.email,
  };

  try {
    const customer = await stripeApi.createCustomer(newCustomer);
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateCustomer = async (customerInfo) => {
  try {
    const customer = await stripeApi.updateCustomer(customerInfo);
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteCustomer = async (customerInfo) => {
  try {
    const customer = await stripeApi.deleteCustomer(customerInfo);
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Payment Methods

/* Create Payment Method */
const createPaymentMethod = async (paymentMethod) => {
  try {
    const newPaymentMethod = await stripeApi.createPaymentMethod(paymentMethod);
    return newPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Update Payment Method */
const updatePaymentMethod = async (paymentMethod) => {
  try {
    const updatedPaymentMethod = await stripeApi.updatePaymentMethod(
      paymentMethod
    );
    return updatedPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Retrieve Payment Method */
const retrievePaymentMethod = async (paymentMethod) => {
  try {
    const retrievedPaymentMethod = await stripeApi.retrievePaymentMethod(
      paymentMethod
    );
    return retrievedPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* List Customers Payment Methods */
const listPaymentMethods = async (paymentMethods) => {
  try {
    const listOfPaymentMethods = await stripeApi.listPaymentMethods(
      paymentMethods
    );
    return listOfPaymentMethods;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Attach Payment Method to Customer */
const attachPaymentMethod = async (paymentMethod) => {
  try {
    const attachedPaymentMethod = await stripeApi.attachPaymentMethod(
      paymentMethod
    );
    return attachedPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

const detachPaymentMethod = async (paymentMethod) => {
  try {
    const detachedPaymentMethod = await stripeApi.detachPaymentMethod(
      paymentMethod
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

// Payment Intents

const createPaymentIntentForRegistration = async (
  registration,
  memberStripeId,
  coordinatorStripeId
) => {
  try {
    const intent = stripeApi.createPaymentIntentForRegistration(
      registration,
      memberStripeId,
      coordinatorStripeId
    );
    return intent;
  } catch (err) {
    throw new Error(err);
  }
};

const completeRegistrationPayment = async (data) => {
  try {
    const payment = stripeApi.completeRegistrationPayment(data);
    return payment;
  } catch (err) {
    throw new Error(err);
  }
};

// Customer Cards

/* */
const createCard = async (cardInfo) => {
  try {
    const customer = await stripeApi.findCustomer(cardInfo.member.stripeId);
    const card = await stripeApi.createCard({
      customer: customer,
      token: cardInfo.token,
    });
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const retrieveCard = async (cardInfo) => {
  try {
    const card = await stripeApi.retrieveCard(cardInfo);
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updateCard = async (cardInfo) => {
  try {
    const card = await stripeApi.updateCard(cardInfo);
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const deleteCard = async (cardInfo) => {
  try {
    const card = await stripeApi.deleteCard(cardInfo);
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const listAllCards = async (cardInfo) => {
  try {
    const card = await stripeApi.listAllCards(cardInfo);
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

// // Coordinators Access Stripe API As Connected Accounts

const listConnectAccounts = async () => {
  try {
    const connectedAccounts = await stripeApi.listConnectAccounts();
    return connectedAccounts;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findConnectAccount = async (accountInfo) => {
  try {
    const account = await stripeApi.findConnectAccount(accountInfo);
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createConnectAccount = async (accountInfo) => {
  try {
    const account = await stripeApi.createConnectAccount(accountInfo);
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateConnectAccount = async (accountInfo) => {
  try {
    const account = await stripeApi.updateConnectAccount(accountInfo);
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteConnectAccount = async (accountInfo) => {
  try {
    const account = await stripeApi.deleteConnectAccount(accountInfo);
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Balance transactions

const getConnectedBalanceTransactions = async (stripeId) => {
  try {
    const transactions = await stripeApi.getConnectedBalanceTransactions(
      stripeId
    );
    return transactions;
  } catch (err) {
    throw new Error(err);
  }
};

// Payouts for sending mondey to connect accounts after meet registration

const createPayout = async (payoutInfo) => {
  try {
    const payout = await stripeApi.createPayout(
      payoutInfo.details,
      payourInfo.accountId
    );
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

const retrievePayout = async (payoutInfo) => {
  try {
    const payout = await stripeApi.retrievePayout(payoutInfo);
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

const updatePayout = async (payoutInfo) => {
  try {
    const payout = await stripeApi.updatePayout(
      payoutInfo.payoutId,
      updatedPayout
    );
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

const listPayouts = async (payoutInfo) => {
  try {
    const payoutList = await stripeApi.listPayouts(payoutInfo);
    return payoutList;
  } catch (err) {
    throw new Error(err);
  }
};

const listPayoutsToCoordinator = async (stripeId) => {
  try {
    const payoutList = await stripeApi.listPayouts(stripeId);
    return payoutList;
  } catch (err) {
    throw new Error(err);
  }
};

const cancelPayout = async (payoutInfo) => {
  try {
    const payout = await stripeApi.cancelPayout(payoutInfo);
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

// External accounts for coordinators to add debit cards for payouts

const createExternalAccount = async (externalAccountInfo, token) => {
  try {
    const account = await stripeApi.createExternalAccount(
      externalAccountInfo,
      token
    );
    return account;
  } catch (err) {
    throw new Error(err);
  }
};

// Inovices
const retrieveCustomerInvoices = async (stripeId) => {
  try {
    const invoices = await stripeApi.retrieveCustomerInvoices(
      stripeId
    );
    return invoices;
  } catch (err) {
    throw new Error(err);
  }
}

// // Payments and Checkout

const createCheckoutSession = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          name: "T-shirt",
          description: "Comfortable cotton t-shirt",
          images: ["https://example.com/t-shirt.png"],
          amount: 500,
          currency: "cad",
          quantity: 1,
        },
      ],
      success_url: "https://example.com/success",
      cancel_url: "https://example.com/cancel",
    });
    return session;
  } catch (err) {
    throw new Error(err.message);
  }
};

const webhook = async (sig) => {
  try {
    let result = await stripeUtil.webhook(req, sig);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  retrieveEvent,
  listEvents,
  getCharges,
  retrieveCharge,
  createChargeForRegistration,
  createChargeForMeetFee,
  updateCharge,
  captureCharge,
  listChargesForCoordinator,
  getPlans,
  findPlan,
  createPlan,
  updatePlan,
  // pausePlan,
  // cancelPlan,
  deletePlan,
  getProducts,
  findProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  findUsersByPlan,
  listSubscriptions,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  findSubscription,
  listCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomer,
  createPaymentMethod,
  updatePaymentMethod,
  retrievePaymentMethod,
  listPaymentMethods,
  attachPaymentMethod,
  detachPaymentMethod,
  createPaymentIntentForRegistration,
  createCard,
  retrieveCard,
  updateCard,
  deleteCard,
  listAllCards,
  listConnectAccounts,
  createConnectAccount,
  findConnectAccount,
  updateConnectAccount,
  deleteConnectAccount,
  getConnectedBalanceTransactions,
  createPayout,
  updatePayout,
  retrievePayout,
  listPayouts,
  cancelPayout,
  listPayoutsToCoordinator,
  createExternalAccount,
  // updateUserPaymentInfo,
  createCheckoutSession,
  retrieveCustomerInvoices,
  webhook,
};
