const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Int32 } = require("mongodb");

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
  pushToken: {
    type: String,
    default: null,
  },
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  mobile: {
    type: String,
    default: null,
  },
  code: {
    type: String,
  },
  token: {
    type: String,
  },
  codeExpires: {
    type: Date,
    default: () => new Date(+new Date() + 3 * 60 * 1000),
  },
  settings: {
    general: {
      reminderAt: {
        type: String,
        default: "17:00",
      },
      weeklyReminder: {
        type: Number,
        default: 0,
      },
      monthlyReminder: {
        type: Number,
        default: 1,
      },
    },
    notifications: {
      dailyCalls: {
        type: Boolean,
        default: false,
      },
      weeklyCalls: {
        type: Boolean,
        default: true,
      },
      monthlyCalls: {
        type: Boolean,
        default: true,
      },
      incompleteTask: {
        type: Boolean,
        default: true,
      },
    },
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
