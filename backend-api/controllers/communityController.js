import Community from "../models/CommunityModel.js";
import User from "../models/userModel.js";
import randomstring from "randomstring";

// Function to create a new community
async function createCommunity(req, res) {
  const { communityName, desc, tags, hubLocation, userId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const joinCode = randomstring.generate({
      length: 6,
      charset: "alphabetic",
      capitalization: "lowercase",
    });

    // Create the community
    const community = new Community({
      communityName,
      desc,
      tags,
      hubLocation,
      joinCode,
      creatorId: userId,
      users: [userId],
    });

    // Save the community
    await community.save();

    // Add the community to the user's list of communities
    user.communities.push(community._id);
    await user.save();

    return res.status(201).json({ community });
  } catch (error) {
    console.error("Error creating community:", error);
    return res.status(500).json({ error: "Failed to create community." });
  }
}

// Function to join a community
async function joinCommunity(req, res) {
  const { joinCode, userId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Find the community with the provided join code
    const community = await Community.findOne({ joinCode });
    if (!community) {
      return res.status(404).json({ error: "Community not found." });
    }

    // Add the user to the community
    community.users.push(userId);
    await community.save();

    // Add the community to the user's list of communities
    user.communities.push(community._id);
    await user.save();

    return res.status(200).json({ community });
  } catch (error) {
    console.error("Error joining community:", error);
    return res.status(500).json({ error: "Failed to join community." });
  }
}

export { createCommunity, joinCommunity };
