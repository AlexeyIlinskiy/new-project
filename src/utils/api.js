import { getCookie } from './cookies';
const api = 'https://norma.nomoreparties.space/api';

//Обрабатываем ошибку
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

//Получаем ингредиенты
export const getIngredientsApi = () => fetch(`${api}/ingredients`)
  .then(checkResponse)

//Получаем номер заказа
export const getOrderNumber = (data) => fetch(`${api}/orders`, {
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

//Регистрация
export const signUp = (data) => fetch(`${api}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(checkResponse)

//Логин      
export const signIn = (data) => fetch(`${api}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(checkResponse)

//Логаут      
export const signOut = () => fetch(`${api}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: localStorage.getItem('jwt') }),
  })
    .then(checkResponse)

//Получаем инфу от пользователя      
export const getUserInfo = () => fetch(`${api}/auth/user`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}` }
  })
    .then(checkResponse)

//Обновляем инфу от пользователя      
export const updateUserInfo = (data) => fetch(`${api}/auth/user`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json',
    Authorization: `${getCookie('token')}` },
    body: JSON.stringify(data),
  })
    .then(checkResponse)

//Забыли пароль
export const restorePassword = (email) => fetch(`${api}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  .then(checkResponse)

//Новый пароль
export const setNewPassword = (data) => fetch(`${api}/password-reset/reset`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
})
  .then(checkResponse)

//Обновление токена  
export const updateToken = () => fetch(`${api}/auth/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ token: localStorage.getItem('jwt') }),
})
  .then(checkResponse)