const express = require('express')

const {
    getAllVariant,
    filterVariant,
    getAttrDetailByID
} = require('../controllers/variantCtrl')

const router = express.Router()

router.get("/", getAllVariant)
router.get("/filter", filterVariant)
router.get("/attr_detail/:id", getAttrDetailByID)

module.exports = router

