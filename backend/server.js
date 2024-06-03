const express = require('express')
const app = express()
const dbConnect = require('./config/dbConnect')
const initRoute = require('./routes/index')
const cookieParer = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParer())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors());

dbConnect()

initRoute(app)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
