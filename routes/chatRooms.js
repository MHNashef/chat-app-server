const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ChatRoom = require("../models/chatRoom");

// create chat room

// get all chat rooms
router.get("/", async (req, res) => {
  try {
    const allRooms = await ChatRoom.find();
    res.status(201).send(allRooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get messages from chat room

// add user to chat room
router.patch("/", async (req, res) => {
  try {
    await ChatRoom.findOneAndUpdate(
      { _id: req.body._id },
      {
        $addToSet: {
          chatParticipants: req.body.userId,
        },
      }
    );
    res.status(201).json({ message: "user added to chat room" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add message to chat room

// remove user from chat room

module.exports = router;
