const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatRoomShema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    chatParticipants: {
      type: Array,
    },
    messages: [{ body: String, sender: String, date: Date }],
    recieved: {
      type: Boolean,
      default: false,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatRoomShema);
module.exports = ChatRoom;
