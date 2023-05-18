const API_URL = "http://localhost:8080/api";

const fetchData = async () => {
  const url = `${API_URL}/getAll`;
  console.log(url);
  const fetchedPosts = await (await fetch(url)).json();
  console.log(fetchedPosts.data.reverse());
  return fetchedPosts.data.reverse();
};

export default fetchData;
