const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');
const sequelize = require('../connection/mysqlConn');

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(db));

db.sequelize = sequelize;

module.exports = db;
