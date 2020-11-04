var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var sharedSchemas = require("./shared");

var MeetSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
    },
    coordinator: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "Coordinator",
        default: null,
        required: true,
      },
      name: {
        type: String,
        default: null,
      },
      stripeId: { type: String, default: null },
    },
    application: {
      status: { type: String, required: true, default: "request" },
      meetFeePaid: { type: Boolean, required: true, default: false },
    },
    status: {
      type: String,
      default: "inactive",
      required: true,
    },
    creationDate: {
      type: Date,
      default: null,
      required: true,
    },
    lastEditDate: {
      type: Date,
      default: null,
      required: true,
    },
    releaseDate: {
      type: Date,
      default: null,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Meet title is required."],
      minlength: 2,
      maxlength: 50,
      unique: true,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    images: [
      {
        type: String,
        default: null,
      },
    ],
    dates: [sharedSchemas.timePeriodSchema],
    weighInInfo: {
      info: { type: String, default: null },
      link: { type: String, default: null },
      times: sharedSchemas.timePeriodSchema,
      location: sharedSchemas.locationSchema,
    },
    eventInfo: {
      categories: [
        {
          type: String,
          default: null,
        },
      ],
      events: [
        {
          type: { type: String, default: null },
          price: { type: Number, default: null },
          movements: [{ type: String }]
        },
      ],
      testing: [
        {
          type: { type: String, default: null },
          price: { type: Number, default: null },
        },
      ],
    },
    venue: {
      info: { type: String, default: null },
      link: { type: String, default: null },
      location: sharedSchemas.locationSchema,
    },
    accommodation: {
      info: { type: String, default: null },
      link: { type: String, default: null },
      location: sharedSchemas.locationSchema,
    },
    registrationFormLink: { type: String, default: null },
    capacity: { type: Number, default: null },
    registrationClosingDate: { type: Date, default: null },
    registrationClosed: { type: Boolean, default: true },
    additionalInfo: { type: String, default: null },
    resultsDocumentUrl: { type: String, default: null },
    tags: [
      {
        type: String,
        default: null,
      },
    ],
    merchandise: [sharedSchemas.merchandiseSchema],
    fees: [sharedSchemas.meetFeeSchema],
  },
  {
    minimize: false,
  },
  {
    collection: "meets",
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

MeetSchema.virtual("registrations", {
  ref: "Registration",
  localField: "_id",
  foreignField: "meetId",
});

MeetSchema.virtual("numOfRegistrations", {
  ref: "Registration",
  localField: "_id",
  foreignField: "meetId",
  count: true,
});

MeetSchema.virtual("results", {
  ref: "Result",
  localField: "_id",
  foreignField: "meetId",
});

mongoose.model("Meet", MeetSchema);
