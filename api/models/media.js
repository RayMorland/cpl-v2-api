var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var mediaSchema = new mongoose.Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  creationDate: {
    type: Date,
    required: true
  },
  lastEditDate: {
    type: Date,
    required: true
  },
  url: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  }
}, {
  collection: 'media'
});

mongoose.model('Media', mediaSchema);
