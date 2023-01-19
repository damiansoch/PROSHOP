import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   post /api/ordersroducts
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.lenght === 0) {
    res.status(400);
    throw new Error('No order items');
    return;
  } else {
    //creating order
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    //daving in database
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});
