// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/contact', (req, res) => {
//     const { name, email, subject, message } = req.body;
//     const data = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;

//     fs.appendFile('/tmp/messages.txt', data, (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error saving message');
//         }
//         res.send('Message saved successfully!');
//     });
// });

// // Use the PORT environment variable or default to port 3000
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });




// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const app = express();

// // Use body-parser middleware to parse form data
// app.use(bodyParser.urlencoded({ extended: true }));

// // Handle form submission at /contact
// app.post('/contact', (req, res) => {
//     const { name, email, subject, message } = req.body;
//     const data = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;

//     // Write the data to messages.txt (locally)
//     fs.appendFile('messages.txt', data, (err) => {
//         if (err) {
//             console.error('Error writing to file:', err);
//             return res.status(500).send('Error saving message');
//         }
//         console.log('Message saved:', data); // Log to console for verification
//         res.send('Message saved successfully!');
//     });
// });

// // Start the server on port 3000
// app.listen(3000, () => {
//     console.log('Server running on http://localhost:3000');
// });





const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config(); // For local environment variables

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = process.env.MONGODB_URI; // Use the environment variable for MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });

// Define a schema and model for form data
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// Handle form submission at /contact
app.post('/contact', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // Save the form data to MongoDB
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();

        console.log('Message saved to MongoDB:', newMessage);
        res.send('Message saved successfully!');
    } catch (err) {
        console.error('Error saving message to MongoDB:', err);
        res.status(500).send('Error saving message');
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});



