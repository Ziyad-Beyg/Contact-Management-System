import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email"],
    },
    phone: {
      type: Number,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

export const ContactModel = mongoose.model("Contacts", ContactSchema);
