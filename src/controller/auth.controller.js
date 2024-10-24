import { Auth } from "../model/auth.model.js";

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  // Validate the input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  if (email.length < 6) {
    return res
      .status(400)
      .json({ message: "Email should be at least 6 characters" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be at least 6 characters" });
  }

  try {
    // Create a new user
    const user = { email, password };

    const resUser = await Auth.create(user); // Await the result of the async operation

    // Send the response
    res.status(201).json({
      resUser,
      message: "User data saved successfully.",
    });
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({
      message: "Error saving user data",
      error: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = user.password === password;

    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error saving user data",
      error: error.message,
    });
  }
};
