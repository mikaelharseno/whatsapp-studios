const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
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

app.post('/send-message', async (req, res) => {
    const chatId = req.body.chatId;
    const contentType = req.body.contentType;
    const content = req.body.content;

    console.log(req);
    if (contentType === 'string') {
        const messageOut = await client.sendMessage(chatId, content);
        console.log(messageOut);
    } else if (contentType === 'MessageMediaGif') {
        const messageMediaFromFilePath = await MessageMedia.fromFilePath("/home/ec2-user/whatsapp-studios/sheep.mp4");
        const messageOut = await client.sendMessage(chatId, messageMediaFromFilePath, {"sendVideoAsGif": true});
        console.log(messageOut);
    } else if (contentType === "MessageMediaFromURL") {
        const messageMediaFromURL = await MessageMedia.fromUrl(content, { unsafeMime: true })
        const messageOut = await client.sendMessage(chatId, messageMediaFromURL);
        console.log(messageOut);
    }

    res.send({
        'success': false
    });
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
