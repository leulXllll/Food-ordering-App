const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);


app.listen(PORT, () => {  console.log(`Server is running on port ${PORT}`);
});
  