fetch('https://api.thecatapi.com/v1/images/search')
  .then(res => res.json())
  .then(data => console.log(data[0]))