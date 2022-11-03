const app = require('./index')
const Database = require('./database/index');

const PORT = process.env.PORT || 7000

// connect to database
Database.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.get("/", (req, res) => {
    res.send("Blog API for ALTSchool exam!")
})

app.listen(PORT, () => {
    console.log('Listening on port, ', PORT)
})