import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/User";

const User = mongoose.model("User", UserSchema);

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.send({ error: "Please provide data required" });
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.send({ error: "Please provide a valid mail" });
    }

    if (password.length < 6) {
      return res.send({ error: "Password must be at least 6 characters" });
    }

    const user = new User({
      email,
      password,
    });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "abcd1234");
    if (token) {
      res.send(JSON.stringify(token));
    }
  } catch (err) {
    return res.send({ error: "User already exists" });
  }
};
