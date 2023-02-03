import { getOrderNumber } from "../../utils/api";
import { AppThunk, TOrder } from '../types/data';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../constants/order';

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: TOrder
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export const getOrderRequest = (): IGetOrderRequest => ({ type: GET_ORDER_REQUEST });
export const getOrderSuccess = (order: TOrder): IGetOrderSuccess => ({ type: GET_ORDER_SUCCESS, order });
export const getOrderFailed = (): IGetOrderFailed => ({ type: GET_ORDER_FAILED });

//Получение номера заказа с сервера
export const getOrder: AppThunk = (orderData) => {
    // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function(dispatch) {
     // Проставим флаг в хранилище о том, что мы начали выполнять запрос
      // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать 
      // ввод на время выполнения запроса
    dispatch(getOrderRequest());
      // Запрашиваем данные у сервера
    getOrderNumber(orderData).then(res => {
      if (res) {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch(getOrderSuccess(res));
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch(getOrderFailed());
      }
    })
    // Если сервер не вернул данных, также отправляем экшен об ошибке
    .catch(() => dispatch(getOrderFailed()));
  }
  }