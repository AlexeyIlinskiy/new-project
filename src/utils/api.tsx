import { getCookie } from './cookies';
const api = 'https://norma.nomoreparties.space/api';
import { TIngredient, TProfileForm } from '../services/types/data';

export type TRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  headers: {
    'Content-Type': string;
    Authorization?: string;
  };
  body?: string;
};
 
//Обрабатываем ошибку
const checkResponse = (res: Response) => {
 return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
 
//Создадим единый запрос
const request = (url: string, options?: TRequestOptions) => {
 return fetch(url, options).then(checkResponse)
}
 
//Получаем ингредиенты
export const getIngredientsApi = () => request(`${api}/ingredients`)
 
//Получаем номер заказа
export const getOrderNumber = (data: Array<TIngredient>) => request(`${api}/orders`, {
 method: 'POST',
 headers: {'Content-Type': 'application/json',
 Authorization: `${getCookie('token')}`},
 body: JSON.stringify({ ingredients: data }),
})
 .then((data) => data.order)
 
//Регистрация
export const signUp = (data: {name: string; email: string; password: string }) => request(`${api}/auth/register`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(data)
})
 
//Логин     
export const signIn = (data: { email: string; password: string }) => request(`${api}/auth/login`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(data),
})
 
//Логаут     
export const signOut = () => request(`${api}/auth/logout`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ token: localStorage.getItem('jwt') }),
})
 
//Получаем инфу от пользователя     
export const getUserInfo = () => request(`${api}/auth/user`, {
 method: 'GET',
 headers: { 'Content-Type': 'application/json',
   Authorization: `${getCookie('token')}` }
})
 
//Обновляем инфу от пользователя     
export const updateUserInfo = (data: TProfileForm) => request(`${api}/auth/user`, {
 method: 'PATCH',
 headers: { 'Content-Type': 'application/json',
   Authorization: `${getCookie('token')}` },
 body: JSON.stringify(data)
})
 
//Забыли пароль
export const restorePassword = (email: {email: string}) => request(`${api}/password-reset`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email })
})
 
//Новый пароль
export const setNewPassword = (data: { 'password': string; 'token': string}) => request(`${api}/password-reset/reset`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(data)
})
 
//Обновление токена 
export const updateToken = () => request(`${api}/auth/token`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ token: localStorage.getItem('jwt') })
})