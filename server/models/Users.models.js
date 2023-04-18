import { Schema, model } from "mongoose";
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new Schema({
  photo: { type: String },
  firstName: {
    type: String,
    required: [true, "Please provide your First Name"],
    minlength: 1,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your Last Name"],
    minlength: 1,
  },
  email: {
    unique: [true, "this email exists in the system try other"],
    required: [true, "Please provide your Email Address"],
    type: String,
    validate: [validator.isEmail, "Please provide a valid email Address"],
    lowercase: true,
  },
  phone: {
    type: String,
    unique: [true, "this phone already in use please provide other"],
    required: [true, "Please provide your phone Number"],
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female"],
      message: "{VALUE} is not supported",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide your Password"],
    minlength: [8, "Password too short, Password should be more than 8 char"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please provide your Password Confirm"],
    validate: {
      validator: function (passCon) {
        return passCon === this.password;
      },
      message: `The password you entered is not the same`,
    },
  },
  role: {
    type: String,
    enum: ["standard", "business", "admin"],
    default: "standard",
  },

  // this part is for Making the forgot password controller
  //   passwordResetToken: { type: String },
  //   passwordResetExpires: { type: Date },

  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//pre is built in mongoose Middleware!
// hashing the password failed before saving in the db and removing the confirm field
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  next();
});

//Only getting the active users in the find query
UserSchema.pre(/^find/, function (next) {
  //this points to the current query, which starts with find
  this.find({ active: true });
  next();
});

// a mothod for comparing the passwords
UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//Creating a Password reset token using built in crypto
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export const User = model("User", UserSchema);
