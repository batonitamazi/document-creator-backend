const User = require("../models/user")
const userRouter = require('express').Router()
const bcrypt = require("bcrypt")


userRouter.get("/", async (req, res) => {

    const users = await User.find({})
    res.json(users)
})
module.exports = userRouter

