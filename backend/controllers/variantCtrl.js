const Variant = require('../models/variantModel');
const Product = require('../models/productModel');
const Color = require('../models/colorModel');
const Attr_short = require('../models/attr_short');
const Attr_detail = require('../models/attr_detail');

const getAllVariant = async (req, res) => {
    try{
        const variants = await Variant.find({});
        res.json(variants);
    } catch(error){
        throw new Error(error);
    }
}

const filterVariant = async (req, res) => {
    try{
        const {brand} = req.query;
        // const variants = await Variant.find(filter).populate('product', 'brand');
        const variants = await Variant.find()
                    .populate({
                        path: 'product',
                        model: 'Product',
                        select: 'brand category -_id'
                    })
                    .populate({
                        path: 'attr_detail',
                        model: 'Attr_detail',
                        select: 'screen battery -_id'
                    })
                    .populate({
                        path: 'color_list',
                        model: 'Color',
                        select:'name price gallery -_id'
                    });
        // for (const variant of variants){
        //     console.log(variant.product.brand == brand);
        // }

        const filteredVariants = variants.filter(variant => 
            variant.product.brand === brand
        );               
        res.json(filteredVariants);
        // res.json(variants);
    } catch(error){
        throw new Error(error);
    }
}

const shortSearch = async(req, res) => {
    try{
        const {search} = req.query;
        const variants = await Variant.find()
                    .populate({
                        path: 'product',
                        model: 'Product',
                        select: 'brand category -_id'
                    })
                    .populate({
                        path: 'attr_detail',
                        model: 'Attr_detail',
                        select: 'screen battery -_id'
                    })
                    .populate({
                        path: 'color_list',
                        model: 'Color',
                        select:'name price gallery -_id'
                    });
    }
    catch(error){
        throw new Error(error);
    }
}

const detailSearch = async(req, res) => {
    try{
        const {search} = req.query;
        const variants = await Variant.find()
                    .populate({
                        path: 'product',
                        model: 'Product',
                        select: 'brand category -_id'
                    })
                    .populate({
                        path: 'attr_detail',
                        model: 'Attr_detail',
                        select: 'screen battery -_id'
                    })
                    .populate({
                        path: 'color_list',
                        model: 'Color',
                        select:'name price gallery -_id'
                    });
    }
    catch(error){
        throw new Error(error);
    }
}

const getAttrDetailByID = async(req, res) => {
    try{
        const {id} = req.params;
        // console.log(id);
        const attrID = await Variant.findById(id).select('attr_detail');
        console.log(attrID.attr_detail);
        const attrDetail = await Attr_detail.findById(attrID.attr_detail);
        res.json(attrDetail);
    }
    catch(error){
        throw new Error(error);
    }
}

const searchVariant = async(req, res) => {
    try{
        const page = parseInt(req.query.page) - 1 || 0;

    }
    catch(error){
        throw new Error(error);
    }
}



module.exports = {getAllVariant, filterVariant, getAttrDetailByID};