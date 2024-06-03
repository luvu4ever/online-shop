const mongoose = require('mongoose');

var variantSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    full_name:{
        type: String,
        // required: true,
    },
    short_name:{
        type: String,
        // required: true,
    },
    color_list:
        [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'}],
    attr_short:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attr_short'
    },
    attr_detail:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attr_detail'
    }
});

module.exports = mongoose.model('Variant', variantSchema);