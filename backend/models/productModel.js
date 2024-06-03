const mongoose = require('mongoose');

var productSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        brand:{
            type: String,
            unique: true,
            required: true,
        },
        attr_short:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'attr_short'
        },
        attr_detail:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'attr_detail'
        }
    },
    // {timestamps: true}
    {versionKey: false}
);

module.exports = mongoose.model('Product', productSchema);