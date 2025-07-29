require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();

// set routes
app.use('/api/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/accounts', require('./routes/accounts'));
app.use('/transactions', require('./routes/transactions'));

// start the server
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})


