const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to database')
    }
    catch(err){
        console.error("Error when connect to mongoose:", err);
    }
}


module.exports = connectDB


