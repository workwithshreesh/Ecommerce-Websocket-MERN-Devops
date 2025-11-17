const mongoose = require('mongoose');
const handleThrowError = require('../utils/error-success-res/errorThrow');

const connectToMongoDB = async () => {
    try {

        await mongoose.connect(`mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PRT}/mydatabase`);

    } catch (error){

    }
}

module.exports = connectToMongoDB;