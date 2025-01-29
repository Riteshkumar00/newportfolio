const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const data = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n\n`;

    fs.appendFile('./messages.txt', data, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving message');
        }
        console.log('Message saved:', data);
        res.send('Message saved successfully!');
    });
});

// Use the PORT environment variable or default to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




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




