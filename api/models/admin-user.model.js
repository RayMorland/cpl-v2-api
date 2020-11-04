var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sharedSchems = require("./shared");

var AdminUserSchema = new mongoose.Schema({},
    {
      minimize: false,
    },
    {
      collection: "adminUsers",
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
  
  mongoose.model("AdminUser", AdminUserSchema);