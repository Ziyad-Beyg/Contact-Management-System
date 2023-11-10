import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter the username!"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email!"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password!"],
  },
});

export const UserModel = mongoose.model("Users", userSchema);
