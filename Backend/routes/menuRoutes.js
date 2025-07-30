const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');

const readData = () => {
  const jsonData = fs.readFileSync(dataPath);
  return JSON.parse(jsonData);
};

router.get('/', (req, res) => {
  try {
    const { menu } = readData();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: 'Error reading menu data.' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const { menu } = readData();
    const menuItem = menu.find(item => String(item.id) === req.params.id);
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error reading menu data.' });
  }
});

module.exports = router;