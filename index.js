const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/users.routes");
const postRoute = require("./routes/post.routes");
const authenticationMiddleware = require("./middleware/authUser");

require('dotenv').config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

// home route
app.get("/", (req, res) => {
    res.send("Blog API for ALTSchool exam!")
});

// 404 Route
app.use('*', (req, res) => {
    return res.status(404).json({msg: "Route not found!"});
});

module.exports = app;