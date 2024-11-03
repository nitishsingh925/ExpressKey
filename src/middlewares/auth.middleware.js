import jwt from "jsonwebtoken";
import { Auth } from "../model/auth.model.js";

const AuthMiddleware = async (req, res, next) => {
  try {
    const cookie_token = req.cookies?.token;
    const header_token = req.headers.authorization?.split(" ")[1];
    const usedToken = cookie_token || header_token;

    if (!usedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(usedToken, process.env.JWT_SECRET);

    // Retrieve user and check if sessionId matches
    const user = await Auth.findById(decoded.user._id);
    if (!user || user.sessionId !== decoded.sessionId) {
      return res
        .status(403)
        .json({ message: "Session invalid, please log in again" });
    }

    req.user = decoded.user; // Attach user to request
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Not Authorized: Token expired" });
    }
    return res.status(500).json({ message: "Authentication error" });
  }
};

export default AuthMiddleware;
