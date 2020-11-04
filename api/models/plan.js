var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sharedSchemas = require("./shared");

var PlanSchema = new mongoose.Schema(
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
    membershipId: {
      type: Schema.Types.ObjectId,
      ref: "Membership",
      default: null,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    name: {
      type: String,
      default: null,
      required: true,
    },
    stripeId: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        default: null,
        required: true
    },
    interval: {
        type: String,
        default: null,
        required: true
    },
    intervalCount: {
        type: String,
        default: null,
        required: true
    }
  },
  {
    minimize: false,
  },
  {
    collection: "plans",
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

PlanSchema.virtual("members", {
    ref: "Member",
    localField: "_id",
    foreignField: "membership.planId"
  });

mongoose.model("Plan", PlanSchema);