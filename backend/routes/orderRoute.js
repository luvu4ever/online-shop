const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderCtrl');
const { verify } = require('jsonwebtoken');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.get(`/`, orderController.getAllOrders);
// router.get(`/:id`, getOrderById);
// router.post(`/`, createOrder);

router.post(`/`, orderController.createOrder);
// router.get(`/:id`, getOrderById);
router.put(`/:id`, orderController.updateOrder);
router.put(`/status/:id`, orderController.changeOrderState);
// router.delete(`/:id`, deleteOrder);
// router.get(`/state/:state`, filterByState);

router.get("/orderUser/getAll", verifyAccessToken, orderController.getUserOrders)

module.exports = router;

