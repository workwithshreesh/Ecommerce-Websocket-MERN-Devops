require('dotenv').config({ quiet: true });

const app = require('./app');
const { server } = require('./connection/socketConn')

const PORT = process.env.APP_PORT


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))