import { app } from "./app.js";
import connectDB from "./db/db.js";

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World !" });
});

process.loadEnvFile();
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    await app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
