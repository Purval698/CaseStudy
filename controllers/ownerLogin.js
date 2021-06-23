const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const OwnerModel = require("../models/owner");
require("dotenv").config({ path: "../.env" });

const postOwnerSignUp = async (req, res) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    res.status(400).json({ status: "Error", message: "Email is not valid" });
    return;
  }

  const genSalt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, genSalt);

  OwnerModel.create({ email, hashedPassword })
    .then((_data) => {
      console.log(_data);
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
    res.status(400).json({ status: "Error", message: err.message });
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60,
      data: email,
    },
    process.env.SECREATE_CODE
  );

  res.status(200).send({
    status: "success",
    data: { token },
    message: "Successfully logged",
  });
};

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, process.env.SECREATE_CODE);
      res.json({ status: "success", data: decoded });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message ? err.message : "Token expired",
      });
      return;
    }
  } else {
    next();
  }
};

module.exports = { postOwnerSignUp, postOwnerLogin, checkToken };
