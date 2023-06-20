import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  email: { type: String, unique: true },
  name: String,
  emailVerified: Date,
  image: String,
  hashedPassword: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User = mongoose.model("User", userSchema, "User");

export default User;
