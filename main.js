const express = require('express')

const line = require('@line/bot-sdk');

const dotenv = require('dotenv').config()

const config = {
    channelAccessToken: process.env.CHANNEL_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}
const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});
const client = new line.Client(config)
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null)
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    })
}
console.log('running...')
app.listen(3000)