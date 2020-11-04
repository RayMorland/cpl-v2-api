var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var addressSchema = new mongoose.Schema({
  street: { type: String, default: null },
  city: { type: String, default: null },
  province: { type: String, default: null },
  postal: { type: String, default: null },
  country: { type: String, default: null },
});

var locationSchema = new mongoose.Schema({
  name: { type: String, default: null },
  address: addressSchema,
});

var meetFeeSchema = new mongoose.Schema({
  type: { type: String },
  price: { type: Number },
});

var merchandiseSchema = new mongoose.Schema({
  item: { type: String },
  description: { type: String },
  price: { type: Number },
});

var timePeriodSchema = new mongoose.Schema({
  start: { type: Date, default: null },
  end: { type: Date, default: null },
});

module.exports = {
  addressSchema,
  locationSchema,
  meetFeeSchema,
  merchandiseSchema,
  timePeriodSchema,
};
