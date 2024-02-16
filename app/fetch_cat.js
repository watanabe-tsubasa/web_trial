// fetch('https://api.thecatapi.com/v1/images/search')
//   .then(res => res.json())
//   .then(data => console.log(data[0]))

const getCatRes = async () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  })

  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const json = res.json();
    resolve(json)
    console.log('resolve!');
  } catch (error) {
    reject(error)
    console.log('reject!');
  }
  return promise
}

const main = async () => {
  const res = await getCatRes()
  console.log(res);
}

main();