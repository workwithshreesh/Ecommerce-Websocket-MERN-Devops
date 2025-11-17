const { Order, OrderItem, Cart, Product } = require('../models');
const handleErrorRes = require('../utils/error-success-res/errorRes');
const handleSuccessRes = require('../utils/error-success-res/successRes');
const { io } = require('../connection/socketConn');

exports.placeOrder = async (req, res) => {
  const transaction = await Order.sequelize.transaction();

  try {
    const userId = req.user.id;
    const { addressId } = req.body;

    console.log(userId)

    // Fetch cart with product details
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: 'product' }]
    });

    

    if (!cartItems.length) {
      return handleErrorRes(res, 400, 'Cart is empty');
    }

    // Calculate total
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    // Create Order
    const order = await Order.create({
      userId,
      addressId,
      totalAmount,
      paymentMethod: 'COD'
    }, { transaction });


console.log(order)
    // Prepare Order Items
    const orderItems = cartItems.map((item) => ({
      orderId: order.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price
    }));

    // Insert order items
    await OrderItem.bulkCreate(orderItems, { transaction });

    // Clear cart
    await Cart.destroy({ where: { userId }, transaction });

    // Commit transaction
    await transaction.commit();

    // Emit via WebSocket
    io.to('delivery-room').emit('new-order', {
      orderId: order.id,
      totalAmount,
      addressId,
      items: orderItems,
      user: {
        id: req.user.id,
        name: req.user.fname
      }
    });

    return handleSuccessRes(res, 201, order);

  } catch (error) {
    await transaction.rollback();
    return handleErrorRes(res, 500, error.message || 'Internal server error');
  }
};



exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Dispatched', 'OnTheWay', 'Delivered'];
    if (!validStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });

    const order = await Order.findByPk(id);
    if (!order) return handleErrorRes(res, 404, "Order not found");

    order.status = status;
    await order.save();

    // res.json({ success: true, message: 'Order status updated', data: order });
    return handleSuccessRes(res, 200, order);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: OrderItem, as: 'orderItems', include: ['product'] }],
      order: [['createdAt', 'DESC']]
    });
    // res.json({ success: true,  });
    return handleSuccessRes(res, 200, orders);
  } catch (error) {
    handleErrorRes(res, 500, error.message || "Internal server error");
  }
};


exports.allOrders = async (req, res) => {

  try {

    const orders = await Order.findAll({
      include: [{ model: OrderItem, as: 'orderItems', include: ['product'] }],
      order: [['createdAt', 'DESC']]
    })
    return handleSuccessRes(res, 200, orders);

  } catch (error) {
    handleErrorRes(res, 500, error.message || "Internal server error");
  }

}
