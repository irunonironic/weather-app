const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 600});
const cacheMiddleware = (req,res,next) => {
     console.log('--- Cache Middleware Debug ---');
    console.log('Request Method:', req.method);
    console.log('req.originalUrl:', req.originalUrl);
    if(req.method !== 'GET'){
        return next();
    }

    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

if(cachedResponse){
    console.log(`Cache hit for ${key}`);
    return res.status(200).json(JSON.parse(cachedResponse));
}else{
    console.log(`Cache miss for ${key}`);
    res.originalSend = res.send;
    res.send = (body) => {
        cache.set(key,body);
        res.originalSend(body);
    };
    next();
}
};

module.exports = cacheMiddleware;