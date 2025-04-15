const db = require("../Config/db");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log(req.body, "request_body");
  const { username, password, email } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;
  if (!username || !password || !email) {
    res.status(400).json({
      error: "Please provide all required details.",
    });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    console.log(existingUser, "exitstingUser");
    if (existingUser) {
      return res.status(400).json({ error: "this email is already register." });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = await db.run(
      "INSERT INTO users (email, password, username, profilePicture) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, username, profilePicture]
    );

    const user = { id: result.id, email, username, profilePicture };
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created", token, user });
  } catch (err) {
    console.log(err);
  }
};
