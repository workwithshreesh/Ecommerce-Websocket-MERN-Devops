require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "pass123",
    database: process.env.DB_NAME || "ecommerce",
    host: process.env.DB_HOST || "mysql",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql"
  }
};
