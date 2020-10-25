import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/User";

const User = mongoose.model("User", UserSchema);

export const signup = async (req, res) => {
  const { email, password, confPassword } = req.body;

  const errors = { email: [], password: [], confPassword: [] };
  const user = await User.findOne({ email });

  if (user) {
    errors.email.push("User already exists");
  }
  try {
    //Password Validation
    if (!password) {
      errors.password.push("Enter password");
    } else {
      if (password.length < 6) {
        errors.password.push("Password must be at least 6 characters");
      }
    }

    if (!confPassword) {
      errors.confPassword.push("Enter password confirmation");
    } else {
      if (password !== confPassword) {
        errors.confPassword.push("Password does not match");
      }
    }

    //Email Validation
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email.push("Please provide a valid mail");
    }

    if (
      errors.email.length ||
      errors.password.length ||
      errors.confPassword.length
    ) {
      return res.status(406).send({ errors });
    }

    const user = new User({
      email,
      password,
      settings: {
        birthdayReminder: "On the same day",
        callReminder: "On the same day",
        incompleteTaskReminder: "On the same day",
        birthdayNotification: true,
        dailyCallNotification: true,
        incompleteTaskNotification: true,
      },
    });
    await user.save();
    res.send({ user });
  } catch (err) {
    return res.status(406).send({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(406).send({ error: "Invalid email or password" });
  }
  try {
    await user.comparePassword(password);
    // const token = jwt.sign({ userId: user._id }, "abcd1234");
    if (user) {
      res.send(user);
    }
  } catch (err) {
    return res.status(406).send({ error: "Invalid username or password" });
  }
};

export const verifyEmail = async (req, res) => {
  const { email } = req.body;
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

export const updateSettings = async (req, res) => {
  const userId = req.params.id;
  const {
    birthdayReminder,
    callReminder,
    incompleteTaskReminder,
    birthdayNotification,
    dailyCallNotification,
    incompleteTaskNotification,
  } = req.body;

  const updatedSettings = {
    birthdayReminder,
    callReminder,
    incompleteTaskReminder,
    birthdayNotification,
    dailyCallNotification,
    incompleteTaskNotification,
  };

  if (
    birthdayReminder != null &&
    callReminder != null &&
    incompleteTaskReminder != null &&
    birthdayNotification != null &&
    dailyCallNotification != null &&
    incompleteTaskNotification != null
  ) {
    const user = await User.update(
      { _id: userId },
      { $set: { settings: updatedSettings } }
    );
    user.save;
    res.send(user);
  } else return res.send({ error: "Fields can't be empty" });
};
