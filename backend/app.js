const express = require('express');
const errorMiddleware = require('./middleware/error');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
// const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const app = express();

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(fileUpload());

// blocked by cors
app.use(cors({
    origin: process.env.ORIGIN_URL,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Route imports
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');


// app.use("/", (req, res) => {
//     res.send("Hello from server");
// });

app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', paymentRoute);

// for production environment
// if(process.env.NODE_ENV == 'production') {
//     const path = require(`path`);
//     app.get('/', (req, res) => {
//         app.use(express.static(path.resolve(__dirname, 'frontend', 'build')));
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     })
// };

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// middleware for ERROR
app.use(errorMiddleware);

module.exports = app;