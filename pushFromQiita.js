const line = require('@line/bot-sdk');
const dotenv = require('dotenv'); //dotenv使うときはコメントアウト外してください
dotenv.config();

// Messaging APIを利用するための鍵を設定します。
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || 'CHANNEL_ACCESS_TOKEN',
  channelSecret: process.env.CHANNEL_SECRET || 'CHANNEL_SECRET'
};

const client = new line.messagingApi.MessagingApiClient(config);

const main = async () => {
    const result = await fetch(
        'https://qiita.com/api/v2/tags/JavaScript' //この部分を打ち替えて取得するデータを変更する
    );
    const data = await result.json();
    const text = `Qiitaでの${data.id}タグフォロワー数は${data.followers_count}です`; //この部分を打ち替えて取得したJSONを操作する

    const messages = [{
        type: 'text',
        text: text
    }];

    try {
        const res = await client.broadcast({messages});
        console.log(res);
    } catch (error) {
        console.log(`エラー: ${error.statusMessage}`);
        console.log(error.originalError.response.data);
    }
}

main();