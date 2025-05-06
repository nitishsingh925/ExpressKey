import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/expresskey"
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}:${connectionInstance.connection.port}/${connectionInstance.connection.name}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1);
  }
};

export default connectDB;
