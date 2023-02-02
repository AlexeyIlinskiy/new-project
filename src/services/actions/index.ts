import {
  IAddIngredientToConstructor,
  IDeleteIngredientFromConstructor,
  IMoveConstructorElement
} from './constructorActions'

import {
  IAddIngredientData,
  IDeleteIngredientData
} from './ingredientActions'

import {
  IGetIngredientsRequest,
  IGetIngredientsSuccess,
  IGetIngredientsFailed
} from './ingredientsActions'

import {
  IOpenIngredientDetails,
  ICloseIngredientDetails,
  IOpenOrderDetails,
  ICloseOrderDetails
} from './modalsActions'

import {
  IGetOrderRequest,
  IGetOrderSuccess,
  IGetOrderFailed
} from './orderActions'
  
import {
  IRegisterUserRequest,
  IRegisterUserSuccess,
  IRegisterUserFailed,
  IGetUserRequest,
  IGetUserSuccess,
  IGetUserFailed,
  IUpdateUserRequest,
  IUpdateUserSuccess,
  IUpdateUserFailed,
  ILoginUserRequest,
  ILoginUserSuccess,
  ILoginUserFailed,
  ILogoutRequest,
  ILogoutSuccess,
  ILogoutFailed,
  IRestorePasswordRequest,
  IRestorePasswordSuccess,
  IRestorePasswordFailed,
  IResetPasswordRequest,
  IResetPasswordSuccess,
  IResetPasswordFailed,
  IUpdateTokenRequest,
  IUpdateTokenSuccess,
  IUpdateTokenFailed
} from './userActions'

import {
  IWsConnectionStart,
  IWsConnectionSuccess,
  IWsConnectionError,
  IWsConnectionClosed,
  IWsGetMessage,
  IWsUserConnectionStart,
  IWsUserConnectionSuccess,
  IWsUserConnectionError,
  IWsUserConnectionClosed,
  IWsUserGetMessage
} from './wsActions'

export type TActions =
| IAddIngredientToConstructor
| IDeleteIngredientFromConstructor
| IMoveConstructorElement
| IAddIngredientData
| IDeleteIngredientData
| IGetIngredientsRequest
| IGetIngredientsSuccess
| IGetIngredientsFailed
| IOpenIngredientDetails
| ICloseIngredientDetails
| IOpenOrderDetails
| ICloseOrderDetails
| IGetOrderRequest
| IGetOrderSuccess
| IGetOrderFailed
| IRegisterUserRequest
| IRegisterUserSuccess
| IRegisterUserFailed
| IGetUserRequest
| IGetUserSuccess
| IGetUserFailed
| IUpdateUserRequest
| IUpdateUserSuccess
| IUpdateUserFailed
| ILoginUserRequest
| ILoginUserSuccess
| ILoginUserFailed
| ILogoutRequest
| ILogoutSuccess
| ILogoutFailed
| IRestorePasswordRequest
| IRestorePasswordSuccess
| IRestorePasswordFailed
| IResetPasswordRequest
| IResetPasswordSuccess
| IResetPasswordFailed
| IUpdateTokenRequest
| IUpdateTokenSuccess
| IUpdateTokenFailed
| IWsConnectionStart
| IWsConnectionSuccess
| IWsConnectionError
| IWsConnectionClosed
| IWsGetMessage
| IWsUserConnectionStart
| IWsUserConnectionSuccess
| IWsUserConnectionError
| IWsUserConnectionClosed
| IWsUserGetMessage

