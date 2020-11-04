const creds = require("../../credentials");
const stripe = require("stripe")(creds.stripeTest);
const endpointSecret = "whsec_...";

// // Admin Access Stripe API

/* Events
 */

const retrieveEvent = async (eventId) => {
  try {
    const event = await stripe.events.retrieve(eventId);
    return event;
  } catch (err) {
    throw new Error(err.message);
  }
};

const listEvents = async (args) => {
  try {
    const events = await stripe.events.list(args);
    return events;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Charges
    Used for paying meet fees when registering for a meet
*/

/* */
const getCharges = async (chargeData) => {
  try {
    const charges = await stripe.charges.list(chargeData);
    return charges;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const retrieveCharge = async (chargeData) => {
  try {
    const charge = await stripe.charges.retrieve(chargeData);
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const createChargeForRegistration = async (chargeData) => {
  try {
    const charge = await stripe.charges.create({
      amount: chargeData.data.total,
      currency: "cad",
      source: chargeData.data.token.id, // obtained with Stripe.js
      description:
        "Charge for " +
        chargeData.member.email +
        " for " +
        chargeData.meet.title,
      on_behalf_of: chargeData.coordinator.stripeId,
      transfer_data: {
        destination: chargeData.coordinator.stripeId,
      },
      metadata: {},
    });
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createChargeForMeetFee = async (chargeData) => {
  try {
    const charge = await stripe.charges.create({
      amount: 2500,
      currency: "cad",
      source: chargeData.id, // obtained with Stripe.js
      metadata: {},
    });
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updateCharge = async (chargeData) => {
  try {
    const charge = await stripe.charges.update(chargeData);
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const captureCharge = async (chargeData) => {
  try {
    const charge = await stripe.charges.capture(chargeData);
    return charge;
  } catch (err) {
    throw new Error(err.message);
  }
};

const listChargesForCoordinator = async (stripeId) => {
  try {
    const charges = await stripe.charges.list(
      { limit: 1000 },
      { stripe_account: stripeId.id }
    );
    return charges;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Payment intents

const createPaymentIntent = async (coordinatorStripeId, paymentInfo) => {
  try {
    const payment = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: paymentInfo.amount,
      customer: paymentInfo.customerId,
      currency: "cad",
      transfer_data: {
        destination: coordinatorStripeId,
      },
    });
    return payment;
  } catch (err) {
    throw new Error(err);
  }
};

const createPaymentIntentForMembership = async (
  memberStripeId,
  paymentInfo
) => {
  try {
    const payment = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      amount: paymentInfo.amount,
      customer: paymentInfo.customerId,
      currency: "cad",
    });
    return payment;
  } catch (err) {
    throw new Error(err);
  }
};

const createPaymentIntentForRegistration = async (
  registration,
  memberStripeId,
  coordinatorStripeId,
  meetId
) => {
  console.log(
    registration.fees.total,
    memberStripeId,
    meetId,
    registration._id,
    coordinatorStripeId
  );
  try {
    const payment = await stripe.paymentIntents.create({
      payment_method_types: ["card"],
      // amount: registration.fees.total,
      amount: 1000,
      customer: memberStripeId.toString(),
      currency: "cad",
      metadata: {
        meetTitle: meetId.toString(),
        registrationId: registration._id.toString(),
      },
      transfer_data: {
        destination: coordinatorStripeId.toString(),
      },
    });
    return payment;
  } catch (err) {
    throw new Error(err);
  }
};

const retrievePaymentIntent = async (paymentInfo) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentInfo.intentId
    );
    return paymentIntent;
  } catch (err) {
    throw new Error(err);
  }
};

const updatePaymentIntent = async (paymentInfo) => {
  try {
    const paymentIntent = await stripe.paymentIntents.update(
      paymentInfo.intentId,
      paymentInfo.updatedIntent
    );
  } catch (err) {
    throw new Error(err);
  }
};

const confirmPaymentIntent = async (paymentInfo) => {
  try {
    const paymentIntent = await stripe.paymentIntents.confirm(
      paymentInfo.intentId,
      { payment_method: paymentInfo.paymentMethod }
    );
    return paymentIntent;
  } catch (err) {
    throw new Error(err);
  }
};

const capturePaymentIntent = async (paymentInfo) => {
  try {
    const paymentIntent = await stripe.paymentIntents.capture(
      paymentInfo.intentId
    );
    return paymentIntent;
  } catch (err) {
    throw new Error(err);
  }
};

const cancelPaymentIntent = async (paymentInfo) => {
  try {
    const paymentIntent = await stripe.paymentIntents.cancel(
      paymentInfo.intentId
    );
    return paymentIntent;
  } catch (err) {
    throw new Error(err);
  }
};

const listPaymentIntents = async (paymentInfo) => {
  try {
    const paymentIntents = await stripe.paymentIntents.list();
    return paymentIntents;
  } catch (err) {
    throw new Error(err);
  }
};

// Payment Methods

/* Create Payment Method */
const createPaymentMethod = async (paymentMethod) => {
  try {
    const newPaymentMethod = await stripe.paymentMethods.create(paymentMethod);
    return newPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Update Payment Method */
const updatePaymentMethod = async (paymentMethod) => {
  try {
    const updatedPaymentMethod = await stripe.paymentMethods.update(
      paymentMethod.id,
      { metadata: paymentMethod.metadata },
      paymentMethod.billingDetails
    );
    return updatedPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Retrieve Payment Method */
const retrievePaymentMethod = async (paymentMethod) => {
  try {
    const retrievedPaymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethod.id
    );
    return retrievedPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* List Customers Payment Methods */
const listPaymentMethods = async (search) => {
  try {
    const listOfPaymentMethods = await stripe.paymentMethods.list(search);
    return listOfPaymentMethods;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Attach Payment Method to Customer */
const attachPaymentMethod = async (paymentMethod) => {
  try {
    const attachedPaymentMethod = await stripe.paymentMethods.attach(
      paymentMethod.id,
      { customer: paymentMethod.customer }
    );
    return attachedPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

const detachPaymentMethod = async (paymentMethod) => {
  try {
    const detachedPaymentMethod = await stripe.paymentMethods.detach(
      paymentMethod.id
    );
    return detachedPaymentMethod;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Cards for members */

/* */
const createCard = async (cardInfo) => {
  try {
    const card = await stripe.customers.createSource(cardInfo.customer.id, {
      source: cardInfo.token.id,
    });
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const retrieveCard = async (cardInfo) => {
  try {
    const card = await stripe.customers.retrieveSource(
      cardInfo.customer.stripeId,
      cardInfo.cardId
    );
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updateCard = async (cardInfo) => {
  try {
    const card = await stripe.customers.updateSource(
      cardInfo.customer.stripeId,
      cardInfo.cardId,
      cardInfo.updatedCardInfo
    );
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const deleteCard = async (cardInfo) => {
  try {
    const card = await stripe.customers.deleteSource(
      cardInfo.customer.stripeId,
      cardInfo.cardId
    );
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const listAllCards = async (cardInfo) => {
  try {
    const card = await stripe.customers.retrieveSource(
      cardInfo.customer.stripeId,
      {
        object: "card",
      }
    );
    return card;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Products are either meet registrations (including fees, certificates, etc...) or membership plans

*/

/* */
const getProducts = async (args) => {
  try {
    const products = await stripe.products.list(args);
    return products;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const findProduct = async (productInfo) => {
  try {
    const product = await stripe.products.retrieve(productInfo);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const createProduct = async (productInfo) => {
  try {
    const product = await stripe.products.create({
      name: productInfo.name,
      description: productInfo.description,
      active: productInfo.active,
      price: productInfo.price,
      statement_descriptor: productInfo.statement_descriptor,
      type: productInfo.type,
      metadata: productInfo.metadata,
      attributes: productInfo.attributes,
    });
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMeetFeeProduct = async (meetId, info) => {
  try {
    const product = await stripe.products.create({
      name: productInfo.name,
      description: productInfo.description,
      active: productInfo.active,
      price: productInfo.price,
      statement_descriptor: productInfo.statement_descriptor,
      type: productInfo.type,
      metadata: {},
      attributes: productInfo.attributes,
    });
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMerchandiseProduct = async (info) => {
  try {
    const product = await stripe.products.create({
      name: productInfo.name,
      description: productInfo.description,
      active: productInfo.active,
      price: productInfo.price,
      statement_descriptor: productInfo.statement_descriptor,
      type: productInfo.type,
      metadata: productInfo.metadata,
      attributes: productInfo.attributes,
    });
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updateProduct = async (productInfo) => {
  try {
    const product = await stripe.products.update(productInfo);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const deleteProduct = async (deletedProduct) => {
  try {
    const product = stripe.products.del(productInfo);
    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Memerships  
    Memberships are products that have plans members can subscribe to
*/

/* */
const getPlans = async (planInfo) => {
  try {
    const plans = stripe.plans.list(planInfo);
    return plans;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const findPlan = async (planInfo) => {
  try {
    const plan = await stripe.plans.retrieve(planInfo);
    return plan;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const createPlan = async (productId, planInfo) => {
  try {
    const plan = await stripe.plans.create({
      amount: planInfo.amount,
      currency: "cad",
      interval: planInfo.interval,
      product: productId,
    });
    return plan;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updatePlan = async (planInfo) => {
  try {
    const plan = await stripe.plans.update(planInfo);
    return plan;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const deletePlan = async (planInfo) => {
  try {
    const plan = await stripe.plans.del(planInfo);
    return plan;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Subscriptions
 */

/* */
const listSubscriptions = async (subscriptionInfo) => {
  try {
    const subscriptions = await stripe.subscriptions.list(subscriptionInfo);
    return subscriptions;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const createSubscription = async (subscriptionInfo) => {
  try {
    const subscription = await stripe.subscriptions.create(subscriptionInfo);
    return subscription;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const findSubscription = async (subscriptionInfo) => {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionInfo);
    return subscription;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updateSubscription = async (subscriptionInfo) => {
  try {
    const result = await stripe.subscriptions.update(subscriptionInfo);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const cancelSubscription = async (subscriptionInfo) => {
  try {
    const subscription = await stripe.subscriptions.del(subscriptionInfo);
    return subscription;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const findUsersByPlan = async (planInfo) => {
  try {
    const subscriptions = await stripe.subscriptions.list(planInfo);
    return subscriptions;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* Members Access Stripe API As Customers
    Members subscribe to memberships(plans);
*/

/* */
const listCustomers = async (customerInfo) => {
  try {
    const customers = await stripe.customers.list(customerInfo);
    return customers;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const findCustomer = async (customerInfo) => {
  try {
    const customer = await stripe.customers.retrieve(customerInfo);
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const createCustomer = async (customerInfo) => {
  try {
    const customer = await stripe.customers.create(customerInfo);
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updateCustomer = async (customer) => {
  try {
    const customer = await stripe.customers.update(customer, {
      metadata: { order_id: "6735" },
    });
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const deleteCustomer = async (customerId) => {
  try {
    const customer = await stripe.customers.del(customerId);
    return customer;
  } catch (err) {
    throw new Error(err.message);
  }
};

// // Coordinators Access Stripe API As Connected Accounts

/* */
const listConnectAccounts = async () => {
  try {
    const accounts = await stripe.accounts.list();
    return accounts;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const findConnectAccount = async (accountInfo) => {
  try {
    const account = await stripe.accounts.retrieve(accountInfo.id);
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const createConnectAccount = async (accountInfo, req) => {
  try {
    const account = await stripe.accounts.create({
      type: "custom",
      country: "CA",
      email: accountInfo.email,
      // business_type: "company",
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: req.connection.remoteAddress,
      },
    });
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const updateConnectAccount = async (updatedAccount) => {
  try {
    const account = await stripe.accounts.update(
      updatedAccount.id,
      updatedAccount
    );
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

/* */
const deleteConnectAccount = async (deletedAccount) => {
  try {
    const account = await stripe.accounts.del(deletedAccount.id);
    return account;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getConnectedBalanceTransactions = async (stripeId) => {
  try {
    const transactions = await stripe.balanceTransactions.list(
      { limit: 3 },
      { stripe_account: stripeId }
    );
    return transactions;
  } catch (err) {
    throw new Error(err);
  }
};

// Payouts

const createPayout = async (payoutDetails, account) => {
  try {
    const payout = await stripe.payouts.create(payoutDetails, {
      stripe_account: account,
    });
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

const retrievePayout = async (payoutInfo) => {
  try {
    const payout = await stripe.payouts.retrieve(payoutInfo.id);
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

const updatePayout = async (payoutInfo) => {
  try {
    const payout = await stripe.payouts.update(
      payoutInfo.id,
      payoutInfo.details
    );
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

const listPayouts = async (payoutInfo) => {
  try {
    const payoutList = await stripe.payouts.list(payoutInfo);
    return payoutList;
  } catch (err) {
    throw new Error(err);
  }
};

const listPayoutsForCoordinator = async (stripeId) => {
  try {
    const payoutList = await stripe.payouts.list(payoutInfo);
    return payoutList;
  } catch (err) {
    throw new Error(err);
  }
};

const cancelPayout = async (payoutInfo) => {
  try {
    const payout = await stripe.payouts.cancel(payoutInfo.id);
    return payout;
  } catch (err) {
    throw new Error(err);
  }
};

// External Accounts for coordinators to Receive Payouts

const createExternalAccount = async (externalAccountInfo, token) => {
  try {
    const account = await stripe.accounts.createExternalAccount(
      externalAccountInfo,
      { external_account: token }
    );
    return account;
  } catch (err) {
    throw new Error(err);
  }
};

// Create bank token

const createBankToken = async (bankInfo, token) => {
  try {
    const token = await stripe.tokens.create({
      bankInfo,
    });
    return token;
  } catch (err) {
    throw new Error(err);
  }
};

// Invoices

const retrieveCustomerInvoices = async (stripeId) => {
  try {
    const invoices = await stripe.invoices.list({ customer: stripeId });
    return invoices;
  } catch (err) {
    throw new Error(err);
  }
};

// // Payments and Checkout

/* */
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

/* */
const webhook = async (req, sig) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Fulfill the purchase...
    handleCheckoutSession(session);
  }
  return true;
};

module.exports = {
  retrieveEvent,
  listEvents,
  getCharges,
  retrieveCharge,
  createPaymentMethod,
  updatePaymentMethod,
  retrievePaymentMethod,
  listPaymentMethods,
  attachPaymentMethod,
  detachPaymentMethod,
  createChargeForRegistration,
  createChargeForMeetFee,
  updateCharge,
  captureCharge,
  listChargesForCoordinator,
  createPaymentIntent,
  updatePaymentIntent,
  retrievePaymentIntent,
  confirmPaymentIntent,
  capturePaymentIntent,
  cancelPaymentIntent,
  listPaymentIntents,
  createPaymentIntentForRegistration,
  createPaymentIntentForMembership,
  createCard,
  retrieveCard,
  updateCard,
  deleteCard,
  listAllCards,
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
  createMerchandiseProduct,
  createMeetFeeProduct,
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
  listConnectAccounts,
  createConnectAccount,
  findConnectAccount,
  updateConnectAccount,
  deleteConnectAccount,
  getConnectedBalanceTransactions,
  // updateUserPaymentInfo,
  createPayout,
  retrievePayout,
  updatePayout,
  listPayouts,
  cancelPayout,
  listPayoutsForCoordinator,
  createBankToken,
  createExternalAccount,
  retrieveCustomerInvoices,
  createCheckoutSession,
  webhook,
};
