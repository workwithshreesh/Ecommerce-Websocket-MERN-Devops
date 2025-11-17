const { router } = require('../utils/core/express');
// const productController = require('../controller/product');
const categoryController = require('../controller/category');
const middleware = require('../middleware/authMiddleware');

router.post('/category', middleware.verifyToken, middleware.isAdmin, categoryController.createCategory);
router.get('/category', middleware.verifyToken, middleware.isAdmin, categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id', middleware.verifyToken, middleware.isAdmin, categoryController.updateCategory);
// router.delete('/category/:id', middleware.verifyToken, middleware.isAdmin, categoryController.deleteProduct);

module.exports = router;