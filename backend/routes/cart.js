const { router } = require('../utils/core/express');
const cartController = require('../controller/cart');
const middleware = require('../middleware/authMiddleware');

router.post('/cart', middleware.verifyToken, middleware.isAdmin, cartController.addToCart);
router.get('/cart', cartController.getCart);
// router.get('/cart/:id', cartController.getProductById);
router.delete('/cart/:id', middleware.verifyToken, middleware.isAdmin, cartController.removeFromCart);
// router.delete('/cart/:id', middleware.verifyToken, middleware.isAdmin, productController.deleteProduct);

module.exports = router;