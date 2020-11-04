var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    required: true
  },
  releaseDate: {
    type: Date,
    // required: true
  },
  lastEditDate: {
    type: Date,
    required: true
  },
  author: {
    type: String
  },
  title: {
    type: String,
    // required: true
  },
  subtitle: {
    type: String
  },
  description: {
    type: String
  },
  content: {
    type: String,
    // required: true
  },
  imagePath: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    // required: true
  }
}, {
    collection: 'news'
  });

mongoose.model('News', newsSchema);
