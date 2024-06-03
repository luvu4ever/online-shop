const mongoose = require('mongoose');

var attrShortSchema = new mongoose.Schema({
    variant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant'
    },
    list_attr:{
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('Attr_short', attrShortSchema, 'attr_short');