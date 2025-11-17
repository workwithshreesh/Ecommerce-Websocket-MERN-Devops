const order = require('../controller/order');
const { router } = require('../utils/core/express');
const middleware = require('../middleware/authMiddleware');

router.post('/order', middleware.verifyToken, order.placeOrder);
router.get('/orders', middleware.verifyToken, order.allOrders);
router.get('/order', middleware.verifyToken, order.getUserOrders);
router.put('/order/:id', middleware.verifyToken, order.updateOrderStatus);

module.exports = router;