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
const user_model_1 = __importDefault(require("../model/user.model"));
const chat_model_1 = __importDefault(require("../model/chat.model"));
const http_status_codes_1 = require("http-status-codes");
const responseUtil_1 = require("../utils/responseUtil");
const message_1 = require("../constants/message");
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, fcm_token, name, phone_no, country_code, persona_id } = req.body;
            try {
                // Check if the email is already registered
                const existingUser = yield user_model_1.default.findOne({ phone_no });
                if (existingUser) {
                    // Update the user
                    existingUser.fcm_token = fcm_token;
                    existingUser.name = name;
                    existingUser.phone_no = phone_no;
                    existingUser.country_code = country_code;
                    const updatedUser = yield existingUser.save();
                }
                else {
                    // Create a new user
                    const newUser = new user_model_1.default({
                        user_id,
                        fcm_token,
                        name,
                        phone_no,
                        country_code,
                        persona_id,
                    });
                    yield newUser.save();
                }
                // Retrieve chats based on persona_id and user._id
                const chats = yield chat_model_1.default.find({
                    user_id,
                    persona_id,
                });
                console.log("complete");
                return (0, responseUtil_1.sendResponse)(res, http_status_codes_1.StatusCodes.OK, message_1.Message.CHAT_LIST, chats);
            }
            catch (error) {
                return yield (0, responseUtil_1.errorResponse)(res, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message_1.Message.INTERNAL_SERVER, error);
            }
        });
    }
}
exports.default = UserController;
