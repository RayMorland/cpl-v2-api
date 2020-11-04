var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sharedSchemas = require("./shared");

var registrationSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    creationDate: {
      type: Date,
      default: null,
      required: true,
    },
    lastEditDate: {
      type: Date,
      default: null,
      required: true,
    },
    regLink: { type: String },
    resultId: {
      type: Schema.Types.ObjectId,
      ref: "Result",
      default: null,
      required: false
    },
    meetId: {
      type: Schema.Types.ObjectId,
      ref: "Meet",
      default: null,
      required: true,
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      default: null,
      required: true,
    },
    status: {
      type: String,
      default: "unpaid",
      // required: true,
    },
    name: {
      type: String,
      default: null,
      // required: true,
    },
    email: {
      type: String,
      default: null,
      // required: true,
    },
    dateOfBirth: {
      type: Date,
      default: null,
      // required: true,
    },
    gender: {
      type: String,
      default: null,
      // required: true,
    },
    address: { type: sharedSchemas.addressSchema, default: () => ({}) },
    competitionInfo: {
      weightClass: {
        type: String,
        default: null,
        // required: true,
      },
      divisions: [
        {
          name: { type: String, default: null },
          ageClass: {
            min: { type: Number },
            max: { type: Number },
          },
        },
      ],
      category: { type: String, default: null },
      test: { type: String, default: null },
      events: [
        {
          type: { type: String, default: null },
        }
      ],
      movements: [
        {
          type: { type: String, default: null },
          openingWeight: { type: Number, default: null },
          rackHeight: { type: Number, default: null },
          safetyHeight: { type: Number, default: null },
          rackPosition: { type: String, default: null },
        },
      ],
    },
    fees: {
      recordCertificate: {
        purchased: { type: Boolean, default: false },
        price: { type: Number, default: null },
      },
      meetFees: [sharedSchemas.meetFeeSchema],
      merchandise: [sharedSchemas.merchandiseSchema],
      paymentIntent: { type: String, default: null },
      paymentIntentStatus: { type: String, default: null },
      feesPaid: { type: Boolean, default: false },
      total: { type: Number, default: null },
    },
  },
  {
    minimize: false,
  },
  {
    collection: "registrations",
  }
);

mongoose.model("Registration", registrationSchema);
