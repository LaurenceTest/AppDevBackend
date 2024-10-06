require('dotenv').config()
const requestsPerUser = []

const rateLimiterMiddleware = (req,res,next)=>{
    try {
        const address = req.socket.remoteAddress
        requestsPerUser.push({
            address,
            timestamp: Date.now()
        })
        const {REQ_RATE_LIMIT,REQ_TIME_LIMIT} = process.env
        const liveRequests = requestsPerUser.filter(req=>{
            return req.address === address && req.timestamp > Date.now() - REQ_TIME_LIMIT
        })
        if(liveRequests.length > REQ_RATE_LIMIT) {
            requestsPerUser.pop()
            return res.sendStatus(429)
        }
        next()
    } catch (error) {
        res.sendStatus(500)        
    }
}

module.exports = rateLimiterMiddleware