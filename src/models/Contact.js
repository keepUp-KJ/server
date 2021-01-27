const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    required: true,
  },
  isRejected: {
    type: Boolean,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
  },
  // relation: {
  //   type: String,
  // },
});

mongoose.model("Contact", ContactSchema);
