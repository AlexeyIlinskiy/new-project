import {
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS
 } from '../actions/actions';

const initialOrderState = {
  order: { 
    number: null 
  },
  orderRequest: false,
  orderFailed: false
 };

 const orderReducer = (state = initialOrderState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        orderRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса 
        // на случай, если он был и завершился с ошибкой
        orderFailed: false
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        order: action.order.number,
        // Запрос закончил своё выполнение
        orderRequest: false
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, 
        // выставляем соответствующие значения в хранилище
        orderFailed: true,
        orderRequest: false
      };
    }
    default: {
      return state;
    }
  }
};

export default orderReducer;