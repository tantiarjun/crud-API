import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },

  email: {
    type: String,
    requried: true,
  },

  phone: {
    type: Number,
    requried: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
});

export const userModel = mongoose.model("usertest", userSchema);
