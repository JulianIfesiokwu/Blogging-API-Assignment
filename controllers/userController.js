const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username
        })

        const user = await newUser.save();
        res.status(201).json({msg: "User successfully created", user});
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({
                status: false,
                message: "User already exists"
            })    
        } 
        else {
            res.status(500).json({
                message: "Please check, there was a problem creating user profile"
            });
        }  
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        // if email or pasword is wrong
        if (!email || !password) {
            return res.status(400).json("Please provide valid email and password!");
        }
        // create and assign a token
        const token = jwt.sign({email,password},process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
        res.header("Authorization", `Bearer ${token}`);
        res.status(201).json({msg: "User logged in", token});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "there was a problem authenticating user"
        })
    }
}