const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/database');
dotenv.config();
const weatherRoutes = require('./routes/weather');
const airQualityRoutes = require('./routes/airQuality');
const astronomyRoutes = require('./routes/astronomy');
const uvRoutes = require('./routes/uv');
const pollenRoutes = require('./routes/pollen')
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cors()); 
app.use(helmet()); 
app.use(morgan('dev')); 
app.use(compression()); 
app.use('/api/weather',weatherRoutes);
app.use('/api/air-quality', airQualityRoutes);
app.use('/api/astronomy', astronomyRoutes);
app.use('/api/uv',uvRoutes);
app.use('/api/pollen',pollenRoutes);

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
