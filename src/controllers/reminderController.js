const mongoose = require("mongoose");
const { UserSchema } = require("../models/User");
const { ReminderSchema } = require("../models/Reminder");
const moment = require("moment");

const Reminder = mongoose.model("Reminder", ReminderSchema);
const User = mongoose.model("User", UserSchema);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

exports.addReminder = async (req, res) => {
  const { userId, date, contacts, notify, occasion } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!occasion) {
    return res.status(406).send({ error: "Enter event title" });
  }

  var d = new Date(Date.parse(date));
  const reminderDate =
    months[d.getMonth()] +
    " " +
    ("0" + d.getDate()).slice(-2) +
    ", " +
    d.getFullYear();

  if (user && contacts) {
    try {
      const reminder = new Reminder({
        userId,
        date: reminderDate,
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
  const reminder = await Reminder.findById({ _id: reminderId });

  const notify = reminder.notify;

  if (reminder && reminder.occasion === null) {
    try {
      const contact = await Contact.findOne({
        "info.id": reminder.contacts[0].id,
      });
      today = moment().format("MMM DD, YYYY");
      if (contact.frequency === "daily") {
        today = moment().add(1, "day").format("MMM DD, YYYY");
      } else if (contact.frequency === "weekly") {
        today = moment().add(7, "day").format("MMM DD, YYYY");
      } else if (contact.frequency === "monthly") {
        today = moment().add(1, "month").format("MMM DD, YYYY");
      }

      await Reminder.updateOne({ _id: reminderId }, { $set: { date: today } });
    } catch (err) {
      return res.status(406).send({ error: err.message });
    }
  }

  res.send("Success");
};
