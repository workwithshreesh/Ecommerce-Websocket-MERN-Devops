const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'First name must be between 3 and 50 characters',
          },
        },
      },
      lname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 50],
            msg: 'Last name must be between 3 and 50 characters',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isStrongPassword(value) {
            const strongRegex =
              /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!strongRegex.test(value)) {
              throw new Error(
                'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.'
              );
            }
          },
        },
      },
      role: {
        type: DataTypes.ENUM('user', 'admin', 'delivery'),
        defaultValue: 'user',
      },
    },
    {
      tableName: 'Users',
      timestamps: true,
      underscored: false,
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );

  return Users;
};


