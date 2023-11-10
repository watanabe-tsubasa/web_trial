const fetchQiitaTagInfo = async (tagName) => {
  try {
    const apiUrl = `https://qiita.com/api/v2/tags/${tagName}`;
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data from Qiita API for tag: ${tagName}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const main = async () => {
  const tagName = 'nodejs'; // ここに取得したいタグ名を指定してください
  try {
    const tagInfo = await fetchQiitaTagInfo(tagName);
    console.log(`Tag Name: ${tagInfo.id}`); // タグ名は id プロパティになります
    console.log(`Followers Count: ${tagInfo.followers_count}`);
    console.log(`Items Count: ${tagInfo.items_count}`);
    // 他の情報も必要に応じて表示できます
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

main();
