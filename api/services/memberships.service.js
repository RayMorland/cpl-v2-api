const membershipsDb = require("../db/memberships.db");
const stripeService = require("../utils/stripe.util");

const getAllMemberships = async () => {
  try {
    const result = await membershipsDb.allMemberships();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findMembership = async (searchQuery) => {
  try {
    const result = membershipsDb.findMembership(searchQuery);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMembership = async (newMembershipInfo) => {
  try {
    // const result = await membershipsDb.findMembership(newMembershipInfo);
    // if (result != null && result != undefined) {
    //     if (result.length > 0) {
    //         throw new Error("Membership already exists");
    //     } else {
    let membership = await membershipsDb.createMembership(newMembershipInfo);
    return membership;
    //     }
    // }
    // throw new Error("Null Result");
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMembership = async (id, updatedMembership) => {
  try {
    const result = await membershipsDb.updateMembership(id, updatedMembership);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const membersWithMembership = async (Membership) => {
  try {
    const result = await membershipsDb.membersWithMembership(Membership);
    // use stripe to get all members with membership
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const addPlanToMembership = async (plan) => {
  try {
    let membership = await membershipsDb.findMembership({
      stripeId: plan.product,
    });
    membership[0].plans.push(plan);
    const updatedMembership = await membershipsDb.updateMembership(
      membership[0]._id,
      membership[0]
    );
    return updatedMembership;
  } catch (err) {
    throw new Error(err.message);
  }
};

const removePlanFromMembership = async (plan) => {
  try {
    const membership = membershipsDb.findMembership(plan.membershipId);
    let membershipPlans = membership.plans;
    updatedPlans = membershipPlans.filter((obj) => obj._id !== plan._id);
    const updatedMembership = membershipsDb.updatedMembership(membership._id, {
      plans: updatedPlans,
    });
    return updatedMembership;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMembershipPlans = async (membershipId) => {
  try {
    const plans = await membershipsDb.getMembershipPlans(membershipId);
    return plans;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createMembership,
  findMembership,
  getAllMemberships,
  getMembershipPlans,
  updateMembership,
  membersWithMembership,
  addPlanToMembership,
  removePlanFromMembership,
};
