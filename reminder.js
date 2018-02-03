'use strict';
const line = require('@line/bot-sdk');

const defaultAccessToken = 'CHANNEL_ACCESS_TOKEN';
const defaultSecret = 'CHANNEL_SECRET';
const defaultUserId = 'USER_ID';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultAccessToken,
  channelSecret: process.env.CHANNEL_SECRET || defaultSecret,
};

// create LINE SDK client
const client = new line.Client(config);

// create user ID from env variable
const userId = process.env.USER_ID || defaultUserId;

let message = [
  {
    type: "text",
    text: "Hello world!"
  },
  {
    type: "sticker",
    packageId: "1",
    stickerId: "410"
  }
];

client
  .pushMessage(userId, message)
  .then(() => console.log({
    success: true,
    events: message
  }))
  .catch(err => console.log(err))
