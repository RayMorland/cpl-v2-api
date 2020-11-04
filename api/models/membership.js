var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MembershipSchema = new mongoose.Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    stripeId: { type: String, default: null },
    creationDate: {
      type: Date,
      required: true,
      default: null
    },
    lastEditDate: {
      type: Date,
      required: true,
      default: null
    },
    plans: [{
      type: Schema.Types.ObjectId,
      ref: "Plan",
      default: null
    }],
    name: {
      type: String,
      required: true,
      default: null
    },
    description: { type: String, required: true, default: null },
    status: { type: String, required: true, default: null },
    attributes: [{ type: String }],
  },
  {
    collection: "memberships"
  }
);

MembershipSchema.virtual("members", {
  ref: "Member",
  localField: "_id",
  foreignField: "membership.membershipId"
});

// MembershipSchema.virtual("plans", {
//   ref: "Plan",
//   localField: "_id",
//   foreignField: "membershipId",
// });

MembershipSchema.set('toObject', {
  virtuals: true,
  getters: true
});

MembershipSchema.set('toJson', {
  virtuals: true
});

mongoose.model("Membership", MembershipSchema);
