LineBot Reminder with Heroku Scheduler
---
[![npmjs](https://badge.fury.io/js/%40line%2Fbot-sdk.svg)](https://www.npmjs.com/package/@line/bot-sdk)

A line-bot reminder builds on Heroku addon Scheduler

Requirements
---
* **Node.js** 4 or higher

Documents
---
* [Heroku create app](https://devcenter.heroku.com/articles/creating-apps)
* [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler)
* [Line Bot API](https://developers.line.me/en/docs/messaging-api/reference/)


Getting Start
---
### Install

Make a directory of linebot reminder
```bash
mkdir line-bot-reminder-demo
cd line-bot-reminder-demo
```

Build dependencies Using [npm](https://www.npmjs.com/):
```bash
npm init
```

Install line-bot-sdk-nodejs
```bash
npm install @line/bot-sdk --save
```

reminder.js
```javascript
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
```

### Deploy
Deploy to heroku using git
```bash
git init
git add .
git commit -m "First reminder."
```

Create heroku app and deploy
```bash
heroku create line-bot-reminder-demo
git push heroku master
```

Setting env
```bash
heroku config:set CHANNEL_ACCESS_TOKEN=your_channel_access_token
heroku config:set CHANNEL_SECRET=your_channel_secret
heroku config:set USER_ID=your_user_id
```

Setting addons
```bash
heroku addons:create scheduler:standard
heroku addons:open scheduler
```

On the Scheduler Dashboard, click "Add New Job"
Enter a task "node reminder.js"
Select a frequency and next run time
Done!

### Test Scheduler
```bash
heroku run node reminder.js
```

### View logs
```bash
heroku logs --ps scheduler.1
```
