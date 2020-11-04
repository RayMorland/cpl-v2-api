const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoordinatorApplicationSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  creationDate: {
    type: Date,
    required: true
  },
  lastEditDate: {
    type: Date,
    required: true
  },
  status: {
    type: String
  },
  coordinator: {
    type: String
    // type: Schema.Types.ObjectId,
    // ref: 'Coordinator'
  }
}, {
    minimize: false
  }, {
    collection: 'applications'
  }, {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  });

mongoose.model('CoordinatorApplication', CoordinatorApplicationSchema);