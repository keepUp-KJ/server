const mongoose = require("mongoose");
const { ContactSchema } = require("../models/Contact");
const { ReminderSchema } = require("../models/Reminder");
const moment = require("moment");

const Contact = mongoose.model("Contact", ContactSchema);
const Reminder = mongoose.model("Reminder", ReminderSchema);

exports.setupAccount = async (req, res) => {
  const { userId, contacts } = req.body;

  for (var i = 0; i < contacts.length; i++) {
    try {
      if (contacts[i].isAccepted) {
        const c = new Contact({
          userId,
          info: contacts[i].info,
          isAccepted: contacts[i].isAccepted,
          isRejected: contacts[i].isRejected,
          frequency: contacts[i].frequency,
        });
        c.save();

        const reminder = new Reminder({
          userId,
          date:
            contacts[i].frequency === "weekly"
              ? moment()
                  .day(5 + 7)
                  .format("MMM DD, YYYY")
              : contacts[i].frequency === "monthly"
              ? moment().add(1, "month").startOf("month").format("MMM DD, YYYY")
              : moment().format("MMM DD, YYYY"),
          contacts: [
            {
              info: contacts[i].info,
            },
          ],
          occasion: null,
          completed: false,
        });
        reminder.save();
      } else {
        const c = new Contact({
          userId,
          info: contacts[i].info,
          isAccepted: contacts[i].isAccepted,
          isRejected: contacts[i].isRejected,
        });
        c.save();
      }
    } catch (err) {
      return res.status(406).send({ error: err.message });
    }
  }

  res.send({ response: "Success" });
};

exports.getContacts = async (req, res) => {
  const id = req.params.id;

  const contacts = await Contact.find({ userId: id });
  res.send({ contacts });
};

exports.editContact = async (req, res) => {
  const { contactId, frequency } = req.body;

  await Contact.updateOne({ _id: contactId }, { $set: { frequency } });

  //Update contact reminder
  // --> On the same day (date)
  // --> One day before (date - 1)
  // --> One week before (date - 7)

  res.send({ response: "Success" });
};

exports.acceptContact = async (req, res) => {
  const { userId, contact, frequency } = req.body;

  try {
    const c = new Contact({
      userId,
      info: contact.info,
      isAccepted: true,
      isRejected: false,
      frequency: frequency,
    });
    c.save();

    const reminder = new Reminder({
      userId,
      date:
        frequency === "weekly"
          ? moment().add(7, "days").format("MMM DD, YYYY")
          : frequency === "monthly"
          ? moment().add(30, "days").format("MMM DD, YYYY")
          : moment().format("MMM DD, YYYY"),
      contacts: [{ info: contact.info }],
      occasion: null,
      completed: false,
    });
    reminder.save();
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
  res.send({ response: "Success" });
};

exports.rejectContact = async (req, res) => {
  const { userId, contact } = req.body;

  try {
    const c = new Contact({
      userId,
      info: contact.info,
      isAccepted: false,
      isRejected: true,
    });
    c.save();
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
  res.send({ response: "Success" });
};
