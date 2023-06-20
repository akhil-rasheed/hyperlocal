import * as mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  communityName: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    maxlength: 300,
  },
  tags: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.new,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hubLocation: {
    type: { type: String, required: true },
    coordinates: [],
  },
  joinCode: { type: String, required: true },
  bannerUrl: { type: String, required: false },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});
communitySchema.index({ hubLocation: "2dsphere" });
export default mongoose.model("Community", communitySchema, "Community");
