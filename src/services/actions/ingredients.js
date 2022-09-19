import { getIngredientsApi } from "../../utils/burger-api";
//Получение ингредиентов с сервера
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

//Получение ингредиентов с сервера
export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsApi().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    })
    .catch(() => dispatch({ type: GET_INGREDIENTS_FAILED }));
  }
  }