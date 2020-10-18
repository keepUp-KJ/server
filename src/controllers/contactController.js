import mongoose from "mongoose";
import { ContactSchema } from "../models/Contact";

const Contact = mongoose.model("Contact", ContactSchema);

export const addContact = async (req, res) => {
  const {
    userId,
    first_name,
    last_name,
    mobile,
    birthday,
    status,
    frequency,
    relation,
  } = req.body;

  try {
    const contact = new Contact({
      userId,
      first_name,
      last_name,
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
  const { userId } = req.body;

  const contacts = await Contact.find({ userId });
  res.send(contacts);
};
