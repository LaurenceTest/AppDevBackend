const express = require('express');
const routes = require('./routes/user')
const {logRequest} = require('./middleware/authMiddleware');

const app = express()
app.use(express.json())
app.use('/',logRequest,routes)

app.listen(process.env.PORT)
console.log("Server is now online.")