import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/User";

const User = mongoose.model("User", UserSchema);

export const signup = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.send({ error: "Email already registered" });
  }
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
      res.send(token);
    }
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.send({ error: "Invalid email" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "abcd1234");
    if (token) {
      res.send(token);
    }
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
};

export const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(422).send({ error: "You must have an account" });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, "abcd1234", async (err, payload) => {
    if (err) {
      return res.status(406).send({ error: "You must be logged in." });
    }

    const { userId } = payload;
    const user = await User.findById(userId);
    req.user = user;
    next();
  });
};
