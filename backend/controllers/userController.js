const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserTableModel } = require("../models/userModel");
const { handleServerError } = require("../utils/errorHandler");

const generateToken = (email, password) => {
  return jwt.sign(
    { email, password },
    process.env.TOKEN_KEY,
    { expiresIn: "2190h" }
  );
};

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
};

const saveUser = async (req, res) => {
  try {
    const userInfo = new UserTableModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    userInfo.password = await hashPassword(userInfo.password);
    const result = await userInfo.save();
    res.json(result);
  } catch (error) {
    handleServerError(res, "Please try again later", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserTableModel.findOne({ email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(email, password);
      const userInfo = { username: user.username, email: user.email };
      
      res.status(200).json({ token, userInfo });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    handleServerError(res, "Please try again later", error);
  }
};

const userController = {
  saveUserInfo: saveUser,
  login: login,
};

module.exports = userController;
