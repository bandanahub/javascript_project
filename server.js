const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_db_url' with your actual MongoDB connection string)
mongoose.connect('your_db_url', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a User model (replace with your actual user schema)
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
// ... (existing code) ...

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
