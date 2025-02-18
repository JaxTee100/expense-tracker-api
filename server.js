require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const expenseRoutes = require('./routes/expense-routes');
const connectToDB = require('./database/db')

//run the connect to db function
connectToDB();

const app = express();
app.use(express.json());

//routes
app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
