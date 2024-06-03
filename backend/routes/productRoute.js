const express = require('express')
const {
    createProduct,
    // getaProduct,
    getAllProduct,
    getListOfProduct,
    // updateProduct,
    // deleteProduct
} = require('../controllers/productCtrl')

const router = express.Router()


router.post("/", createProduct)
router.get("/", getAllProduct)
router.get("/list", getListOfProduct)

module.exports = router