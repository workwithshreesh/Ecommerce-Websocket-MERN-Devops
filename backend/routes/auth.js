const { router } = require('../utils/core/express');
const authController = require('../controller/auth');
const middleware = require('../middleware/authMiddleware');

router.post('/signup',  authController.register);
router.post('/login', authController.login);

module.exports = router;

