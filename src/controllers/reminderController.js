import mongoose from "mongoose";
import { ReminderSchema } from "../models/Reminder";
import { UserSchema } from "../models/User";
import { ContactSchema } from "../models/Contact";

const Reminder = mongoose.model("Reminder", ReminderSchema);
const User = mongoose.model("User", UserSchema);
const Contact = mongoose.model("Contact", ContactSchema);

export const addReminder = async (req, res) => {
  const { userId, date, contacts, notify, occasion } = req.body;
  const user = await User.findOne({ userId });
  const contact = await Contact.find({ conatcts });
  if (user && contact) {
    try {
      const reminder = new Reminder({
        userId,
        date,
        contacts,
        notify,
        occasion,
        completed: "false",
      });
      await reminder.save();
      res.send({ reminder });
    } catch (err) {
      return res.status(406).send({ error: err.message });
    }
  } else return res.send({ error: "User or contact not found" });
};

export const getReminders = async (req, res) => {
  const { userId } = req.body;

  const reminders = await Reminder.find({ userId });
  res.send(reminders);
};
