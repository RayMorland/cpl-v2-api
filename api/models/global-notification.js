var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var globalNotificationSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    target: { type: String },
    creationDate: { type: Date },
    lastEditDate: { type: Date },
    type: { type: String },
    content: {},
    url: { type: String },
    imageUrl: { type: String },
    title: { type: String },
    description: { type: String }
  },
  {
    collection: "globalNotificaitons"
  }
);

mongoose.model("GlobalNotification", globalNotificationSchema);
