var mongoose = require("mongoose");
var Membership = mongoose.model("Membership");

const allMemberships = async () => {
  try {
    const result = await Membership.find({}).populate({
        path: "plans",
        model: "Plan"
    }).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findMembership = async (searchQuery) => {
  try {
    const result = await Membership.findOne(searchQuery)
      .populate("plans")
      .exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getMembershipPlans = async (searchQuery) => {
  try {
    const result = await Membership.findOne({ _id: searchQuery })
      .populate({
        path: "plans"
      })
      .exec();

    return result.plans;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMembership = async (newMembership) => {
  let membership = new Membership(newMembership);
  membership._id = new mongoose.Types.ObjectId();
  membership.creationDate = new Date();
  membership.lastEditDate = new Date();

  try {
    const result = await membership.save();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeMembership = async (membership) => {
  try {
    const result = await Membership.findByIdAndRemove({
      _id: membership._id,
    }).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMembership = async (id, updatedMembership) => {
  updatedMembership.lastEditDate = new Date();

  try {
    const result = await Membership.findByIdAndUpdate(
      { _id: id },
      updatedMembership,
      { new: true }
    ).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const membersWithMembership = async (membership) => {
  try {
    const result = await Membership.findOne({ _id: membership })
      .populate("members")
      .exec((err, membership) => {
        if (err) {
          errorHandler(err, res);
        }
        res.status(200).send(membership.members);
      });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  allMemberships,
  findMembership,
  createMembership,
  getMembershipPlans,
  removeMembership,
  updateMembership,
  membersWithMembership,
};
