const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const OwnerModel = require("../models/owner");

const postOwnerSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400).jsnon({ status: "Error", message: "Email is not valid" });
    return;
  }

  const genSalt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, genSalt);

  OwnerModel.create({ email, hashedPassword })
    .then((_data) => {
      res.json({ status: "success", message: "Account successfully created" });
    })
    .catch((err) => {
      res.json({ status: "error", message: "Email exists" });
    });
};

const postOwnerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400).json({ status: "Error", message: "Email is not valid" });
    return;
  }

  try {
    const owner = await OwnerModel.findOne({ email });

    if (!owner) {
      res.status(404).json({ status: "Error", message: "Account not found" });
      return;
    }

    if (!(await bcrypt.compare(password, owner.hashedPassword))) {
      res.status(400).json({ status: "Error", message: "Incorrect password" });
      return;
    }
  } catch (err) {
    return res.status(400).json({ status: "Error", message: err.message });
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 5, //seconds
      data: { email, role: "Owner" },
    },
    process.env.SECREATE_CODE
  );

  res.cookie("token", token, {
    maxAge: 60 * 1000 * 5, //miliseconds
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Successfully logged",
    token
  });
};


const checkToken = (req, res, next) => {
  if (!req.cookies)
    return res
      .status(401)
      .json({ status: "unauthorized", message: "cookies not found" });

  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      status: "unauthorized",
      message: "Access token is missing or invalid",
    });

  try {
    const decoded = jwt.verify(token, process.env.SECREATE_CODE);
    req.data = decoded;
  } catch (err) {
    res.json({
      status: "error",
      message: err.message ? err.message : "Cookie expired",
    });

    return;
  }
  next();
};

module.exports = { postOwnerSignUp, postOwnerLogin, checkToken };
