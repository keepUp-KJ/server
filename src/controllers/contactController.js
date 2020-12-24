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
      const c = new Contact({
        userId,
        contactId: contacts[i].contact.id,
        firstName: contacts[i].contact.firstName,
        lastName: contacts[i].contact.lastName,
        // mobile: contacts[i].contact.phoneNumbers[0].number,
        status: "Accepted",
        frequency: contacts[i].frequency,
      });
      c.save();

      const reminder = new Reminder({
        userId,
        date:
          contacts[i].frequency === "weekly"
            ? moment().add(7, "days").format("MMM DD, YYYY")
            : contacts[i].frequency === "monthly"
            ? moment().add(30, "days").format("MMM DD, YYYY")
            : moment().format("MMM DD, YYYY"),
        contacts: [
          {
            id: contacts[i].contact.id,
            firstName: contacts[i].contact.firstName,
            lastName: contacts[i].contact.lastName,
          },
        ],
        notify: "On the same day",
        occasion: null,
        completed: false,
      });
      reminder.save();
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
  const { contactId, frequency, relation } = req.body;

  await Contact.updateOne(
    { _id: contactId },
    { $set: { frequency, relation } }
  );
  res.send({ response: "Success" });
};
