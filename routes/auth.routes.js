const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        })

        const user = await newUser.save();
        res.status(201).json({msg: "User successfully created", user})
    } catch (error) {
        res.status(500).json(error)
    }
})

// Login
router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json("Please provide email and password!")
        }
        const token = jwt.sign({email,password},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        res.status(201).json({msg: "User logged in", token});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;