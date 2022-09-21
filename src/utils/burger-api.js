const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngredientsApi = () => fetch(`${BURGER_API_URL}/ingredients`)
  .then(checkResponse)


export const getOrderNumber = (data) => fetch(`${BURGER_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: data
    }),
  })
  .then(checkResponse)
  .then(data => {
    if (data?.success) return data.order
    return Promise.reject(data)});

  