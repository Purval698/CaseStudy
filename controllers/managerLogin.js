const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const ManagerModel = require("../models/manager");
require("dotenv").config({ path: "../.env" });

const postManagerSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400).jsnon({ status: "Error", message: "Email is not valid" });
    return;
  }

  const genSalt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, genSalt);

  ManagerModel.create({ email, hashedPassword })
    .then((_data) => {
      res.json({ status: "success", message: "Account successfully created" });
    })
    .catch((err) => {
      res.json({ status: "error", message: "Email exists" });
    });
};

const postManagerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    res.status(400).json({ status: "Error", message: "Email is not valid" });
    return;
  }

  try {
    const manager = await ManagerModel.findOne({ email });

    if (!manager) {
      res.status(404).json({ status: "Error", message: "Account not found" });
      return;
    }

    if (!(await bcrypt.compare(password, manager.hashedPassword))) {
      res.status(400).json({ status: "Error", message: "Incorrect password" });
      return;
    }
  } catch (err) {
    res.status(400).json({ status: "Error", message: err.message });
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 5, //seconds
      data: { email, role: "Manager" },
    },
    process.env.SECREATE_CODE
  );

  res.cookie("token", token, {
    maxAge: 60 * 1000 * 5, //miliseconds
    httpOnly: true,
  });

  res.status(200).send({
    status: "success",
    message: "Successfully logged",
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
  } catch (err) {
    res.json({
      status: "error",
      message: err.message ? err.message : "Cookie expired",
    });

    return;
  }
  next();
};

module.exports = { postManagerSignUp, postManagerLogin, checkToken };
