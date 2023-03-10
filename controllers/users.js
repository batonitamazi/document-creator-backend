const User = require("../models/user");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res) => {
  console.log(req.body)
  const { email, username, password } = req.body;
  if (password.length < 3 || username.length < 3) {
    return res.status(400).json({
      error: "password and username must be longer than 3 characters",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    username,
    passwordHash,
  });
  const savedUser = await user.save()
  res.status(201).json(savedUser)
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
module.exports = userRouter;
