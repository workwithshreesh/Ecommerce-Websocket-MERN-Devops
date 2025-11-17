socket.on('accept-order', async ({ orderId }) => {
    const order = await db.Order.findByPk(orderId);

    if (!order) return socket.emit('error', 'Order not found');
    if (order.status !== 'pending') return socket.emit('error', 'Order already accepted');

    order.status = 'accepted';
    order.deliveryUserId = socket.user.id;
    await order.save();

    io.emit('order-accepted', {
        orderId: order.id,
        deliveryUser: { id: socket.user.id, name: socket.user.fname }
    });
});
