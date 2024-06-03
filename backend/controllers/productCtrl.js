const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');


const createProduct = asyncHandler(async (req, res) => {
    try{
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error){
        throw new Error(error);
    }
});

// const updateProduct = asyncHandler(async (req, res) => {
//     const id = req.params;
//     validateMondoDBId(id);
//     try {
//         // if (req.body.title) {
//         //     req.body.slug = slugify(req.body.title);
//         // }
//         const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
//             new: true,
//         });
//         res.json(updateProduct);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

// const deleteProduct = asyncHandler()

const getAllProduct = asyncHandler(async (req, res) => {
    try{
        const getAllProducts = await Product.find({});
        res.json(getAllProducts);
    } catch(error){
        throw new Error(error);
    }
});

const getListOfProduct = asyncHandler(async (req, res) => {
    try{
        const {brand, price, screen, battery} = req.query;
        const query = {};

        if(brand)   query['brand'] = brand;
        // if(price)   query['colors.price'] = {$lte: price};
        // if(screen) queryp['attr_short.screen'] = {$eq: screen};
        // if(battery) query['attr_short.battery'] = {$gte: battery};

        const products = await Product.find(query)
                                .populate('colors')
                                // .populate('variant')
                                // .populate('attr_short');
        res.json(products);
    } catch(error){
        throw new Error(error);
    }
});

module.exports = {createProduct, getAllProduct, getListOfProduct};

