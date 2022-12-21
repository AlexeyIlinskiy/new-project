import {
  setCookie,
} from '../../utils/cookies';

import { signUp, signIn, signOut, getUserInfo, updateUserInfo, restorePassword, setNewPassword, updateToken} from '../../utils/api';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export const RESTORE_PASSWORD_REQUEST = 'REQUEST_CODE_REQUEST';
export const RESTORE_PASSWORD_SUCCESS = 'REQUEST_CODE_SUCCESS';
export const RESTORE_PASSWORD_FAILED = 'REQUEST_CODE_FAILED';

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const UPDATE_TOKEN_REQUEST = 'UPDATE_TOKEN_REQUEST';
export const UPDATE_TOKEN_SUCCESS = 'UPDATE_TOKEN_SUCCESS';
export const UPDATE_TOKEN_FAILED = 'UPDATE_TOKEN_FAILED';

//Регистрация
export const register = (data) => {
  return function(dispatch) {
    dispatch({ type: REGISTER_USER_REQUEST });
      signUp(data).then((res) => {
        if (res.success) {
          setCookie('token', res.accessToken, { expires: 1200 });
          localStorage.setItem('jwt', res.refreshToken);
          dispatch({
            type: REGISTER_USER_SUCCESS,
            user: res.user,
          })
        }
    })
    .catch(() => dispatch({ type: REGISTER_USER_FAILED }));
  }
}  

//Залогинимся
export const login = (data) => {
  return function(dispatch) {
    dispatch({ type: LOGIN_USER_REQUEST });
    signIn(data).then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          user: res.user,
        })
      }
    })
    .catch(() => dispatch({ type: LOGIN_USER_FAILED }));
  }
} 

//Разлогинимся
export const logout = () => {
  return function(dispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    signOut().then((res) => {
      if (res.success) {
        localStorage.removeItem('jwt');
        setCookie('token', null, { expires: -1 });
        dispatch({ type: LOGOUT_SUCCESS});
      }
    })
    .catch(() => dispatch({ type: LOGOUT_FAILED }));
  }
}

//Обновление токена
export const refreshToken = () => {
  return function(dispatch) {
    dispatch({ type: UPDATE_TOKEN_REQUEST })
    updateToken().then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch({
          type: UPDATE_TOKEN_SUCCESS,
          user: res.user,
        })
      }
    })
    .catch(() => dispatch({ type: UPDATE_TOKEN_FAILED }));
  }
}

//Получение данных пользователя  
export const getUser = () => {
  return function(dispatch) {
    dispatch({ type: GET_USER_REQUEST });
    getUserInfo().then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        user: res.user,
      })
    })
    .then((res) => console.log(res.user))
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        getUserInfo().then((res) => {
          dispatch({
            type: GET_USER_SUCCESS,
            user: res.user,
          })
        })
      } else {
        dispatch({ type: GET_USER_FAILED });
      }
    })
  }
}

//Обновление данных пользователя
export const updateUser = (data) => {
  return function(dispatch) {
    dispatch({ type: UPDATE_USER_REQUEST });
    updateUserInfo(data).then((res) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        user: res.user,
      })
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        dispatch(updateUser(data));
      } else {
        dispatch({ type: UPDATE_USER_FAILED });
      }
    })
  }
}
//Отправка письма "забыл пароль"
export const sendPasswordEmail = (email) => {
  return function(dispatch) {
    dispatch({ type: RESTORE_PASSWORD_REQUEST });
    restorePassword(email).then(() => {
      dispatch({ type: RESTORE_PASSWORD_SUCCESS });
    })
    .catch(() => dispatch({ type: RESTORE_PASSWORD_FAILED }));
  }
}

//Установка нового пароля
export const resetPassword = (data) => {
  return function(dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    setNewPassword(data).then(() => {
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    })
    .catch(() => dispatch({ type: RESET_PASSWORD_FAILED }));
  }
}
