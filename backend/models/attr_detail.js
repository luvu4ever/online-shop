const mongoose = require('mongoose');

var attrDetailSchema = new mongoose.Schema({
    variant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
    },
    list_attr:{
        type: Array,
        required: true,
    },
    screen:{
        type: String,
        required: true,
    },
    battery:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Attr_detail', attrDetailSchema, 'attr_detail');