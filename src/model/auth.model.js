import { model, Schema } from "mongoose";
const authSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const Auth = model("Auth", authSchema);
export { Auth };
