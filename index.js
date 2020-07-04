const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const expressSanitizer = require('express-sanitizer');
const app = express()
const port = 3000

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('connected'))

const authRoute = require('./routes/auth')

app.use(expressSanitizer())
app.use(express.json())
app.use('/api/auth', authRoute)

app.listen(port, () => console.log(`Server running on: http://localhost:${port}`))