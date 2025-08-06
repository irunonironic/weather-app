const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/database');
dotenv.config();

// Define your port
const PORT = process.env.PORT || 8000;
const weatherRoutes = require('./routes/weather');
const airQualityRoutes = require('./routes/airQuality');
const astronomyRoutes = require('./routes/astronomy');
const uvRoutes = require('./routes/uv');
const pollenRoutes = require('./routes/pollen');
const authRoutes = require('./routes/auth');       
const { protect } = require('./middleware/auth');
const cacheMiddleware = require('./middleware/cache'); 
const { apiLimiter, authLimiter } = require('./middleware/rateLimit')
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data
app.use(cors({
    origin: 'http://localhost:3000', credentials: true})); 
app.use('/api/', apiLimiter);

app.use(helmet()); 
app.use(morgan('dev')); 
app.use(compression()); 
app.use('/api/weather',cacheMiddleware,weatherRoutes);
app.use('/api/air-quality',cacheMiddleware, airQualityRoutes);
app.use('/api/astronomy',cacheMiddleware, astronomyRoutes);
app.use('/api/uv',cacheMiddleware,uvRoutes);
app.use('/api/pollen',cacheMiddleware,pollenRoutes);
app.use('/api/auth',authLimiter, authRoutes);

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('Weather App API is running...');
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
