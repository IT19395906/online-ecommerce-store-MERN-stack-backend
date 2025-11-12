const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
require('dotenv').config();

const app = express();

async function connectDB() {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log("database conntected successfully");
    } catch (error) {
        console.log("database connection failed", error.message);
        process.exit(1);
    }
}

connectDB();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", userRoutes);

app.get("/", (req,res) => res.send("welcome to node server"));

const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});