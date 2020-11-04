var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resultSchema = new mongoose.Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    creationDate: {
      type: Date,
      required: false,
      default: null,
    },
    lastEditDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
    registrationId: {
      type: Schema.Types.ObjectId,
      ref: "Registration",
      required: false,
      default: null
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "Member",
      required: false,
      default: null,
    },
    memberName: {
      type: String,
      required: false,
      default: '',
    },
    meetId: {
      type: Schema.Types.ObjectId,
      ref: "Meet",
      required: false,
      default: null,
    },
    meetTitle: {
      type: String,
      required: false,
      default: '',
    },
    resultDate: {
      type: Date,
      required: false,
      default: new Date(),
    },
    gender: { type: String, required: false, default: '' },
    testing: { type: String, required: false, default: '' },
    divisions: [{
      name: { type: String, required: false, default: '' },
      ageClass: { 
        min: {type: Number},
        max: {type: Number}
      }
    }],
    category: { type: String, required: false, default: '' },
    events: [{ type: String, required: false, default: '' }],
    weightClass: { type: String, required: false, default: '' },
    weightAtWeighIn: {
      type: Number,
      required: false,
      default: 0,
    },
    lifts: [{
      type: Schema.Types.ObjectId,
      ref: "Lift",
      required: false,
      default: null,
    }],
    total: { type: Number, required: false, default: 0 },
    totalRecord: { type: Boolean, required: false, default: false },
    totalRecordId: {
      type: Schema.Types.ObjectId,
      ref: "Record",
      required: false,
      default: null,
    },
    wilksScore: {
      type: Number,
      required: false,
      default: 0
    }
  },
  {
    collection: "results",
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

mongoose.model("Result", resultSchema);
