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

 } from '../actions/user';

 const initialAuthState = {
  user: {
    name: '',
    email: ''
  },
  registerRequest: false, 
  registerFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  updateUserRequest: false,
  updateUserFailed: false,
  loginRequest: false,
  loginFaild: false,
  logoutRequest: false,
  logoutFaild: false,
  restorePasswordRequest: false,
  restorePasswordFaild: false,
  resetPasswordRequest: false,
  resetPasswordFaild: false,
  tokenRequest: false,
  tokenFailed: false,
  isAuth: false
};

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case (REGISTER_USER_REQUEST): {
      return { 
        ...state, 
        registerRequest: true, 
        registerFailed: false 
      };
    }
    case (REGISTER_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        registerRequest: false,
        registerFailed: false,
        isAuth: true,
      };
    }
    case (REGISTER_USER_FAILED): {
      return { 
        ...state, 
        registerRequest: false, 
        registerFailed: true 
      };
    }
    case (LOGIN_USER_REQUEST): {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false,
      };
    }
    case (LOGIN_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        loginRequest: false,
        loginFailed: false,
        isAuth: true,
      };
    }
    case (LOGIN_USER_FAILED): {
      return {
        ...state,
        loginRequest: false,
        loginFailed: true,
      };
    }
    case (GET_USER_REQUEST): {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case (GET_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        isAuth: true,
        getUserRequest: false,
        getUserFailed: false,
      };
    }
    
    case (GET_USER_FAILED): {
      return {
        ...state,
        getUserRequest: false,
        getUserFailed: true,
      };
    }
    case (UPDATE_USER_REQUEST): {
      return {
        ...state,
        updateUserRequest: true,
        updateUserFailed: false,
      };
    }
    case (UPDATE_USER_SUCCESS): {
      return {
        ...state,
        user: action.user,
        updateUserRequest: false,
        updateUserFailed: false,
      };
    }
    case (UPDATE_USER_FAILED): {
      return {
        ...state,
        updateUserRequest: false,
        updateUserFailed: true,
      };
    }
    case (LOGOUT_REQUEST): {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }
    case (LOGOUT_SUCCESS): {
      return {
        ...state,
        isAuth: false,
        logoutRequest: false,
        logoutFailed: false,
      };
    }
    case (LOGOUT_FAILED): {
      return {
        ...state,
        logoutRequest: false,
        logoutFailed: true,
      };
    }
    
    case (RESTORE_PASSWORD_REQUEST): {
      return {
        ...state,
        restorePasswordRequest: true,
        restorePasswordFaild: false,
      };
    }
    case (RESTORE_PASSWORD_SUCCESS): {
      return {
        ...state,
        restorePasswordRequest: false,
        restorePasswordFaild: false,
      };
    }
    case (RESTORE_PASSWORD_FAILED): {
      return {
        ...state,
        restorePasswordRequest: false,
        restorePasswordFaild: true,
      };
    }
    
    case (RESET_PASSWORD_REQUEST): {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false,
      };
    }
    case (RESET_PASSWORD_SUCCESS): {
      return {
        ...state,
        restorePasswordRequest: false,
        restorePasswordFaild: false,
      };
    }
    case (RESET_PASSWORD_FAILED): {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordFailed: true,
      };
    }
    
    case (UPDATE_TOKEN_REQUEST): {
      return {
        ...state,
        tokenRequest: true,
        tokenFailed: false,
      };
    }
    case (UPDATE_TOKEN_SUCCESS): {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: false,
      };
    }
    case (UPDATE_TOKEN_FAILED): {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;