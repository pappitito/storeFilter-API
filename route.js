const express = require('express')
const {getAllProducts, getProduct, getAllProductsFilter} = require('./controller')
const router = express.Router()

router.get('/', getAllProducts )
router.get('/search/:id', getProduct )
router.get('/filter', getAllProductsFilter)

module.exports = {router}