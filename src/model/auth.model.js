// auth model
import { model, Schema } from "mongoose";
const authSchema = new Schema({
  email: { type: String },
  password: { type: String },
  sessionId: { type: String },
});
const Auth = model("Auth", authSchema);
export { Auth };
