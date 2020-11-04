var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sharedSchemas = require("./shared");

var personalSchema = new mongoose.Schema({
  firstName: { type: String, default: null, required: true },
  lastName: { type: String, default: null, required: true },
  dob: { type: Date, default: null, required: true },
  gender: { type: String, default: null, required: true },
  address: { type: sharedSchemas.addressSchema, default: () => ({})},
  phone: { type: String, default: null },
  homeGym: { type: String, default: null },
  coach: { type: String, default: null },
});

var membersMembershipSchema = new mongoose.Schema({
  membershipId: {
    type: Schema.Types.ObjectId,
    ref: "Membership",
    default: null,
  },
  planId: {
    type: Schema.Types.ObjectId,
    ref: "Plan",
    default: null,
  },
  stripeSubscription: { type: String, default: null },
  feePaid: { type: Boolean, default: false },
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  status: { type: String, default: null },
  current_period_end: { type: Date, default: null },
  automaticRenewal: { type: Boolean, default: false }
});

var membersProfileSchema = new mongoose.Schema({
  profilePicture: { type: String, default: null },
  tagLine: { type: String, default: null },
  description: { type: String, default: null },
  settings: [{}],
});

// TO BE IMPLEMENTED
// var lifterPreferencesSchema = new mongoose.Schema({
//   weightClass: { type: String, default: null },
//   division: { type: String, default: null },
//   tested: { type: Boolean, default: null },
//   category: { type: String, default: null },
//   events: [
//     {
//       type: String,
//       default: null,
//     },
//   ],
// });

// var membersStatsSchema = new mongoose.Schema({
//     meetsAttended: { type: Number, default: null },
//     maxDeadlift: { type: Number, default: null },
//     maxSquat: { type: Number, default: null },
//     maxBench: { type: Number, default: null },
// });

var MemberSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    stripeId: { type: String, default: null },
    email: { type: String, default: null, required: true, unique: true },
    creationDate: { type: Date, default: null },
    lastEditDate: { type: Date, default: null },
    status: { type: String, default: "inactive", required: true },
    personal: { type: personalSchema, default: () => ({}) },
    membership: { type: membersMembershipSchema, default: () => ({}) },
    profile: { type: membersProfileSchema, default: () => ({}) },
    // TO BE IMPLEMENTED
    // lifterPreferences: lifterPreferencesSchema,
    // stats: membersStatsSchema,
  },
  {
    collection: "members",
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Members meet results
MemberSchema.virtual("results", {
  ref: "Result",
  localField: "_id",
  foreignField: "memberId",
});

// Members records
MemberSchema.virtual("records", {
  ref: "Record",
  localField: "_id",
  foreignField: "memberId",
});

// Members meet registrations
MemberSchema.virtual("registrations", {
  ref: "Registration",
  localField: "_id",
  foreignField: "memberId",
});

MemberSchema.methods.setPaymentMethod = function () {
  stripe.customers.create(
    {
      email: req.body.email,
      description: "Customer for" + this.email,
      source: "tok_mastercard",
    },
    function (err, customer) {
      if (err) {
        return err;
      } else {
        return customer.id;
      }
    }
  );
};

mongoose.model("Member", MemberSchema);
