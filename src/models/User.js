import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  settings: {
    birthdayReminder: {
      type: String,
      enum: ["On the same day", "One day before", "One week before", "None"],
    },
    callReminder: {
      type: String,
      enum: ["On the same day", "One day before", "One week before", "None"],
    },
    incompleteTaskReminder: {
      type: String,
      enum: ["On the same day", "One day before", "One week before", "None"],
    },
    birthdayNotification: Boolean,
    dailyCallNotification: Boolean,
    incompleteTaskNotification: Boolean,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (enteredPassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(enteredPassword, user.password, (err, matched) => {
      if (err) {
        return reject(err);
      }
      if (!matched) {
        return reject(false);
      }
      resolve(true);
    });
  });
};

mongoose.model("User", UserSchema);
