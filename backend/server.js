const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const connectDB = require('./config/database');
dotenv.config();

// Connect to DB
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

// Rate Limiting
const { apiLimiter, authLimiter } = require('./middleware/rateLimit');
app.use('/api/', apiLimiter);

// Cache
const cacheMiddleware = require('./middleware/cache');

// Routes
const weatherRoutes = require('./routes/weather');
const airQualityRoutes = require('./routes/airQuality');
const astronomyRoutes = require('./routes/astronomy');
const uvRoutes = require('./routes/uv');
const pollenRoutes = require('./routes/pollen');
const authRoutes = require('./routes/auth');

app.use('/api/weather', cacheMiddleware, weatherRoutes);
app.use('/api/air-quality', cacheMiddleware, airQualityRoutes);
app.use('/api/astronomy', cacheMiddleware, astronomyRoutes);
app.use('/api/uv', cacheMiddleware, uvRoutes);
app.use('/api/pollen', cacheMiddleware, pollenRoutes);
app.use('/api/auth', authLimiter, authRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('Weather App API is running...');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
