const express = require('express');
const line = require('@line/bot-sdk');
// const dotenv = require('dotenv'); //dotenv使うときはコメントアウト外してください
// dotenv.config();

// Messaging APIを利用するための鍵を設定します。
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'CHANNEL_ACCESS_TOKEN',
  channelSecret: process.env.CHANNEL_SECRET || 'CHANNEL_SECRET'
};

const client = new line.messagingApi.MessagingApiClient(config);
const handleEvent = async (event) => {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [{
      type: 'text',
      text: event.message.text// ← ここに入れた言葉が実際に返信されます
      // event.message.text には、受信したメッセージが入っているので、それをそのまま返信しています
      // ここを 'テスト' のように書き換えると、何を受信しても「テスト」と返すようになります
    }],
  });
}

// ここ以降は理解しなくてOKです
const port = process.env.PORT || 3000;
const app = express()
  .get('/', (_, res) => res.send('hello LINE Bot'))
  .post('/webhook', line.middleware(config), (req, res) => {
    if (req.body.events.length === 0) {
      res.send('Hello LINE BOT! (HTTP POST)');
      console.log('検証イベントを受信しました');
      return
    } else {
      console.log(req.body.events);
    }
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
  })
app.listen(port);
console.log(`PORT${port}番でサーバーを実行中です`)