import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
  try {
    const cookie_token = req.cookies?.token; // Cookie Token
    const header_token = req.headers.authorization?.split(" ")[1]; // Header Token

    const usedToken = cookie_token || header_token;

    if (!usedToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(usedToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Not Authorized" });
    }
    return res.status(501).json({ message: "Something is missing!" });
  }
};

export default AuthMiddleware;
