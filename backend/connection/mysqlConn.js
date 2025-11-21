require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log(process.env.DB_PASSWORD)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'mysql',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
  }
);

// Test connection
sequelize.authenticate()
  .then(() => console.log('MySQL Connected Successfully'))
  .catch(err => console.error('MySQL Connection Error:', err));

module.exports = sequelize;
