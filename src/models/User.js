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
  isVerified: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
  },
  codeExpires: {
    type: Date,
    default: () => new Date(+new Date() + 3 * 60 * 1000),
  },
  settings: {
    birthdayReminder: {
      type: String,
      enum: ["On the same day", "One day before", "One week before", "None"],
      default: "On the same day",
    },
    callReminder: {
      type: String,
      enum: ["On the same day", "One day before", "One week before", "None"],
      default: "On the same day",
    },
    incompleteTaskReminder: {
      type: String,
      enum: ["On the same day", "One day before", "One week before", "None"],
      default: "On the same day",
    },
    birthdayNotification: { type: Boolean, default: false },
    dailyCallNotification: { type: Boolean, default: false },
    incompleteTaskNotification: { type: Boolean, default: false },
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

UserSchema.index(
  { codeExpires: 1 },
  { expireAfterSeconds: 0, partialFilterExpression: { isVerified: false } }
);

mongoose.model("User", UserSchema);
