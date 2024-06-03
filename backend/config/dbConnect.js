const {default : mongoose} = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: process.env.MONGODB_NAME,
        })
        // await mongoose.connect("mongodb://localhost:27017/Ecommerce")
        console.log('MongoDB connected');
    } catch (error) {
        // console.log(error);
        console.error('MongoDB connection failed');
    }
};

module.exports = dbConnect;