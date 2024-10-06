const logRequest = (req,res,next)=>{
    console.log(`method: ${req.method}\n`,`route: ${req.url}\n`,`timestamp: ${Date.now()}`)
    next()
}

module.exports = logRequest