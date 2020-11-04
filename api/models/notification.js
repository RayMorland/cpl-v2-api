var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notificationSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    target: { type: String },
    userId: { type: String, unique: true },
    creationDate: { type: Date },
    lastEditDate: { type: Date },
    notifications: [
      {
        creationDate: { type: Date },
        lastEditDate: { type: Date },
        type: { type: String },
        content: {},
        url: { type: String },
        imageUrl: { type: String },
        title: { type: String },
        description: { type: String },
        icon: {type: String}
      }
    ]
  },
  {
    collection: "notifications"
  }
);

mongoose.model("Notification", notificationSchema);
