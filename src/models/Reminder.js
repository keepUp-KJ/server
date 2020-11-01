import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReminderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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
  occasion: {
    type: String,
  },
  completed: {
    type: Boolean,
  },
});
mongoose.model("Reminder", ReminderSchema);
