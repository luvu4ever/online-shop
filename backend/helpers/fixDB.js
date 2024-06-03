const Variant = require('../models/variantModel');
const AttrDetail = require('../models/attr_detail');
const AttrShort = require('../models/attr_short');
const dbConnect = require('../config/dbConnect');

dbConnect();

const addAttrtoVariant = async (req, res) => {
    try{
        const variants = await Variant.find({});
        const attr_detail_s = await AttrDetail.find({});
        const attr_short_s = await AttrShort.find({});
        // for (let variant of variants){
        //     for(let attr_detail of attr_detail_s){
        //         if(variant._id === attr_detail.variant){
        //             variant.attr_detail = attr_detail._id;
        //             await variant.save();
        //         }
        //     }
        //     for(let attr_short of attr_short_s){
        //         if(variant._id === attr_short.variant){
        //             variant.attr_short = attr_short._id;
        //             await variant.save();
        //         }
        //     }
        //     await variant.save();
        // }
        // res.json('done');
    } catch(error){
        throw new Error(error);
    }
}

addAttrtoVariant();