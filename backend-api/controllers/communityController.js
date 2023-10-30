import Community from "../models/CommunityModel.js";
import User from "../models/userModel.js";
import news from "../models/NewsModel.js";

import randomstring from "randomstring";

// Function to create a new community
async function createCommunity(req, res) {
  const { communityName, desc, locationObj, userId } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
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
      hubLocation: {
        type: "Point",
        coordinates: [
          parseFloat(locationObj.long),
          parseFloat(locationObj.lat),
        ],
      },
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
async function getCommunityPosts(req, res) {
  const communityId = req.params.communityId;

  try {
    // Find all posts with the specified community attribute
    const posts = await news.find({ community: communityId });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error("Error fetching community posts:", error);
    return res.status(500).json({ error: "Failed to fetch community posts." });
  }
}

export { getCommunityPosts };

async function getCommunity(req, res) {
  console.log("Getting Community");
  const communityId = req.params.id;
  console.log(communityId);

  try {
    // Find the community by ID
    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: "Community not found." });
    }

    return res.status(200).json({ community });
  } catch (error) {
    console.error("Error fetching community:", error);
    return res.status(500).json({ error: "Failed to fetch community." });
  }
}

export { createCommunity, joinCommunity, getCommunity };
