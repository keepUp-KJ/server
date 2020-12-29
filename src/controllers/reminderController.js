const mongoose = require("mongoose");
const { UserSchema } = require("../models/User");
const { ContactSchema } = require("../models/Contact");
const { ReminderSchema } = require("../models/Reminder");
const moment = require("moment");

const Reminder = mongoose.model("Reminder", ReminderSchema);
const User = mongoose.model("User", UserSchema);
const Contact = mongoose.model("Contact", ContactSchema);

exports.addReminder = async (req, res) => {
  const { userId, date, contacts, notify, occasion } = req.body;
  const user = await User.findOne({ _id: userId });
  const contact = await Contact.find({ _id: { $in: contacts } });
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

exports.getReminders = async (req, res) => {
  const userId = req.params.id;

  const reminders = await Reminder.find({ userId });

  res.send({ reminders });
};

exports.markCompleted = async (req, res) => {
  const reminderId = req.params.id;
  // const reminder = await Reminder.findById({ _id: reminderId });

  // if (reminder && reminder.occasion === null) {
  //   const contact = await Contact.findById({ _id: reminder.contacts[0] });
  // }

  await Reminder.updateOne({ _id: reminderId }, { $set: { completed: true } });
  res.send("Success");
};
