const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.routes");
const userRoute = require("./routes/users.routes");
const postRoute = require("./routes/post.routes");
const tagsRoute = require("./routes/tags.routes");
const authenticationMiddleware = require("./middleware/authUser");

require('dotenv').config();
app.use(express.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/tags", tagsRoute);

// 404 route
app.use('*', (req, res) => {
    return res.status(404).json({ message: 'route not found' })
})

module.exports = app;