import mongoose from "mongoose";
import { ContactSchema } from "../models/Contact";

const Contact = mongoose.model("Contact", ContactSchema);

export const addContact = async (req, res) => {
  const {
    userId,
    contactId,
    firstName,
    lastName,
    mobile,
    birthday,
    status,
    frequency,
    relation,
  } = req.body;

  try {
    const contact = new Contact({
      userId,
      contactId,
      firstName,
      lastName,
      mobile,
      birthday,
      status,
      frequency,
      relation,
    });
    await contact.save();
    res.send({ contact });
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.send({ contacts });
};
