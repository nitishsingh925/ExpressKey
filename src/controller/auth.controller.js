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
