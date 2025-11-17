const { router } = require('../utils/core/express');
const productController = require('../controller/product');
const middleware = require('../middleware/authMiddleware');
const upload = require('../middleware/photoMiddleware');

router.post('/product', middleware.verifyToken, middleware.isAdmin, upload.single('image'), productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);
router.put('/product/:id', middleware.verifyToken, middleware.isAdmin, productController.updateProduct);
router.delete('/product/:id', middleware.verifyToken, middleware.isAdmin, productController.deleteProduct);

module.exports = router;
