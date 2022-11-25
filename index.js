const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const authenticationMiddleware = require("./middleware/authUser");

const app = express();

require('dotenv').config();
app.use(express.json())

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// home route
app.get("/", (req, res) => {
    res.send({ status: true })
});

// 404 Route
app.use('*', (req, res) => {
    return res.status(404).json({message: "Route not found"});
});

module.exports = app;