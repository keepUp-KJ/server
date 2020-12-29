const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  info: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
    mobile: {
      type: String,
      required: true,
    },
    // birthday: { type: Date },
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
  notify: {
    type: String,
    enum: ["On the same day", "One day before", "One week before", "None"],
  },
  // relation: {
  //   type: String,
  // },
});

mongoose.model("Contact", ContactSchema);
