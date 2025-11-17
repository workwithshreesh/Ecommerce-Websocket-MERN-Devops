const { router } = require('../utils/core/express');
const addressController = require('../controller/address');
const middleware = require('../middleware/authMiddleware');

router.post('/address', middleware.verifyToken, middleware.isAdmin, addressController.addAddress);
router.get('/address', middleware.verifyToken, middleware.isAdmin, addressController.UpdateAddress);
router.get('/address', middleware.verifyToken, middleware.isAdmin, addressController.findAddressByUser);
router.put('/address/:id', middleware.verifyToken, middleware.isAdmin, addressController.findAddressById);
router.delete('/address/:id', middleware.verifyToken, middleware.isAdmin, addressController.deleteAddress);

module.exports = router;