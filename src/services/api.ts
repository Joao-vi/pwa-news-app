const params = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const URL = "http://localhost:3000/api";
export function getNews(subject: string) {
  return fetch(`${URL}/${subject}`, params)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function getNewsById(subject: string, id: string) {
  try {
    const response = await fetch(`${URL}/${subject}/${id}`, params);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}
