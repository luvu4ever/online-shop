const OrderItem = require('../models/order-item');
const Order = require('../models/orderModel');
const Variant = require('../models/variantModel');
const Color = require('../models/colorModel');
const sendMail = require('../utils/sendMail');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    if(!req.body || Object.keys(req.body).length === 0)
        throw new Error('No order data provided');
    const orderItemsIds = Promise.all(req.body.orderItems.map(async(orderItem) => {
        let newOrderItem = new OrderItem({
            variant: orderItem.variant,
            quantity: orderItem.quantity,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved = await orderItemsIds;

    let order = new Order({ 
        products_variant: orderItemsIdsResolved,
        user: req.body._id,
        customer_name: req.body.customer_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        address: req.body.address,
        state: req.body.state,
        note: req.body.note,
    })
    order = await order.save();
    const html =
    `<style>
    h3 {
            color: blue;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            color: #333;
        }
        strong {
            font-weight: bold;
        }
    </style>

    <h3>Đơn hàng của bạn đã được đặt thành công</h3>
    
    <p>Xin Chào ${order.customer_name}</p>
    <p>Chúng tôi đã tiếp nhận và xử lý đơn hàng <strong>${order._id} </strong></p>

    <h2>Thông tin khách hàng</h2>
    <p><strong>Tên:</strong> ${order.customer_name}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Số điện thoại:</strong> ${order.phone_number}</p>
    <p><strong>Địa chỉ giao hàng:</strong> ${order.address}</p>

    <h2>Thông tin đơn hàng</h2>
    <p><strong>Ghi chú:</strong> ${order.note}</p>
    <p><strong>Trạng thái:</strong> ${order.status}</p>

    <h2>Chi tiết đơn hàng</h2>
    <table border="1" cellpadding="10" cellspacing="0">

    <p>Cảm ơn bạn đã mua hàng tại cửa hàng chúng tôi</p>
`;

    if(!order)
        return res.status(400).send('The order cannot be created!')
    res.send(order);
    const subject = `Đơn hàng của bạn đã được đặt thành công`;
    const data = {
        to: order.email,
        html,
        subject,
    };
    await sendMail(data);
    res.status(201).json({ success: true, data: order });
});

const getAllOrders = asyncHandler(async (req, res) => {
    // const orderList = await Order.find().populate('products_variant');
    try{
        const orders = await Order.find({});
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch(error){
        throw new Error(error);
    }
})

// const getOrderById = asyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id).populate('products_variant');

//     if(!order)
//         return res.status(500).json({message: 'The order with the given ID was not found.'})
//     res.status(200).send(order);
// });

const getOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('products_variant');
    console.log(order);
    for(let i = 0; i < order.products_variant.length; i++){
        let item = await Variant.findById(order.products_variant[i].variant).select('-id');
        let color = await Color.findById(item.color_list[0]).select('-id');
        order.products_variant[i].variant = {item, color};
    }
    res.send(order);
});

const changeOrderState = asyncHandler(async (req, res) => {
    const order = await Order.findByID(req.params.id)
    if(!order)
        return res.status(400).send('The order cannot be updated!')
    order.state = req.body.state;
    await order.save();

    res.status(200).send({success: true, data: order});
});

const deleteOrder = asyncHandler(async (req, res) => {
    Order.findByIdAndRemove(req.params.id)
    .then(order => {
        if(order) {
            order.products_variant.map(async orderItem => {
                order.products_variant.map(async orderItem => {
                    await OrderItem.findByIdAndRemove(orderItem);
                });
            })
            return res.status(200).json({success: true, message: 'The order is deleted!'});
        } else {
            return res.status(404).json({success: false, message: 'Order not found!'});
        }
    })
})

const filterByState = asyncHandler(async (req, res) => {
    const orderList = await Order.find({state: req.params.state});

    if (!orderList) {
        return res.status(500).json({success: false});
    }
    res.send(orderList);
});

const updateOrder = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        res.status(404);
        throw new Error('Không tìm thấy đơn hàng này');
    }

    order.customer_name = req.body.customer_name || order.customer_name;
    order.email = req.body.email || order.email;
    order.phone_number = req.body.phone_number || order.phone_number;
    order.address = req.body.address || order.address;
    order.state = req.body.state || order.state;
    order.note = req.body.note || order.note;

    await order.save();
    res.status(200).json({ success: true, data: order });
});

const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    if(!orders){
        res.status(404);
        throw new Error('Không tìm thấy đơn hàng nào');
    }

    res.status(200).json({ success: true, data: orders });
});

module.exports = { 
    getAllOrders, 
    createOrder, 
    // getOrderById, 
    getOrder, 
    updateOrder,
    deleteOrder, 
    changeOrderState,
    getUserOrders,
};