const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const protect = async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        }catch(error){
            console.error('Error in auth middleware:',error.message);
            res.status(401).json({message:'Not authorized, token failed'});

        }
    }
    else{
        res.status(401).json({message:'Not authorized , no token'});
    }
};

module.exports = { protect };