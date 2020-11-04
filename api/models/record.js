var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recordSchema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId },
  creationDate: {
    type: Date,
    required: true
  },
  lastEditDate: {
    type: Date,
    required: true
  },
  recordDate: {
    type: Date
  },
  overthrownDate: {
    type: Date
  },
  currentRecord: {
    type: Boolean
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: 'Member'
  },
  memberName: {
    type: String
  },
  meetId: {
      type: Schema.Types.ObjectId
  },
  resultId: {
    type: Schema.Types.ObjectId,
    ref: 'Result'
  }, 
  liftId: {
    type: Schema.Types.ObjectId,
    ref: 'Lift'
  },
  division: {
    name: { type: String },
    ageClass: {
      min: { type: Number },
      max: { type: Number }
    },
  },
  category: {
    type: String
  },
  testing: {
    type: String
  },
  gender: {
    type: String
  },
  weightClass: {
    type: String
  },
  event: {
    type: String
  },
  liftType: {
    type: String
  },
  weight: {
    type: Number
  },
  nationalRecord: {
    isNationalRecord: { type: Boolean, default: false }
  },
  provincialRecord: {
    isProvincialRecord: { type: Boolean, default: false },
    province: { type: String }
  }
}, {
    collection: 'records'
  });

mongoose.model('Record', recordSchema);