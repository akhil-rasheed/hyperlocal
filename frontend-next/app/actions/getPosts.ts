const API_URL = "https://hyperlocal-backend.fly.dev/api";

const fetchData = async () => {
  const url = `${API_URL}/getAll`;
  const fetchedPosts = await (await fetch(url)).json();
  return fetchedPosts.data.reverse();
};

export default fetchData;
