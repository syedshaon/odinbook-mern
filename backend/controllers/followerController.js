const User = require("../models/userModel");

const followerController = {
  async follow(req, res, next) {
    const user = req.user;
    const followingId = req.params.followingId;

    const searchedUser = await User.findById(followingId);
    if (!searchedUser) {
      return res.status(400).json({ message: "The Person you are trying to follow doesn't exist." });
    }
    try {
      // Check if the follower is not already in the followers list
      if (!searchedUser.followers.includes(user._id)) {
        // Update the followers array
        searchedUser.followers.push(user._id);
        user.following.push(searchedUser._id);

        // Save the updated searchedUser
        await user.save();
        await searchedUser.save();

        return res.status(200).json({ message: "Added as follower successfully" });
      } else {
        return res.status(400).json({ message: "You are already a follower" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async unfollow(req, res, next) {
    const user = req.user;
    const unfollowingId = req.params.unfollowingId;

    try {
      // Find the user to unfollow
      const searchedUser = await User.findById(unfollowingId);

      if (!searchedUser) {
        return res.status(400).json({ message: "The person you are trying to unfollow doesn't exist." });
      }

      // Check if the user is in the followers list
      if (searchedUser.followers.includes(user._id)) {
        // Remove the user from the followers array
        searchedUser.followers = searchedUser.followers.filter((followerId) => followerId.toString() !== user._id.toString());
        user.following = user.following.filter((followingId) => followingId.toString() !== searchedUser._id.toString());

        // Save the updated searchedUser
        await user.save();
        await searchedUser.save();

        return res.status(200).json({ message: "Unfollowed successfully" });
      } else {
        return res.status(400).json({ message: "You are not following this user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async sendFriendRequest(req, res, next) {
    const user = req.user;
    const { friendId } = req.params;
    const searchedUser = await User.findById(friendId);
    if (!searchedUser) {
      return res.status(400).json({ message: "The Person you are trying to add as friend doesn't exist." });
    }

    try {
      // Check if the friend is not already in the pendingFriends or friends list
      if (!searchedUser.pendingFriends.includes(user._id) && !searchedUser.friends.includes(user._id)) {
        // Add the friend to the pendingFriends list
        searchedUser.pendingFriends.push(user._id);

        // Save the updated searchedUser
        await searchedUser.save();

        return res.status(200).json({ message: "Friend request sent successfully" });
      } else {
        return res.status(400).json({ message: "Friend request already sent or already friends" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async cancelFriendRequest(req, res, next) {
    const user = req.user;
    const { friendId } = req.params;
    const searchedUser = await User.findById(friendId);
    if (!searchedUser) {
      return res.status(400).json({ message: "The userId you mentioned doesn't exist." });
    }

    try {
      // Check if the friend is not already in the pendingFriends or friends list
      if (searchedUser.pendingFriends.includes(user._id)) {
        // Add the friend to the pendingFriends list
        searchedUser.pendingFriends = searchedUser.pendingFriends.filter((id) => id.toString() !== user._id.toString());

        // Save the updated searchedUser
        await searchedUser.save();

        return res.status(200).json({ message: "Friend request cancelled successfully" });
      } else {
        return res.status(400).json({ message: "You don't have pending friend request with this user." });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async acceptFriendRequest(req, res, next) {
    const user = req.user;
    const { friendId } = req.params;
    const searchedUser = await User.findById(friendId);

    try {
      // Check if the friend is in the pendingFriends list
      if (user.pendingFriends.includes(friendId)) {
        // Remove from pendingFriends list
        // user.pendingFriends = user.pendingFriends.filter((friend) => friend.toString() !== friendId.toString());

        user.pendingFriends = user.pendingFriends.filter((id) => id.toString() !== friendId);

        // Add to friends list
        user.friends.push(friendId);
        searchedUser.friends.push(user._id);

        // Save the updated user
        await searchedUser.save();
        await user.save();

        return res.status(200).json({ message: "Friend added successfully" });
      } else {
        return res.status(400).json({ message: "Friend request not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async rejectFriendRequest(req, res, next) {
    const user = req.user;
    const { friendId } = req.params;
    const searchedUser = await User.findById(friendId);

    try {
      // Check if the friend is in the pendingFriends list
      if (user.pendingFriends.includes(friendId)) {
        // Remove from friends list
        // user.friends = user.friends.filter((friend) => friend.toString() !== friendId.toString());

        user.pendingFriends = user.pendingFriends.filter((id) => id.toString() !== friendId);

        // Add to friends list

        // Save the updated user
        await searchedUser.save();
        await user.save();

        return res.status(200).json({ message: "Friend Request Rejected Successfully" });
      } else {
        return res.status(400).json({ message: "Friend request not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async deleteFriend(req, res, next) {
    const user = req.user;
    const { friendId } = req.params;
    const searchedUser = await User.findById(friendId);

    try {
      // Check if the friend is in the pendingFriends list
      if (user.friends.includes(friendId)) {
        // Remove from friends list
        // user.friends = user.friends.filter((friend) => friend.toString() !== friendId.toString());

        user.friends = user.friends.filter((id) => id.toString() !== friendId);
        searchedUser.friends = searchedUser.friends.filter((id) => id.toString() !== user._id.toString());

        // Add to friends list

        // Save the updated user
        await searchedUser.save();
        await user.save();

        return res.status(200).json({ message: "Friend deleted successfully" });
      } else {
        return res.status(400).json({ message: "Friend request not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async getAllUsers(req, res, next) {
    try {
      // // Exclude the requesting user by their _id
      const user = req.user;

      // // Find all users except the requesting user
      // const users = await User.find({ _id: { $ne: excludeUserId } }).select("_id firstName lastName username profilePicture coverPicture followers friends pendingFriends");

      // Find all users except the requesting user
      const users = await User.find().select("_id firstName lastName username profilePicture coverPicture followers friends pendingFriends");

      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = followerController;
