const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    variant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
    },
    colorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
});

module.exports = mongoose.model('OrderItem', orderItemSchema);