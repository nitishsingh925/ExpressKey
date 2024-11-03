import { Auth } from "../model/auth.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Sign up

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
    // Hash the password

    const hashPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const user = { email, password: hashPassword };

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

// Sign in

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email and password" });
  }

  try {
    // Find user by email
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with stored hash
    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    user.password = undefined; // Omit password from the response

    // Generate a unique session ID and save it to the user
    const sessionId = crypto.randomUUID();
    user.sessionId = sessionId;
    await user.save();

    // Create JWT with sessionId
    const payload = {
      user: { _id: user._id, email: user.email },
      sessionId,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Set token as a cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: "strict",
      secure: true,
    });

    res.status(200).json({
      user,
      token,
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Sign out
export const signOut = async (req, res) => {
  try {
    console.log(req);

    const userId = req.user._id; // Assuming `req.user` is set by the middleware

    // Clear the sessionId in the user's record
    await Auth.findByIdAndUpdate(userId, { sessionId: null });

    // Clear the JWT cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error signing out", error: error.message });
  }
};
