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
          info: {
            id: contacts[i].info.id,
            firstName: contacts[i].info.firstName,
            lastName: contacts[i].info.lastName,
            mobile: contacts[i].info.phoneNumbers[0].number,
          },
          isAccepted: contacts[i].isAccepted,
          isRejected: contacts[i].isRejected,
          frequency: contacts[i].frequency,
          notify: contacts[i].notify,
        });
        c.save();
      } else {
        const c = new Contact({
          userId,
          info: {
            id: contacts[i].info.id,
            firstName: contacts[i].info.firstName,
            lastName: contacts[i].info.lastName,
            mobile: contacts[i].info.phoneNumbers[0].number,
          },
          isAccepted: contacts[i].isAccepted,
          isRejected: contacts[i].isRejected,
        });
        c.save();
      }

      if (contacts[i].isAccepted) {
        const reminder = new Reminder({
          userId,
          date:
            contacts[i].frequency === "weekly"
              ? moment().add(7, "day").format("MMM DD, YYYY")
              : contacts[i].frequency === "monthly"
              ? moment().add(1, "month").format("MMM DD, YYYY")
              : moment().format("MMM DD, YYYY"),
          contacts: [
            {
              info: {
                id: contacts[i].info.id,
                firstName: contacts[i].info.firstName,
                lastName: contacts[i].info.lastName,
              },
            },
          ],
          notify: contacts[i].notify,
          occasion: null,
          completed: false,
        });
        reminder.save();
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
  const { contactId, frequency, notify } = req.body;

  await Contact.updateOne({ _id: contactId }, { $set: { frequency, notify } });

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
      info: {
        id: contact.info.id,
        firstName: contact.info.firstName,
        lastName: contact.info.lastName,
        mobile: contact.info.phoneNumbers[0].number,
      },
      isAccepted: true,
      isRejected: false,
      frequency: frequency,
      notify: "On the same day",
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
      contacts: [
        {
          info: {
            id: contact.info.id,
            firstName: contact.info.firstName,
            lastName: contact.info.lastName,
          },
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
  res.send({ response: "Success" });
};

exports.rejectContact = async (req, res) => {
  const { userId, contact } = req.body;

  try {
    const c = new Contact({
      userId,
      info: {
        id: contact.info.id,
        firstName: contact.info.firstName,
        lastName: contact.info.lastName,
        mobile: contact.info.phoneNumbers[0].number,
      },
      isAccepted: false,
      isRejected: true,
    });
    c.save();
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
  res.send({ response: "Success" });
};
