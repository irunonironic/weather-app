const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (id) =>{
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '1h',
    });
};

const registerUser = async (req, res) =>{
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const userExists = await User.findOne({ $or: [{ username }, { email }] });
        if (userExists) {
            return res.status(400).json({ message: 'User with that username or email already exists' });
        }

        const user = await User.create({
            username, email, password
        });

        if(user){
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else{
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch(error) {
        console.error('Error in registerUser:', error.message);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

const loginUser = async (req, res) =>{
    try{
        const{ email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else{
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch(error) {
        console.error('Error in loginUser:', error.message);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports ={
    registerUser,
    loginUser
};