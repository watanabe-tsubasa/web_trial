fetch('https://qiita.com/api/v2/tags/javascript')
 .then(res => res.json())
 .then(data => console.log(data))
 .catch((error) => {
  console.error(error);
  });