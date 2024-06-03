const express = require('express')

const PORT = process.env.PORT || 5000
const app = express()
const productRoute = require('./productRoute')
const variantRoute = require('./variantRoute')
const orderRoute = require('./orderRoute')
const userRoute = require('./userRoute')
const Variant = require('../models/variantModel')
const Attr_detail = require('../models/attr_detail')
const Attr_short = require('../models/attr_short')

const {notFound, errorHandler} = require('../middlewares/ErrorHandler')

const initRoute = (app) => {
    app.use('/api/product/', productRoute)
    app.use('/api/variant/', variantRoute)
    app.use('/api/order/', orderRoute)
    app.use('/api/user/', userRoute)

    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRoute;