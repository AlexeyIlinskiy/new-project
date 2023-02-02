import { setCookie } from '../../utils/cookies';
import { signUp, signIn, signOut, getUserInfo, updateUserInfo, restorePassword, setNewPassword, updateToken} from '../../utils/api';
import { AppThunk, TUser } from '../types/data';


import { 
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED, 
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED
} from '../constants/user';

export interface IRegisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly user: TUser;
}
export interface IRegisterUserFailed {
  readonly type: typeof REGISTER_USER_FAILED;
}
export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}
export interface IGetUserFailed {
  readonly type: typeof GET_USER_FAILED;
}
export interface IUpdateUserRequest {
  readonly type: typeof UPDATE_USER_REQUEST;
}
export interface IUpdateUserSuccess {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}
export interface IUpdateUserFailed {
  readonly type: typeof UPDATE_USER_FAILED;
}
export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: TUser;
}
export interface ILoginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
}
export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST;
}
export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
}
export interface ILogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}
export interface IRestorePasswordRequest {
  readonly type: typeof RESTORE_PASSWORD_REQUEST;
}
export interface IRestorePasswordSuccess {
  readonly type: typeof RESTORE_PASSWORD_SUCCESS;
}
export interface IRestorePasswordFailed {
  readonly type: typeof RESTORE_PASSWORD_FAILED;
}
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}
export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST;
}
export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS;
  readonly user: TUser;
}
export interface IUpdateTokenFailed {
  readonly type: typeof UPDATE_TOKEN_FAILED;
}

const registerUserRequest = (): IRegisterUserRequest => ({ type: REGISTER_USER_REQUEST });
const registerUserSuccess = (user: TUser): IRegisterUserSuccess => ({ type: REGISTER_USER_SUCCESS, user });
const registerUserFailed = (): IRegisterUserFailed => ({ type: REGISTER_USER_FAILED });

const getUserRequest = (): IGetUserRequest => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user: TUser): IGetUserSuccess => ({ type: GET_USER_SUCCESS, user });
const getUserFailed = (): IGetUserFailed => ({ type: GET_USER_FAILED });

const updateUserRequest = (): IUpdateUserRequest => ({ type: UPDATE_USER_REQUEST });
const updateUserSuccess = (user: TUser): IUpdateUserSuccess => ({ type: UPDATE_USER_SUCCESS, user });
const updateUserFailed = (): IUpdateUserFailed => ({ type: UPDATE_USER_FAILED });

const loginUserRequest = (): ILoginUserRequest => ({ type: LOGIN_USER_REQUEST });
const loginUserSuccess = (user: TUser): ILoginUserSuccess => ({ type: LOGIN_USER_SUCCESS, user });
const loginUserFailed = (): ILoginUserFailed => ({ type: LOGIN_USER_FAILED });

const logoutRequest = (): ILogoutRequest => ({ type: LOGOUT_REQUEST });
const logoutSuccess = (): ILogoutSuccess => ({ type: LOGOUT_SUCCESS });
const logoutFailed = (): ILogoutFailed => ({ type: LOGOUT_FAILED });

const restorePasswordRequest = (): IRestorePasswordRequest => ({ type: RESTORE_PASSWORD_REQUEST });
const restorePasswordSuccess = (): IRestorePasswordSuccess => ({ type: RESTORE_PASSWORD_SUCCESS });
const restorePasswordFailed = (): IRestorePasswordFailed => ({ type: RESTORE_PASSWORD_FAILED });

const resetPasswordRequest = (): IResetPasswordRequest => ({ type: RESET_PASSWORD_REQUEST });
const resetPasswordSuccess = (): IResetPasswordSuccess => ({ type: RESET_PASSWORD_SUCCESS });
const resetPasswordFailed = (): IResetPasswordFailed => ({ type: RESET_PASSWORD_FAILED });

const updateTokenRequest = (): IUpdateTokenRequest => ({ type: UPDATE_TOKEN_REQUEST });
const updateTokenSuccess = (user: TUser): IUpdateTokenSuccess => ({ type: UPDATE_TOKEN_SUCCESS, user });
const updateTokenFailed = (): IUpdateTokenFailed => ({ type: UPDATE_TOKEN_FAILED });

//Регистрация
export const register: AppThunk = (data) => {
  return function(dispatch) {
    dispatch(registerUserRequest());
      signUp(data).then((res) => {
        if (res.success) {
          setCookie('token', res.accessToken, { expires: 1200 });
          localStorage.setItem('jwt', res.refreshToken);
          dispatch(registerUserSuccess(res.user))
        }
    })
    .catch(() => dispatch(registerUserFailed()));
  }
}  

//Залогинимся
export const login: AppThunk = (data) => {
  return function(dispatch) {
    dispatch(loginUserRequest());
    signIn(data).then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch(loginUserSuccess(res.user))
      }
    })
    .catch(() => dispatch(loginUserFailed()));
  }
} 

//Разлогинимся
export const logout: AppThunk = () => {
  return function(dispatch) {
    dispatch(logoutRequest());
    signOut().then((res) => {
      if (res.success) {
        localStorage.removeItem('jwt');
        setCookie('token', '', { expires: -1 });
        dispatch(logoutSuccess());
      }
    })
    .catch(() => dispatch(logoutFailed()));
  }
}

//Обновление токена
export const refreshToken: AppThunk = () => {
  return function(dispatch) {
    dispatch(updateTokenRequest())
    updateToken().then((res) => {
      if (res.success) {
        setCookie('token', res.accessToken, { expires: 1200 });
        localStorage.setItem('jwt', res.refreshToken);
        dispatch(updateTokenSuccess(res.user))
      }
    })
    .catch(() => dispatch(updateTokenFailed()));
  }
}

//Получение данных пользователя  
export const getUser: AppThunk = () => {
  return function(dispatch) {
    dispatch(getUserRequest());
    getUserInfo().then((res) => {
      dispatch(getUserSuccess(res.user))
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        getUserInfo().then((res) => {
          dispatch(getUserSuccess(res.user))
        })
      } else {
        dispatch(getUserFailed());
      }
    })
  }
}

//Обновление данных пользователя
export const updateUser: AppThunk = (data) => {
  return function(dispatch) {
    dispatch(updateUserRequest());
    updateUserInfo(data).then((res) => {
      dispatch(updateUserSuccess(res.user))
    })
    .catch(() => {
      if (localStorage.getItem('jwt')) {
        dispatch(refreshToken());
        dispatch(updateUser(data));
      } else {
        dispatch(updateUserFailed());
      }
    })
  }
}
//Отправка письма "забыл пароль"
export const sendPasswordEmail: AppThunk = (email) => {
  return function(dispatch) {
    dispatch(restorePasswordRequest());
    restorePassword(email).then(() => {
      dispatch(restorePasswordSuccess());
    })
    .catch(() => dispatch(restorePasswordFailed()));
  }
}

//Установка нового пароля
export const resetPassword: AppThunk = (data) => {
  return function(dispatch) {
    dispatch(resetPasswordRequest());
    setNewPassword(data).then(() => {
      dispatch(resetPasswordSuccess());
    })
    .catch(() => dispatch(resetPasswordFailed));
  }
}
