var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var leagueSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    creationDate: { type: Date, default: null },
    lastEditDate: { type: Date, default: null  },
    description: { type: String, default: null },
    status: { type: String, default: 'inactive'  },
    phone: {
      type: String, default: null 
    },
    email: {
      type: String, default: null 
    },
    genders: [
      {
        name: { type: String },
        weightClasses: [
          {
            name: {
              type: String,
            },
            weightRange: {
              min: { type: Number },
              max: { type: Number }
            },
          },
        ],
      }
    ],
    divisions: [
      {
        name: {
          type: String,
        },
        ageClasses: [
          {
            min: { type: Number },
            max: { type: Number }
          },
        ],
      },
    ],
    tests: [
      {
        type: { type: String },
        price: { type: Number },
      },
    ],
    categories: [
      {
        type: String,
      },
    ],
    events: [
      {
        type: { type: String },
        price: { type: Number },
        movements: []
      },
    ],
    movements: [
      {
        type: String
      }
    ],
    recordCertificate: {
      price: { type: Number },
    },
    officials: [
      {
        type: { type: String },
        name: { type: String },
      },
    ],
  },
  {
    collection: "leagues",
  }
);

mongoose.model("League", leagueSchema);
