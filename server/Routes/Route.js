const express = require("express");
const router = new express.Router();
const userdb = require("../Model/userSchema");

router.post("/register", async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, cpassword } = req.body;
    if (!name || !email || !password || !cpassword) {
      return res.status(400).json({ msg: "Please fill all fields" });
    } else {
      const checkUser = await userdb.findOne({ email });
      //   console.log(checkUser);

      if (checkUser) {
        res
          .status(400)
          .json({ status: 202, msg: "Email is already registered!" });
        // console.log(checkUser);
      } else {
        // console.log("done");
        const newForm = new userdb({ name, email, password, cpassword });
        // console.log(newForm+"Good");

        const updateUser = await newForm.save();
        // console.log(updateUser);

        res.status(400).json({
          msg: "Registration completed",
          status: 201,
          data: updateUser
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      msg: "Failed to register"
    });
  }
});

module.exports = router;
