const NodeCache = require('node-cache');
const cache = new NodeCache({stdTTL: 600});
const cacheMiddleware = (req,res,next) => {
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