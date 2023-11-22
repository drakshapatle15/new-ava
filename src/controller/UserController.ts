import { Request, Response } from "express";
import User, { IUser } from "../model/user.model";
import Chat, { IChat } from "../model/chat.model";
import { StatusCodes } from "http-status-codes";
import { errorResponse, sendResponse } from "../utils/responseUtil";
import { Message } from "../constants/message";

class UserController {
  async createUser(req: Request, res: Response) {
    const { user_id, fcm_token, name, phone_no, country_code, persona_id } =
      req.body;

    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ phone_no });

      if (existingUser) {
        // Update the user
        existingUser.fcm_token = fcm_token;
        existingUser.name = name;
        existingUser.phone_no = phone_no;
        existingUser.country_code = country_code;

        const updatedUser: IUser = await existingUser.save();
      } else {
        // Create a new user
        const newUser: IUser = new User({
          user_id,
          fcm_token,
          name,
          phone_no,
          country_code,
          persona_id,
        });

        await newUser.save();
      }

      // Retrieve chats based on persona_id and user._id
      const chats = await Chat.find({
        user_id,
        persona_id,
      });

      console.log("complete");

      return sendResponse(res, StatusCodes.OK, Message.CHAT_LIST, chats);
    } catch (error) {
      return await errorResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        Message.INTERNAL_SERVER,
        error
      );
    }
  }
}

export default UserController;
