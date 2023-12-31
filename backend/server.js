const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary");

// Unhandled Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");

    process.exit(1);
});

// config
dotenv.config({path: 'backend/config/config.env'});

// connecting to database
connectDatabase();

// Config of cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// for production environment
if(process.env.NODE_ENV == 'production') {
    const path = require(`path`);
    app.get('/', (req, res) => {
        app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
};

// creating server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled promise rejection");

    server.close(() => {
        process.exit(1);
    });
})