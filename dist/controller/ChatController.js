"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_model_1 = __importDefault(require("../model/chat.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
const http_status_codes_1 = require("http-status-codes");
const responseUtil_1 = require("../utils/responseUtil");
const message_1 = require("../constants/message");
class ChatController {
    createChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, persona_id, isUser, content } = req.body;
            try {
                // Find the user by user_id
                const user = yield user_model_1.default.findOne({ user_id });
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                // Create a new chat
                const newChat = new chat_model_1.default({
                    user_id,
                    persona_id,
                    isUser,
                    content,
                });
                yield newChat.save();
                // Save the reference to the chat in the user's chats array
                user.chats.push(newChat._id);
                yield user.save();
                return (0, responseUtil_1.sendResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.Message.CHAT_CREATE);
            }
            catch (error) {
                return yield (0, responseUtil_1.errorResponse)(res, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message_1.Message.INTERNAL_SERVER, error);
            }
        });
    }
    chatList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, persona_id } = req.body;
            try {
                // Find the user by user_id
                const user = yield user_model_1.default.find({ user_id });
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                // Retrieve chats based on persona_id and user._id
                const chats = yield chat_model_1.default.find({
                    user_id: user_id,
                    persona_id: persona_id,
                });
                return (0, responseUtil_1.sendResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.Message.CHAT_LIST, chats);
            }
            catch (error) {
                return yield (0, responseUtil_1.errorResponse)(res, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message_1.Message.INTERNAL_SERVER, error);
            }
        });
    }
    deleteChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, persona_id } = req.params;
            try {
                // Find the user by user_id
                const user = yield user_model_1.default.findOne({ user_id });
                if (!user) {
                    res.status(404).json({ error: "User not found" });
                    return;
                }
                // Delete the chat based on persona_id and user._id
                const result = yield chat_model_1.default.deleteOne({
                    user_id,
                    persona_id,
                });
                if (result.deletedCount === 0) {
                    res.status(404).json({ error: "Chat not found" });
                    return;
                }
                return (0, responseUtil_1.sendResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.Message.CHAT_DELETE);
            }
            catch (error) {
                return yield (0, responseUtil_1.errorResponse)(res, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message_1.Message.INTERNAL_SERVER, error);
            }
        });
    }
}
exports.default = ChatController;
