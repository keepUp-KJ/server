import mongoose from "mongoose";
import { ContactSchema } from "../models/Contact";

const Contact = mongoose.model("Contact", ContactSchema);

export const addContact = async (req, res) => {
  const {
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
    res.status(406).send({ error: err.message });
  }
};
