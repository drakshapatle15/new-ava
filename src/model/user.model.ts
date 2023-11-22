import mongoose, { Schema, Document } from "mongoose";
import { IChat } from "./chat.model";

export interface IUser extends Document {
  user_id: string;
  persona_id: string;
  fcm_token: string;
  name: string;
  phone_no: string;
  country_code: string;
  chats: Array<Schema.Types.ObjectId | IChat>; // Array of references to Chat documents
}

const userSchema: Schema = new Schema({
  user_id: { type: String, required: true, unique: true },
  persona_id: { type: String, required: true, unique: true },
  fcm_token: { type: String, required: true },
  name: { type: String, required: true },
  phone_no: { type: String, required: true },
  country_code: { type: String, required: true },
  chats: [{ type: Schema.Types.ObjectId, ref: "Chat" }], // Reference to Chat documents
});

export default mongoose.model<IUser>("User", userSchema);
