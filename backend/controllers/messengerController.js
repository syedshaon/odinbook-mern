const User = require("../models/userModel");
const Conversation = require("../models/conversation");

const messengerController = {
  async createMessage(senderId, content, recipients, isGroup, conId, contentType) {
    // console.log(recipients);
    try {
      //   const { senderId, content, recipients, isGroup } = req.body;

      // Find or create the conversation based on whether it's a group conversation or not
      let conversation;
      const prevConversation = await Conversation.findById(conId);

      // console.log(prevConversation);

      if (prevConversation) {
        conversation = prevConversation;
      } else {
        conversation = new Conversation({
          participants: [senderId, recipients[0]],
        });
      }

      //   console.log(Date.now());
      //   conversation.modifiedAt = Date.now;
      conversation.modifiedAt = Date.now();

      // Add the new message to the conversation
      conversation.messages.push({
        sender: senderId,
        content: content,
        type: contentType ? contentType : "text", // Default type if not mentioned
      });
      //   console.log(conversation.participants);

      // Save the conversation with the new message
      await conversation.save();
      // console.log("Message Stored Successfully.");
      return conversation;

      //   res.status(201).json({ message: "Message sent successfully", conversation });
    } catch (error) {
      console.error("Error creating message:", error);
      //   res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async getAllConversations(req, res, next) {
    // console.log("came this far");
    try {
      const userId = req.user._id;
      // console.log(userId);

      // Find all conversations where the user is a participant, sorted by modifiedAt in descending order
      const conversations = await Conversation.find({
        participants: { $in: [userId] },
        group: false,
      }).sort({ modifiedAt: -1 });

      //   console.log(conversations);

      if (!conversations) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // console.log(conversations);
      // Extract and return the messages
      //   const messages = conversation.messages;

      res.status(200).json({ conversations });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async getGroupConversations(req, res, next) {
    try {
      const userId = req.user._id;
      //   console.log(userId);

      // Find all conversations where the user is a participant, sorted by modifiedAt in descending order
      const conversations = await Conversation.find({
        participants: { $in: [userId] },
        group: true,
      }).sort({ modifiedAt: -1 });

      //   console.log(conversations);

      if (!conversations) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // Extract and return the messages
      //   const messages = conversation.messages;

      res.status(200).json({ conversations });
    } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async createGroupConversation(req, res, next) {
    try {
      const { participants, groupName } = req.body;

      // Check if required fields are provided
      if (!participants || !groupName) {
        return res.status(400).json({ message: "All fields are required." });
      }

      if (groupName.length > 15) {
        return res.status(400).json({ message: "Group Name's max character lenth is 15." });
      }

      if (participants.length == 1) {
        return res.status(400).json({ message: "Group must have more than 1 participant." });
      }

      // // Check if the group conversation already exists
      // const existingConversation = await Conversation.findOne({
      //   participants: { $all: participants },
      //   group: true,
      // });

      // if (existingConversation) {
      //   return res.status(400).json({ message: "Group conversation already exists" });
      // }

      // Create a new group conversation
      const groupConversation = new Conversation({
        participants,
        group: true,
        groupName,
      });

      // Save the new group conversation
      await groupConversation.save();

      res.status(201).json({ message: "Group conversation created successfully", conversation: groupConversation });
    } catch (error) {
      console.error("Error creating group conversation:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = messengerController;
