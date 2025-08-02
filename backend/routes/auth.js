const express = require('express');
const router = express.Router();

// Debug: Log when this file is loaded
console.log('Auth routes file loaded');

const authController = require('../controllers/authController');

// Debug: Log when routes are being set up
console.log('Setting up auth routes...');

// Test route to verify routing works
router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: 'Auth routes are working!' });
});

router.post('/register', (req, res, next) => {
    console.log('Register route hit');
    authController.registerUser(req, res, next);
});

router.post('/login', (req, res, next) => {
    console.log('Login route hit');
    console.log('Request body:', req.body);
    authController.loginUser(req, res, next);
});

console.log('Auth routes setup complete');

module.exports = router;