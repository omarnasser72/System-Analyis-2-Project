const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set("strictQuery", false);
const db = process.env.LOCAL_MONGO;

const connectDB = async () => {
    try {
        console.log(db);
        await mongoose.connect(db);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};




module.exports = connectDB;


