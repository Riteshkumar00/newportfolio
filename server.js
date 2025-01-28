const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;

    fs.appendFile('messages.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving message');
        }
        res.send('Message saved successfully!');
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
