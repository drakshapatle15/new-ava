"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ChatController_1 = __importDefault(require("../controller/ChatController"));
const chatRoutes = (0, express_1.Router)();
const chatController = new ChatController_1.default();
chatRoutes.post("/create", chatController.createChat);
chatRoutes.post("/list", chatController.chatList);
chatRoutes.delete("/delete/:user_id/:persona_id", chatController.deleteChat);
exports.default = chatRoutes;
