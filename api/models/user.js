var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema(
  {
    _id: { type: Schema.Types.ObjectId, required: true },
    creationDate: { type: Date, default: null },
    lastEditDate: { type: Date, default: null },
    status: { type: String, default: "inactive", required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      default: null,
    },
    name: {
      type: String,
    },
    userType: {
      type: String,
      required: true,
      default: null,
    },
    cognitoId: { type: String, default: null },
    typeId: {
      type: Schema.Types.ObjectId,
    },
    userProperties: {},
    notifications: {},
    permissions: [{
      type: String
    }]
  },
  {
    collection: "users",
  }
);

// userSchema.methods.setPassword = function (password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
// };

// userSchema.methods.validPassword = function (password) {
//     var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
//     return this.hash === hash;
// };

// userSchema.methods.generateJwt = function () {
//     var expiry = new Date();
//     expiry.setDate(expiry.getDate() + 7);

//     return jwt.sign({
//         _id: this._id,
//         email: this.email,
//         name: this.name,
//         exp: parseInt(expiry.getTime() / 1000),
//     }, "MY_SECRET");
// };

mongoose.model("User", userSchema);
