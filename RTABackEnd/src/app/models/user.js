const mongoose = require("../../database");
const bcrypt = require("bcryptjs");

// Const used to make our User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  passwordResetToken: {
    type: String,
    // Attribute to security
    select: false
  },
  passwordResetExpires: {
    type: Date,
    // Attribute to security
    select: false
  },
  password: {
    type: String,
    required: true,
    // Attribute to security
    select: false
  },
  createdAt: {
    type: String,
    default: new Date()
  }
});

/**
 * Function transform the password in hash to
 * persist in database, that runs before save.
 */
UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

// Const used to define our Schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
