'use strict';

async function main() {
    const BASE_URL = "https://traininfo.jreast.co.jp/train_info/line.aspx?gid=1&lineid=yamanoteline"

    const res = await fetch(BASE_URL);
    const html = await res.text(); //ページ全体取得

    const statusText = html.match(/<p class="statusIcon"><img src="(.*?)<\/p>/)[1]; //トップ記事の要素取得
    const status = statusText.match(/alt="(.*?)">/)[1];
    
    //コンソールに表示
    console.log(status);
}

main();
