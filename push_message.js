'use strict';

const line = require('@line/bot-sdk');
const dotenv = require('dotenv');
dotenv.config();

// Messaging APIを利用するための鍵を設定します。
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'CHANNEL_ACCESS_TOKEN',
  channelSecret: process.env.CHANNEL_SECRET || 'CHANNEL_SECRET'
};
const client = new line.messagingApi.MessagingApiClient(config)


const main = async () => {

    const messages = [{
        type: 'text',
        text: 'いっせい送信です！' // ここに書いてある言葉が一斉送信されます
    }];

    try {
        const res = await client.pushMessage({
          to: '<to>',
          messages:messages
        });
        console.log(res);        
    } catch (error) {
        console.log(`エラー: ${error.statusMessage}`);
        console.log(error.originalError.response.data);
    }
}

main();