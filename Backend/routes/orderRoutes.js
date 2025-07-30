const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

router.post('/', (req, res) => {
  try {
    const { items } = req.body; 

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order must include at least one item.' });
    }

    const data = readData();
    let totalPrice = 0;
    const orderItems = [];

    for (const orderItem of items) {
      const menuItem = data.menu.find(item => String(item.id) === String(orderItem.id));
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item with ID ${orderItem.id} not found.` });
      }
      totalPrice += menuItem.price * orderItem.quantity;
      orderItems.push({
        itemId: menuItem.id,
        name: menuItem.name,
        quantity: orderItem.quantity,
        price: menuItem.price
      });
    }

    const newOrder = {
      id: Date.now(), 
      items: orderItems,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    data.orders.push(newOrder);
    writeData(data);

    res.status(201).json(newOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error processing order.' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { orders } = readData();
    const order = orders.find(o => String(o.id) === req.params.id);

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error reading order data.' });
  }
});

module.exports = router;