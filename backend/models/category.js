module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
          args: [3, 100],
          msg: 'Category name must be between 3 and 100 characters'
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
  }, {
    tableName: 'Categories',
    timestamps: true
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: 'categoryId',
      as: 'products'
    });

    Category.belongsTo(models.Users, {
      foreignKey: 'createdBy',
      as: 'creator'
    });
  };

  return Category;
};
