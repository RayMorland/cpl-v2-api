var mongoose = require("mongoose");
var Member = mongoose.model("Member");

const allMembers = async () => {
  try {
    const result = await Member.find().exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findMember = async (searchQuery) => {
  try {
    const result = await Member.findOne(searchQuery)
      .populate([
        {
          path: "membership.membershipId membership.planId",
        },
        { path: "userId" },
      ])
      .exec();

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMember = async (newMemberInfo) => {
  let member = new Member(newMemberInfo);
  member._id = new mongoose.Types.ObjectId();
  member.creationDate = new Date();
  member.lastEditDate = new Date();
  member.status = "onboarding";

  try {
    const newMember = await member.save();
    return newMember;
  } catch (err) {
    throw new Error(err.message);
  }
};

const removeMember = async (member) => {
  try {
    const result = await Member.deleteOne({ _id: member }).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMember = async (id, updatedMember) => {
  updatedMember.lastEditDate = new Date();
  try {
    const result = await Member.findOneAndUpdate(
      { _id: id },
      { $set: updatedMember },
      { upsert: true, new: true }
    ).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const membersRegistrations = async (member) => {
  try {
    const result = await Member.findById(member._id)
      .populate({
        path: "registrations",
        populate: { path: "meetId" },
      })
      .exec();
    if (result.registrations.length > 0) {
      return result.registrations;
    }
    return [];
  } catch (err) {
    throw new Error(err.message);
  }
};

const addRegistrationToCart = async (memberId, registrationId) => {
  try {
    const result = await Member.findByIdAndUpdate(
      memberId,
      { $push: { cart: registrationId } },
      { new: true }
    ).exec();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  allMembers,
  findMember,
  createMember,
  removeMember,
  updateMember,
  membersRegistrations,
  addRegistrationToCart,
};
