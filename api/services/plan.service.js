const planDb = require("../db/plan.db");
const stripeService = require("../utils/stripe.util");

const getAllPlans = async () => {
  try {
    const result = await planDb.allPlans();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findPlan = async (searchQuery) => {
  try {
    const result = planDb.findPlan(searchQuery);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createPlan = async (membershipId, productId, newPlanInfo) => {
  try {
    let plan = await planDb.createPlan(membershipId, newPlanInfo);
    let stripePlan = await stripeService.createPlan(productId, plan);

    plan.stripeId = stripePlan.id;

    let updatedPlan = await planDb.updatePlan(plan._id, plan);

    return updatedPlan;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updatePlan = async (id, updatedPlan) => {

  try {
    const result = await planDb.updatePlan(id, updatedPlan);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const membersWithPlan = async (Plan) => {
  try {
    const result = await planDb.membersWithPlan(Plan);
    // use stripe to get all members with membership
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createPlan,
  findPlan,
  getAllPlans,
  updatePlan,
  membersWithPlan
};
