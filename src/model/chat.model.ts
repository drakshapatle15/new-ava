import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  user_id: string;
  persona_id: string;
  isUser: string;
  content: string;
}

const chatSchema: Schema = new Schema({
  user_id: { type: String, required: true },
  persona_id: { type: String, required: true },
  isUser: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model<IChat>("Chat", chatSchema);
