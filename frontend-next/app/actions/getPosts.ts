const API_URL = "https://hyperlocal-backend.fly.dev/api";

const fetchData = async () => {
  const url = `${API_URL}/getAll`;
  console.log(url);
  const fetchedPosts = await (await fetch(url)).json();
  console.log(fetchedPosts.data.reverse());
  return fetchedPosts.data.reverse();
};

export default fetchData;
