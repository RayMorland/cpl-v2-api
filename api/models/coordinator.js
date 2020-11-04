var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sharedSchems = require("./shared");

var CoordinatorSchema = new mongoose.Schema(
  {
    _id: { 
        type: Schema.Types.ObjectId,
        required: true,
        default: null
    },
    status: { type: String,
        required: true,
        default: 'inactive' },
    userId: {
      type: String,
      // ref: 'User',
      required: true,
      default: null,
    },
    stripeId: { type: String, required: false, default: null },
    cognitoId: { type: String, required: false, default: null },
    email: { type: String, required: true, default: null, unique: true },
    name: { type: String,
        required: true,
        default: null },
    phone: { type: String,
        default: null },
    creationDate: {
      type: Date,
      required: true,
      default: null
    },
    lastEditDate: {
      type: Date,
      required: true,
      default: null
    },
    coordinatorLogo: { type: String, default: null },
    hq: sharedSchems.addressSchema,
    profile: { type: Object, default: null },
    settings: { type: Object, default: null },
  },
  {
    minimize: false,
  },
  {
    collection: "coordinators",
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

CoordinatorSchema.set("toObject", { virtuals: true });
CoordinatorSchema.set("toJSON", { virtuals: true });

CoordinatorSchema.virtual("meets", {
  ref: "Meet",
  localField: "_id",
  foreignField: "coordinator._id",
});

mongoose.model("Coordinator", CoordinatorSchema);
