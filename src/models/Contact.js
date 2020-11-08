import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  contactId: {
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
  birthday: { type: Date },
  status: {
    type: String,
    enum: ["Accepted", "Rejected"],
    required: true,
  },
  frequency: {
    type: String,
    enum: ["Daily", "Weekly", "Monthly", "Yearly"],
  },
  relation: {
    type: String,
  },
});

mongoose.model("Contact", ContactSchema);
