import { TActions } from '../actions';
import { TIngredient } from '../types/data';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
 } from '../constants/ingredients';
  
 type TInitialIngredientsState = {
  ingredients: ReadonlyArray<TIngredient>;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
}

const initialIngredientsState: TInitialIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

const ingredientsReducer = (state = initialIngredientsState, action: TActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        // Запрос начал выполняться
        ingredientsRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса 
        // на случай, если он был и завершился с ошибкой
        ingredientsFailed: false
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно, помещаем полученные данные в хранилище
        ingredients: action.ingredients,
        // Запрос закончил своё выполнение
        ingredientsRequest: false
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой, 
        // выставляем соответствующие значения в хранилище
        ingredientsFailed: true,
        ingredientsRequest: false
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredientsReducer;