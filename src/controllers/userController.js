import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserSchema } from "../models/User";
import sendEmail from "send-email";
import dotenv from "dotenv";
dotenv.config();

const User = mongoose.model("User", UserSchema);

export const signup = async (req, res) => {
  const { email, password, confPassword } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000);
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
      code,
    });
    await user.save();

    sendEmail({
      to: user.email,
      subject: "Please confirm your email address",
      html: `<div>
          <h2>Hi there!</h2>
          <h3>Thanks for joining KeepUp. To finish registration, please enter the code below to verify your account</h3>
          <h3>${code}</h3>
        </div>`,
      from: "keep.up.kj.usytech@gmail.com",
    });

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
  if (!user.isVerified) {
    return res
      .status(406)
      .send({ error: "User not verified - Please verify your email" });
  }
  try {
    await user.comparePassword(password);
    // const token = jwt.sign({ userId: user._id }, "abcd1234");
    res.send({ user });
  } catch (err) {
    return res.status(406).send({ error: "Invalid username or password" });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  User.findOne({ email }, function (err, user) {
    if (!user) {
      return res
        .status(406)
        .send({ error: "Unable to find user with this email" });
    }
    if (code !== user.code) {
      return res.status(406).send({ error: "Wrong code entered" });
    }
    user.isVerified = true;
    user.save();
    res.send({ response: "Success!" });
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(1000 + Math.random() * 9000);

  sendEmail({
    to: email,
    subject: "Please confirm your email address",
    html: `<div>
        <h2>Hi there!</h2>
        <h3>Thanks for joining KeepUp. To change password, please enter the code below to verify your email</h3>
        <h3>${code}</h3>
      </div>`,
    from: "keep.up.kj.usytech@gmail.com",
  });

  const user = User.find({ email });
  if (!user)
    return res
      .status(406)
      .send({ error: "Email not registered on the system" });

  await User.updateOne({ email }, { $set: { code } });

  res.send({ response: "Success" });
};

export const renewPassword = async (req, res) => {
  const { email, password, confPassword } = req.body;

  const user = await User.findOne({ email });

  if (!password) return res.status(406).send({ error: "Enter password" });
  else if (password.length < 6)
    return res
      .status(406)
      .send({ error: "Password must be at least 6 characters" });

  if (!confPassword)
    return res.status(406).send({ error: "Enter password confirmation" });
  else if (password !== confPassword)
    return res.status(406).send({ error: "Password does not match" });

  await User.updateOne({ email }, { $set: { password } });
  await user.save();

  res.send({ response: "Password renewed successfully!" });
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
  const { settings } = req.body;

  if (
    settings.birthdayReminder != null &&
    settings.callReminder != null &&
    settings.incompleteTaskReminder != null &&
    settings.birthdayNotification != null &&
    settings.dailyCallNotification != null &&
    settings.incompleteTaskNotification != null
  ) {
    await User.updateOne({ _id: userId }, { $set: { settings } });
    res.send({ response: "Success" });
  } else return res.send({ error: "Fields can't be empty" });
};

export const getUserSettings = async (req, res) => {
  const { userId } = req.params.id;
  const userSettings = await User.findOne(
    {
      userId,
    },
    { settings: 1, _id: 0 }
  );
  res.send(userSettings);
};
