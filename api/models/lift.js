var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var liftSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId },
    status: { type: String, required: false, default: null },
    memberId: { type: String, required: false, default: null },
    meetId: { type: String, required: false, default: null },
    gender: { type: String, required: false, default: null },
    testing: { type: String, required: false, default: null },
    category: { type: String, required: false, default: null },
    events: [{ type: String, required: false, default: null }],
    divisions: [{
        name: { type: String, required: false, default: null },
        ageClass: { 
          min: {type: Number},
          max: {type: Number}
        }
      }],
    weightClass: { type: String },
    liftType: { type: String, required: false, default: null },
    rackPosition: { type: String, required: false, default: null },
    rackHeight: { type: Number, required: false, default: null },
    startingWeight: { type: Number, required: false, default: null },
    attempt1: {
        type: Schema.Types.ObjectId,
        ref: "Attempt",
        required: true,
        default: null,
      },
    attempt2: {
        type: Schema.Types.ObjectId,
        ref: "Attempt",
        required: true,
        default: null,
      },
    attempt3: {
        type: Schema.Types.ObjectId,
        ref: "Attempt",
        required: true,
        default: null,
      },
    highestWeight: { type: Number, required: false, default: null },
    isRecord: { type: Boolean },
    records: [{
      type: Schema.Types.ObjectId,
      ref: "Record",
      required: false,
      default: null,
    }],
    resultId: {
      type: Schema.Types.ObjectId,
      ref: "Result",
      required: false,
      default: null,
    },
  },
  {
    collection: "lifts",
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  });

  mongoose.model("Lift", liftSchema);