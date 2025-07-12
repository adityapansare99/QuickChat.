import User from "../models/user.model.js";
import { asynchandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import validator from "validator";
import { uploadoncloudinary } from "../Utils/cloudinary.js";
import Message from "../models/message.model.js";
import { response } from "express";
import { io, userSocketMap } from "../index.js";

//get all users except the logged in user (for sidebar)
const getAllUsers = asynchandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    //count messages not seen
    const unseenMessages = {};

    const promises = filteredUsers.map(async (user) => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });

    await Promise.all(promises);
    res
      .status(200)
      .json(new ApiResponse(200, { filteredUsers, unseenMessages }, "success"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "something went wrong"));
  }
});

//get all messages for selected user
const getMessages = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
    });

    await Message.updateMany(
      {
        senderId: id,
        receiverId: myId,
      },
      { seen: true }
    );
    res.status(200).json(new ApiResponse(200, { messages }, "success"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "something went wrong"));
  }
});

//mark message as seen using message id
const markMessageAsSeen = asynchandler(async (req, res) => {
  try {
    const { id } = req.params;

    await Message.findByIdAndUpdate(id, { seen: true });

    res.status(200).json(new ApiResponse(200, {}, "success"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(500, error.message, "something went wrong"));
  }
});

//send message to selected user
const sendMessage = asynchandler(async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;

    let imageUrl = "";
    if (image) {
      const response = await uploadoncloudinary(image);
      if (!response) {
        return res
          .status(500)
          .json(new ApiResponse(500, {}, "Image not uploaded"));
      }
      imageUrl = response.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    if (!newMessage) {
      return res.status(500).json(new ApiResponse(500, {}, "Message not Send"));
    }

    //emit the new message to the receiver's socket
    const receiverSocketId = userSocketMap[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(new ApiResponse(200, newMessage, "Message Send"));
  } catch (error) {
    console.log(error);

    res
      .status(400)
      .json(new ApiResponse(400, error.message, "something went wrong"));
  }
});

export { getAllUsers, getMessages, markMessageAsSeen, sendMessage };
