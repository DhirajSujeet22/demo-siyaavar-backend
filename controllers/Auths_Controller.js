const userAuth = require("../model/User_Schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ------------------------------------------------------

exports.signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ userID: savedUser._id }, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("authToken", token, cookieOptions);

    res.status(201).json({ message: "SignUp Successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------------------------------------------

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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

    const token = jwt.sign({ userID: user.id }, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });

    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("authToken", token, cookieOptions);

    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorize" });
  }
};

exports.logOutUser = async (req, res) => {
  const User = req.user;

  try {
    if (!User) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: "logout Successfully" });
  } catch (error) {
    res.status(401).json({ message: "Internal server error" });
  }
};
