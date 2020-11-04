const mongoose = require("mongoose");
const Member = mongoose.model("Member");
const stripe = require("stripe")("sk_test_uzFffEtteURc3nukPDfaxWrs");
const memberService = require("../services/members.service");
const userService = require("../services/users.service");
const stripeService = require("../services/stripe.service");
const authService = require("../services/auth.service");

const errorHandler = function (err, res) {
  console.log(err.message);
  return res.status(500).send({ message: err.message });
};

const getMembers = async (req, res) => {
  try {
    const members = await memberService.getAllMembers();
    res.status(200).send(members);
  } catch (err) {
    errorHandler(err, res);
  }
};

const adminCreateMember = async (req, res) => {
  let newMember = req.body.newMember;
  console.log(newMember);
  //  Create Cognito user
  try {
    // Create cognito user
    const cognitoUser = await authService.Create(newMember);

    // Create a new user  of type member
    const user = await userService.createUser(newMember, "member", cognitoUser.User.Username);

    // Set new members user id
    newMember.userId = user.newUser._id;

    // Create new member
    const member = await memberService.createMember(newMember);

    // Create a stripe customer for member
    const stripeUser = await stripeService.createCustomer(member);

    // Update member with stripe customer id
    const updatedMember = await memberService.updateMember(member._id, {
      stripeId: stripeUser.id
    });

    // Update user with members id
    const updatedUser = await userService.updateUser({
      _id: updatedMember.userId,
      data: { typeId: updatedMember._id },
    });
    res.status(200).json([updatedMember, user.token]);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createMember = async (req, res, next) => {
  let newMember = req.body.newMember;

  try {

    const user = await userService.findUser({ _id: newMember.userId });

    newMember.email = user.email;
    newMember.personal.firstName = user.name.slice(0, user.name.indexOf(' '));
    newMember.personal.lastName = user.name.slice(user.name.indexOf(' ') + 1, );

    // Create new member
    const member = await memberService.createMember(newMember);
    // Create a stripe customer for member
    const stripeUser = await stripeService.createCustomer(member);

    // Update member with stripe customer id
    const updatedMember = await memberService.updateMember(member._id, {
      stripeId: stripeUser.id,
    });

    user.typeId = updatedMember._id;

    // Update user with members id
    const updatedUser = await userService.updateUser(user);

    res.status(200).json(updatedMember);
  } catch (err) {
    errorHandler(err, res);
  }
};

const createStripeIdForMember = async (req, res) => {
  function callback(customer) {
    Member.findById({ _id: req.body._id }).exec((err, member) => {
      if (err) {
        errorHandler(err);
      }
      member.paymentInfo.stripeId = customer.id;
      member.save((err, member) => {
        if (err) {
          errorHandler(err);
        }
        res.status(200).json(customer);
      });
    });
  }

  stripe.customers.create(
    {
      email: req.body.email,
      description: "Customer for " + req.body.email,
      source: "tok_mastercard",
    },
    function (err, customer) {
      if (err) {
        errorHandler(err);
      }
      callback(customer);
    }
  );
};

const findMember = async (req, res) => {
  const searchQuery = req.query;

  try {
    const member = await memberService.findMember(searchQuery);
    res.status(200).send(member);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const updateMember = async (req, res) => {
  let updatedMember = req.body.updatedMember;
  const id = req.body._id;

  try {
    const member = await memberService.updateMember(id, updatedMember);
    res.status(200).send(member);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Deactivate Member
const deactivateMember = async (req, res) => {};

// Permanent Delete Member
const deleteMember = async (req, res) => {
  const deletedMember = req.body.deletedMember;

  try {

    // delete user member from CPL db
    const deleteUser = await userService.deleteUser(deletedMember.userId);

    // delete member from CPL db
    const member = await memberService.deleteMember(deletedMember._id);
    
    // delete member from aws amplify
    const amplifyDeleteMember = await authService.Delete(deletedMember.email);
    
    // delete member from stripe
    const stripeDeletedMember = await stripeService.deleteCustomer(deletedMember.stripeId);

    // delete member from 
    res.status(200).send(member);
  } catch (err) {
    errorHandler(err, res);
  }
};

const membersRegistrations = async (req, res) => {
  const member = req.query;

  try {
    const result = await memberService.membersRegistrations(member);
    res.status(200).send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const addMembership = function (req, res) {
  let memberId = req.body.memberId;
  let membershipId = req.body.membershipId;

  Member.findById({ _id: memberId }).exec((err, member) => {
    if (err) {
      errorHandler(err, res);
    }
    member.membershipId = membershipId;
    member.save((err, member) => {
      if (err) {
        errorHandler(err, res);
      }
      res.status(200).send(member);
    });
  });
};

const membersMembership = function (req, res) {
  let member = req.query;

  Member.findById(member._id)
    .populate("membership._id")
    .exec((err, members) => {
      if (err) {
        errorHandler(err, res);
      }
      res.status(200).send(members.membership);
    });
};

const membersResults = function (req, res) {
  let query = req.query;

  Member.findOne(query)
    .populate("results")
    .exec(function (err, member) {
      if (err) {
        errorHandler(err, res);
      }
      res.status(200).send(member.results);
    });
};

const membersRecords = function (req, res) {
  let query = req.query;

  Member.findOne(query)
    .populate("records")
    .exec(function (err, member) {
      if (err) {
        errorHandler(err, res);
      }
      res.status(200).send(member.records);
    });
};

module.exports = {
  getMembers,
  adminCreateMember,
  createMember,
  createStripeIdForMember,
  findMember,
  updateMember,
  deactivateMember,
  deleteMember,
  membersRegistrations,
  addMembership,
  membersMembership,
  membersResults,
  membersRecords,
};
