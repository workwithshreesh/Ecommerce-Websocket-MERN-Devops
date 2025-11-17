module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: {
      type: DataTypes.ENUM('pending', 'despatched', 'ontheway', 'delivered'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.ENUM('COD'),
      defaultValue: 'COD'
    },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    deliveryBoyId: { type: DataTypes.INTEGER, allowNull: true }
  }, { tableName: 'Orders', timestamps: true });

  Order.associate = models => {
    Order.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    Order.belongsTo(models.Users, { foreignKey: 'deliveryBoyId', as: 'deliveryBoy' });
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'items' });
  };

  return Order;
};
