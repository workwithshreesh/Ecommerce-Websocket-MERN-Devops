'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    // ------------------ USERS ------------------
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      fname: { type: Sequelize.STRING, allowNull: false },
      lname: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      role: {
        type: Sequelize.ENUM('user', 'admin', 'delivery'),
        defaultValue: 'user'
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });


    // ------------------ CATEGORIES ------------------
    await queryInterface.createTable('Categories', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },

      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },

      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });


    // ------------------ PRODUCTS ------------------
    await queryInterface.createTable('Products', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      name: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.FLOAT, allowNull: false },
      stock: { type: Sequelize.INTEGER, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },

      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Categories', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },

      createdBy: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },

      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });


    // ------------------ PRODUCT IMAGES ------------------
    await queryInterface.createTable('ProductImages', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      imageUrl: { type: Sequelize.STRING, allowNull: false },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });


    // ------------------ ADDRESSES ------------------
    await queryInterface.createTable('addresses', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      fullName: { type: Sequelize.STRING, allowNull: false },
      phoneNumber: { type: Sequelize.STRING, allowNull: false },
      pincode: { type: Sequelize.STRING, allowNull: false },
      state: { type: Sequelize.STRING, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      street: { type: Sequelize.STRING, allowNull: false },
      landmark: { type: Sequelize.STRING, allowNull: true },

      addressType: {
        type: Sequelize.ENUM('home', 'office', 'other'),
        defaultValue: 'home'
      },

      isDefault: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });


    // ------------------ ORDERS ------------------
    await queryInterface.createTable('Orders', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      deliveryBoyId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'addresses', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      status: {
        type: Sequelize.ENUM('pending', 'despatched', 'ontheway', 'delivered'),
        defaultValue: 'pending'
      },

      paymentMethod: {
        type: Sequelize.ENUM('COD'),
        defaultValue: 'COD'
      },

      totalAmount: { type: Sequelize.FLOAT, allowNull: false },

      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });


    // ------------------ ORDER ITEMS ------------------
    await queryInterface.createTable('OrderItems', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Orders', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      quantity: { type: Sequelize.INTEGER, allowNull: false },
      price: { type: Sequelize.FLOAT, allowNull: false },

      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });


    // ------------------ CART ------------------
    await queryInterface.createTable('Cart', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },

      quantity: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },

      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      productId: {
        type: Sequelize.INTEGER,
        references: { model: 'Products', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },

      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });



  },

  async down(queryInterface) {

    await queryInterface.dropTable('OrderItems');
    await queryInterface.dropTable('addresses');
    await queryInterface.dropTable('Orders');
    await queryInterface.dropTable('Cart');
    await queryInterface.dropTable('ProductImages');
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Categories');
    await queryInterface.dropTable('Users');

  }
};
