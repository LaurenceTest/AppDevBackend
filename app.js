const express = require('express');
const routes = require('./routes/user')

const app = express()
app.use(express.json())
app.use('/',routes)

app.listen(3000)
console.log("Server is now online.")