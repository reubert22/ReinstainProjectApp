const mongoose = require("../database");

const bcrypt = require("bcryptjs");

/**
 * Our user schema
 */
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
  password: {
    type: String,
    required: true,
    select: false // attrib to security
  },
  createdAt: {
    type: String,
    default: Date.now
  }
});

/**
 * Transform the password in hash to persist
 * in database, that runs before save.
 */
UserSchema.pre("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

/**
 * Defining our model
 */
const User = mongoose.model("User", UserSchema);

module.exports = User;
