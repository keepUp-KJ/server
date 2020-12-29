const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  contacts: {
    type: Array,
    required: true,
  },
  notify: {
    type: String,
    enum: ["On the same day", "One day before", "One week before", "None"],
  },
  // notifyOn: {},
  occasion: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});

mongoose.model("Reminder", ReminderSchema);
