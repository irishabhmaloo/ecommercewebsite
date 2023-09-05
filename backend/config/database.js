const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.CONN_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        // useCreateIndex: true
    }).then((con) => {
        console.log(`MongoDB connected with server: ${con.connection.host}`);
    });
};

module.exports = connectDatabase;