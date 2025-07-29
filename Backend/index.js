const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();



app.listen(PORT, () => {  console.log(`Server is running on port ${PORT}`);
});
  