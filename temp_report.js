// ########################################
//          obniz処理部分
//  Obniz_ID：自分のobniz ID（XXXX-XXXX）
// ########################################
const Obniz = require('obniz');
const obniz = new Obniz('Obniz_ID');
// obnizと接続確立したとき
obniz.onconnect = async () => {
  obniz.display.clear();
  obniz.display.print('obniz Ready');
}
// 温度センサから値を取得して返す
const getObnizTemp = async () => {
  // 温度センサの利用
  const tempsens = obniz.wired('LM60', { gnd: 0, output: 1, vcc: 2 });
  // 非同期で取得
  const temp = await tempsens.getWait();
  // ターミナル表示
  console.log('obniz temp:', temp);
  // obnizディスプレイ表示
  obniz.display.clear();
  obniz.display.print(temp + ' C');
  // 温度値を返す
  return temp;
}

// ########################################
//          LINEBot イベント処理部分
//  channelSecret：LINE Developers → チャネル基本設定 → チャネルシークレット
//  channelAccessToken：LINE Developers → Messaging API設定 → チャネルアクセストークン（長期）
//  ターミナルで `ngrok http 3000` 実行後、発行されたURLをWebhook URLとして設定するのを忘れずに
//  「検証」ボタンをクリックするとターミナルにエラーが出ますがここでは問題ありません（検証イベントのハンドリングをしていないため）
// ########################################
const config = {
  channelSecret: 'channelSecret',
  channelAccessToken: 'channelAccessToken'    
};
const line = require('@line/bot-sdk');
const client = new line.messagingApi.MessagingApiClient(config);
// ExpressからMessaging APIイベントを渡されて処理するところ
const handleEvent = async (event) => {
  // テキストメッセージ以外を受信したときは何も行わずresolveを返す
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  // テキストメッセージを受信したとき
  if (event.message.text === '温度教えて') {
    // 待ってねというメッセージを「リプライ」で先に返す
    await client.replyMessage({
      replyToken: event.replyToken,
      messages: [{
        type: 'text',
        text: '.oO（ちょっと調べてきますねー。）'
      }]
    });
    // obnizの温度センサから値をとってくる（ブロッキング・時間のかかる処理で一旦ここで止まる）
    const temp = await getObnizTemp();
    // tempが取得できたらそれを含めたメッセージを「プッシュ」で送信する
    client.pushMessage({
      to: event.source.userId,
      messages:[{
        type: 'text',
        text: '今の温度は' + temp + '度ですねー。',
      }]
    });
  } else {
    // メッセージの中身が「温度教えて」以外だったとき
    client.replyMessage(event.replyToken, {
      type: 'text',
      text: '「温度教えて」と話しかけてね！'
    });
  }
  // resolveを返す
  return Promise.resolve(null);
}

// ########################################
//          Expressサーバー部分
// ########################################
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
// 「(サーバーURL)/webhook」にアクセス（LINEサーバーからのWebhook）があったとき
app.post('/webhook', line.middleware(config), (req, res) => {
  // 受信したイベントをターミナルに表示
  console.log(req.body.events);
  // イベントをhandleEventに渡して1つずつ処理
  Promise.all(
    req.body.events.map(handleEvent)
  ).then(
    result => res.json(result)
  );
});
// PORT番号のポートでサーバーを開始
app.listen(PORT);
console.log('express runnning: PORT =', PORT);