const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    headers: true, 
});

const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 login/register attempts per hour
    message: 'Too many authentication attempts from this IP, please try again after an hour',
    headers: true,
});

module.exports = {
    apiLimiter,
    authLimiter,
};