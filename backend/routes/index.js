const { app, express } = require('../utils/core/express');
const productRoutes = require('./product');
const orderRoutes = require('./order');
const authRoutes = require('./auth');
const cartRoutes = require('./cart');
const address = require('./address');
const category = require("./category");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the imported routers
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', authRoutes);
app.use('/api', cartRoutes);
app.use('/api', address);
app.use('/api',category);

module.exports = app;