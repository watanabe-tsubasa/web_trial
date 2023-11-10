'use strict';

const main = async () => {
  const url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?applicationId=1021449798821169301&keyword=fallout&format=json"
  // Rakuten ichiba APIに「HTTP GET」という形式で「リクエスト」を送り、「レスポンス」を受け取ります。
  const res = await fetch(url, {
    method: 'GET'
  });
  const data = await res.json();
  // ターミナルに受け取った結果を出力します。
  console.log(data.Items);
}

// 上で定義した関数をここで実行します。
main();