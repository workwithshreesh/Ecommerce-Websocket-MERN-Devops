module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    'Address',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Table name
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{10}$/,
        }
      },

      pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      landmark: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      addressType: {
        type: DataTypes.ENUM('home', 'office', 'other'),
        defaultValue: 'home',
      },

      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'addresses',
      timestamps: true,
    }
  );

  Address.associate = (models) => {
    Address.belongsTo(models.Users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
    });

    Address.hasMany(models.Order, {
      foreignKey: 'addressId',
      as: 'ordersAddress',
      onDelete: 'SET NULL',
    });
  };

  return Address;
};
