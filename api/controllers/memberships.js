const membershipsService = require("../services/memberships.service");
const stripeService = require("../services/stripe.service");
const plansService = require("../services/plan.service");

const errorHandler = (err, res) => {
  return res.status(500).send({ message: err.message });
};

const getMemberships = async (req, res) => {
  try {
    const memberships = await membershipsService.getAllMemberships();
    res.status(200).send(memberships);
  } catch (err) {
    errorHandler(err, res);
  }
};

const findMembership = async (req, res) => {
  const membership = req.query;

  try {
    const result = await membershipsService.findMembership(membership);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createMembership = async (req, res) => {
  const newMembership = req.body.newMembership;
  const newPlans = req.body.membershipPlans;

  try {
    // Create cpl membership object
    const membership = await membershipsService.createMembership(newMembership);
    // Create a stripe product for the cpl membership
    const product = await stripeService.createProduct(membership);
    // Create plan for each plan in newMembership.plans
    let plans = [];
    for (const plan of newPlans) {
      let res = await plansService.createPlan(
        membership._id,
        product.id,
        plan
      );
      plans.push(res._id);
    }

    console.log(product);

    membership.stripeId = product.id,
    membership.plans = plans
    //  Update the cpl membership with the stipe product id
    const updatedMembership = await membershipsService.updateMembership(
      membership._id,
      membership
    );

    res.status(200).send(updatedMembership);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateMembership = async (req, res) => {
  const updatedMembership = req.body.updatedMembership;
  const id = req.body._id;

  try {
    const result = await membershipsService.updateMembership(
      id,
      updatedMembership
    );
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteMembership = async (req, res) => {
  let deletedMembership = req.body.deletedMembership;

  try {
    const result = await membershipsService.deleteMembership(deletedMembership);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const membersWithMembership = async (req, res) => {
  const membershipId = req.query;

  try {
    const memberships = await membershipsService.getMembersWithMembership(
      membershipId
    );
    res.status(200).send(memberships);
  } catch (err) {
    errorHandler(err, res);
  }
};

const membershipPlans = async (req, res) => {
  const membershipId = req.query._id;

  try {
    const plans = await membershipsService.getMembershipPlans(
      membershipId
    );
    res.status(200).send(plans);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  getMemberships,
  findMembership,
  createMembership,
  updateMembership,
  deleteMembership,
  membersWithMembership,
  membershipPlans
};
