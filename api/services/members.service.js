const membersDb = require("../db/members.db");
const stripeApi = require("../utils/stripe.util");

const getAllMembers = async () => {
  try {
    const result = await membersDb.allMembers();
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findMember = async searchQuery => {
  try {
    const result = membersDb.findMember(searchQuery);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createMember = async (newMemberInfo) => {
  
  try {
    const result = await membersDb.findMember({email: newMemberInfo.email});
    if (result != null) {
      if (result.length > 0) {
        throw new Error("Member already exists");
      } else {
        newMember = await membersDb.createMember(newMemberInfo);
        return newMember;
      }
    } else if (result == null) {
      newMember = await membersDb.createMember(newMemberInfo);
      return newMember;
    }
    throw new Error("Null Result");
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateMember = async (id, updatedMember) => {
  try {
    const result = await membersDb.updateMember(id, updatedMember);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteMember = async (deletedMember) => {
  try {
    const result = await membersDb.removeMember(deletedMember);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

const membersRegistrations = async (member) => {
  try {
    const result = await membersDb.membersRegistrations(member);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createMember,
  findMember,
  getAllMembers,
  updateMember,
  deleteMember,
  membersRegistrations
};
