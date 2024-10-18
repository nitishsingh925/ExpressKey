import { app } from "./app.js";

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World !" });
});

process.loadEnvFile();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
