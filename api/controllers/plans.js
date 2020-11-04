// Plans for membership products that members subscribe to

const stripeService = require("../services/stripe.service");
const membershipsService = require("../services/memberships.service");
const planService = require("../services/plan.service");

var errorHandler = function(err, res) {
  return res.status(500).send({ message: err.message });
};

const listAllPlans = async (req, res) => {
  const plansSearch = req.body;

  try {
    const plans = stripeService.listAllPlans(plansSearch);
    return plans;
  } catch (err) {
    errorHandler(err, res);
  }
};

const createPlan = async (req, res) => {
  const newPlan = req.body.newPlan;

  try {
    // Create a plan that members can subscribe to for a membership product
    const plan = await planService.createPlan(newPlan);

    const membership = await membershipsService.addPlanToMembership(plan);

    return res.status(200).send(plan);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updatePlan = async (req, res) => {
  const updatedPlan = req.body;

  try {
    const plan = await stripeService.updatePlan(updatedPlan);
    return plan;
  } catch (err) {
    errorHandler(err, res);
  }
};

const retrievePlan = async (req, res) => {
  const plan = req.body;

  try {
    const thePlan = await stripeService.retrievePlan(plan);
    return thePlan;
  } catch (err) {
    errorHandler(err, res);
  }
};

const deletePlan = async (req, res) => {
    const plan = req.body;

    try {
      const thePlan = await stripeService.deletePlan(plan);
      const membership = await membershipsService.removePlanFromMembership(plan);
      return thePlan;
    } catch (err) {
      errorHandler(err, res);
    }
};

module.exports = {
  listAllPlans,
  createPlan,
  retrievePlan,
  updatePlan,
  deletePlan
};
