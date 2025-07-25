const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/database');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cors()); 
app.use(helmet()); 
app.use(morgan('dev')); 
app.use(compression()); 

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Weather App API is running...');
});

// Define your port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
