import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ReminderSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  contacts: {
    type: Array,
    required: true,
  },
  items: {
    type: String,
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
