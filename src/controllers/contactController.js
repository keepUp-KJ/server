import { use } from "bcrypt/promises";
import mongoose from "mongoose";
import { ContactSchema } from "../models/Contact";

const Contact = mongoose.model("Contact", ContactSchema);

export const addContact = async (req, res) => {
  const { userId, contacts } = req.body;

  console.log(contacts);

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
    } catch (err) {
      return res.status(406).send({ error: err.message });
    }
  }

  res.send({ response: "Success" });
};

export const getContacts = async (req, res) => {
  const id = req.params.id;

  const contacts = await Contact.find({ userId: id });
  res.send({ contacts });
};

export const editContact = async (req, res) => {
  const { contactId, frequency, relation } = req.body;

  await Contact.updateOne(
    { _id: contactId },
    { $set: { frequency, relation } }
  );
  res.send({ response: "Success" });
};
