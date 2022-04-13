const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//register new user [/authSystem/register]
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("user not created");
  }
});

module.exports = router;
