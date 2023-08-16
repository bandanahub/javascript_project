const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
const dbUrl = 'your_db_url'; // Replace with your MongoDB connection string
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Model
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

// Routes

// User Registration
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Perform server-side validation here if needed

    const newUser = new User({
        name: name,
        email: email,
        password: password
    });

    try {
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ success: false });
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email, password: password });
        if (user) {
            // For simplicity, you can use sessions to maintain authentication
            req.session.user = user;
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false });
    }
});

// Product Data
const products = [
    {
        id: 1,
        name: 'Product A',
        imageUrl: 'product-a.jpg',
        price: 10.99,
        quantity: 20
    },
    {
        id: 2,
        name: 'Product B',
        imageUrl: 'product-b.jpg',
        price: 19.99,
        quantity: 15
    },
    // Add more products...
];

// Product Listing
app.get('/products', (req, res) => {
    res.json({ products: products });
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
