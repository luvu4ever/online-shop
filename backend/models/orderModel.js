const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            unique: false,
        },
        products_variant:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: true,
        }],
        customer_name:{
            type: String,
            required: true,
            trim: true,
            unique: false,
        },
        email:{
            type: String,
            required: true,
        },
        phone_number:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        state:{
            type: String,
            required: true,
            default: "Checking"
        },
        note:{
            type: String,
            default: "",
        },  
        date:{
            type: Date,
            default: Date.now,
        },
    }
);

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Order', orderSchema, "orders");

// {
//     "orderItems" : [
//         {
//             "quantity": 3,
//             "variant" : "660cf39446687e7871787a60"
//         },
//         {
//             "quantity": 2,
//             "variant" : "660cf478741a5727c1021de4"
//         }
//     ],
//     "customer_name": "Luong Tien Dung",
//     "email": "testuser@example.com",
//     "phone_number": "99999999999",
//     "address": "test address",
//     "state": "preparing",
//     "note": "áddddfsgdf"
// }