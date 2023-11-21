import { Router } from "express";
import ChatController from "../controller/ChatController";

const chatRoutes: Router = Router();
const chatController = new ChatController();

chatRoutes.post("/create", chatController.createChat);
chatRoutes.post("/list", chatController.chatList);
chatRoutes.delete("/delete/:user_id/:persona_id", chatController.deleteChat);

export default chatRoutes;
