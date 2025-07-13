const express = require('express');
const cors = require('cors');
const products = require('./products.js');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/product/:barcode', (req, res) => {
    const product = products.find(p => p.barcode === req.params.barcode);
    if (product) {
        return res.json(product);
    } else {
        return res.status(404).json({ error: 'Not found Product' });
    }
});

const PORT = 3001;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
