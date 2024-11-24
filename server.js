const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like index.html)

// In-memory data store
let items = [];

// GET: Retrieve all items
app.get('/items', (req, res) => {
    res.json(items);
});

// POST: Add a new item
app.post('/items', (req, res) => {
    const { item } = req.body;
    items.push(item);
    res.status(201).json({ message: 'Item added', item });
});

// PUT: Update an item
app.put('/items/:index', (req, res) => {
    const { index } = req.params;
    const { item } = req.body;
    if (items[index]) {
        items[index] = item;
        res.json({ message: 'Item updated', item });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE: Remove an item
app.delete('/items/:index', (req, res) => {
    const { index } = req.params;
    if (items[index]) {
        items.splice(index, 1);
        res.json({ message: 'Item deleted' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// ADDITION : adding two numbers
app.post('/add', (req, res) => {
    const { num1, num2 } = req.body;
    if (!isNaN(num1) && !isNaN(num2)) {
        const sum = num1 + num2;
        res.json({ sum });
    } else {
        res.status(400).json({ message: 'Invalid numbers provided' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
