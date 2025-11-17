module.exports = (sequelize, DataTypes) => {
    const ProductImage = sequelize.define('ProductImage', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,   
            primaryKey: true
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productId: {  
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, { 
        tableName: 'ProductImages',
        timestamps: true 
    });

    ProductImage.associate = (models) => {
        ProductImage.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: "product",
            onDelete: 'CASCADE'
        });
    };

    return ProductImage;
}
