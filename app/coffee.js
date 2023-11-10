'use strict';

const main = async () => {
    const url = "https://app.rakuten.co.jp/services/api/Travel/SimpleHotelSearch/20170426?applicationId=1021449798821169301&largeClassCode=japan&middleClassCode=akita&smallClassCode=tazawa&format=json"
    const res = await fetch(url, {
      method: 'GET'
    });
    const data = await res.json();
    console.log(data.hotels[0].hotel[0].hotelBasicInfo);
}

main();