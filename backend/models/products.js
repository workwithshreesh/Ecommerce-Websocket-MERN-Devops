module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 150],
                    msg: 'Product name must be between 3 and 150 characters'
                }
            }
        },

        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'Price must be a positive number'
                }
            }
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Stock must be an integer'
                },
                min: {
                    args: [0],
                    msg: 'Stock must be a non-negative integer'
                }
            }
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [50, 500],
                    msg: 'Description must be between 50 and 500 characters'
                }
            }
        }
    });

    Product.associate = models => {
        Product.hasMany(models.ProductImage, { foreignKey: 'productId', as: 'ProductImages' });
        Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
        Product.belongsTo(models.Users, { foreignKey: 'createdBy', as: 'creator' });
    }

    return Product;
};
