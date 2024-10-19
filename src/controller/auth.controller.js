export const signUp = (req, res) => {
  const { email, password } = req.body;

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

  res
    .status(200)
    .json({ message: "user data received wait for saving data coming soon  " });
};
