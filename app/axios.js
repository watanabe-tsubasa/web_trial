// const axios = require('axios');

const main = async () => {
  const res = await axios.get('https://qiita.com/api/v2/tags/javascript')
  console.log(res.data);
}

main();