import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: String,
  mobile: {
    type: String,
    required: true,
  },
  birthday: Date,
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending"],
    required: true,
  },
  frequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
    required: true,
  },
  relation: {
    type: String,
  },
});

mongoose.model("Contact", ContactSchema);
