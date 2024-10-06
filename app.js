const express = require('express');
const routes = require('./routes/user')
const logRequest = require('./middleware/logMiddleware');
const rateLimiter = require('./middleware/rateLimiterMiddleware')

const app = express()
app.use(express.json())
app.use('/',logRequest,rateLimiter,routes)

app.listen(process.env.PORT)
console.log("Server is now online.")