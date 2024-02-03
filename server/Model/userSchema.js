const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

// //hash password
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    this.password = await bcrypt.hash(user.password, 10);
    this.cpassword = await bcrypt.hash(user.cpassword, 10);
  }

  next();
});

const userdb = mongoose.model("users", userSchema);
module.exports = userdb;
