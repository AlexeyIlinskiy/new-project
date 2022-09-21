import { getOrderNumber } from "../../utils/burger-api";

//Получение заказа с сервера
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

//Получение номера заказа с сервера
export function getOrder(orderData) {
    // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function(dispatch) {
     // Проставим флаг в хранилище о том, что мы начали выполнять запрос
      // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать 
      // ввод на время выполнения запроса
    dispatch({
      type: GET_ORDER_REQUEST
    });
      // Запрашиваем данные у сервера
    getOrderNumber(orderData).then(res => {
      if (res) {
        // В случае успешного получения данных вызываем экшен
        // для записи полученных данных в хранилище
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res,
        });
      } else {
        // Если произошла ошибка, отправляем соответствующий экшен
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    })
    // Если сервер не вернул данных, также отправляем экшен об ошибке
    .catch(() => dispatch({ type: GET_ORDER_FAILED }));
  }
  }