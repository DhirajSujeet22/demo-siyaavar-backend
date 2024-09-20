const userAuth = require("../model/User_Schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ------------------------------------------------------

exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    console.log(req.body);

    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    const existingUser = await userAuth.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userAuth({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ userID: savedUser._id }, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60, // 1-hour cookie expiration
      // sameSite: "lax",
    };

    res.cookie("authToken", token, cookieOptions);

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------------------------------------------

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = req.user;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await userAuth.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
