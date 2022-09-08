const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default function getIngredients () {
  return fetch(`${BURGER_API_URL}/ingredients`)
  .then(checkResponse)
  .then(data => {
    if (data?.success) return data.data;
    return Promise.reject(data)
  })
};