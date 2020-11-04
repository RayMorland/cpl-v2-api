var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var attemptSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId },
  weight: { type: Number },
  success: { type: Boolean },
  liftId: {
    type: Schema.Types.ObjectId,
    ref: "Lift",
    required: false,
    default: null,
  },
  resultId: {
    type: Schema.Types.ObjectId,
    ref: "Result",
    required: false,
    default: null,
  },
  recordId: {
    type: Schema.Types.ObjectId,
    ref: "Record",
    required: false,
    default: null,
  },
},
{
  collection: "attempts",
},
{
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

mongoose.model("Attempt", attemptSchema);