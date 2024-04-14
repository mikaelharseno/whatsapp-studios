const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const port = 3000;

// Create a new client instance
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable',
    }
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

// Start your client
client.initialize();

const app = express();
app.use(express.json()) // for parsing application/json

app.get('/', (req, res) => {
    res.send('hello world');
})

app.post('/send-message', (req, res) => {
    console.log(req.body)
    res.send('hello world');
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// async function sendNewMessageWithTimeout(customerNumber, message, timeout = 3000) {
//   var paramsMain = { 
//     "chatId": customerNumber + "@c.us",
//     "contentType": "string",
//     "content": message
//   };
// }

// async function sendSheepGif(customerNumber) {
//   var paramsMain = { 
//     "chatId": customerNumber + "@c.us",
//     "contentType": "MessageMediaGif",
//     "content": "Send GIF"
//   };
// }

// async function sendImage(customerNumber, imageUrl, timeout = 3000) {
//   var paramsMain = { 
//     "chatId": customerNumber + "@c.us",
//     "contentType": "MessageMediaFromURL",
//     "content": imageUrl,
//   };
// }