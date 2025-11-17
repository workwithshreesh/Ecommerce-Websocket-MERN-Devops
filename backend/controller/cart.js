const { Cart, Product } = require('../models');
const handleErrorRes = require('../utils/error-success-res/errorRes');
const handleSuccessRes = require('../utils/error-success-res/successRes');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) return handleErrorRes(res, 404, 'Product not found');
    const existing = await Cart.findOne({ where: { userId, productId } });
    if (existing) {
      existing.quantity += quantity || 1;
      await existing.save();
      return handleErrorRes(res, 200, existing);
    }

    const cart = await Cart.create({ userId, productId, quantity });
    return handleSuccessRes(res, 201, cart);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, as: 'product' }]
    });
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const deleted = await Cart.destroy({ where: { id, userId } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Item removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
