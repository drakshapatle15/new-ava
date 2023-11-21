import { Request, Response } from "express";
import Chat, { IChat } from "../model/chat.model";
import User, { IUser } from "../model/user.model";
import { StatusCodes } from "http-status-codes";
import { errorResponse, sendResponse } from "../utils/responseUtil";
import { Message } from "../constants/message";

class ChatController {
  async createChat(req: Request, res: Response) {
    const { user_id, persona_id, isUser, content } = req.body;

    try {
      // Find the user by user_id
      const user = await User.findOne({ user_id });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Create a new chat
      const newChat = new Chat({
        user_id,
        persona_id,
        isUser,
        content,
      });

      await newChat.save();

      // Save the reference to the chat in the user's chats array
      user.chats.push(newChat._id);
      await user.save();

      return sendResponse(res, StatusCodes.OK, Message.CHAT_CREATE);
    } catch (error: any) {
      return await errorResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        Message.INTERNAL_SERVER,
        error
      );
    }
  }

  async chatList(req: Request, res: Response) {
    const { user_id, persona_id } = req.body;

    try {
      // Find the user by user_id
      const user = await User.find({ user_id });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Retrieve chats based on persona_id and user._id
      const chats = await Chat.find({
        user_id: user_id,
        persona_id: persona_id,
      });

      return sendResponse(res, StatusCodes.OK, Message.CHAT_LIST, chats);
    } catch (error: any) {
      return await errorResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        Message.INTERNAL_SERVER,
        error
      );
    }
  }

  async deleteChat(req: Request, res: Response) {
    const { user_id, persona_id } = req.params;

    try {
      // Find the user by user_id
      const user = await User.findOne({ user_id });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      // Delete the chat based on persona_id and user._id
      const result = await Chat.deleteOne({
        user_id,
        persona_id,
      });

      if (result.deletedCount === 0) {
        res.status(404).json({ error: "Chat not found" });
        return;
      }

      return sendResponse(res, StatusCodes.OK, Message.CHAT_DELETE);
    } catch (error: any) {
      return await errorResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        Message.INTERNAL_SERVER,
        error
      );
    }
  }
}

export default ChatController;
