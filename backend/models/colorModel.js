const moongose = require('mongoose');

var colorSchema = new moongose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        variant:{
            type: moongose.Schema.Types.ObjectId,
            ref: 'Variant'
        },
        price:{
            type: Number,
            required: true,
        },
        gallery:{
            type: Array,
            required: true,
        }
    }
);

module.exports = moongose.model('Color', colorSchema);