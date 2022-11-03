const mongoose = require("mongoose");

const connect = (url) => {
    mongoose.connect(url || 'mongodb://localhost:7000')

    mongoose.connection.on("connected", () => {
        console.log("Connected to mongoDB successfully");
    });

    mongoose.connection.on("error", (err) => {
        console.log("An error occurred while connecting to MongoDB");
        console.log(err);
    });
}

module.exports = {
    connect
};