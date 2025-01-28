const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;

    fs.appendFile('/tmp/messages.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving message');
        }
        res.send('Message saved successfully!');
    });
});

// Use the PORT environment variable or default to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
