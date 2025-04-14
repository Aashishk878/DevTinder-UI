const mongoose = require("mongoose");


const connectDB = async() => {
    // console.log(process.env.DB_CONNECTION_SECRET);
    await mongoose.connect(
        process.env.DB_CONNECTION_SECRET
        ,
        // {
        //     // useUnifiedTopology: true,
        //     // useNewUrlParser: true,
        //     // useCreateIndex: true, //make this true
        //     // autoIndex: true, //make this also true
        // }
    );
};

module.exports = connectDB;



