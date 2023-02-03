import { getIngredientsApi } from "../../utils/api";
import { AppDispatch, AppThunk, TIngredient } from '../types/data';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from '../constants/ingredients'

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: Array<TIngredient>;
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export const getIngredientsRequest = (): IGetIngredientsRequest => ({ type: GET_INGREDIENTS_REQUEST });
export const getIngredientsSuccess = (ingredients: Array<TIngredient>): IGetIngredientsSuccess => ({ type: GET_INGREDIENTS_SUCCESS, ingredients });
export const getIngredientsFailed = (): IGetIngredientsFailed => ({ type: GET_INGREDIENTS_FAILED });


//Получение ингредиентов с сервера
export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch(getIngredientsRequest());
    getIngredientsApi().then(res => {
      if (res && res.success) {
        dispatch(getIngredientsSuccess(res.data));
      } else {
        dispatch(getIngredientsFailed());
      }
    })
    .catch(() => dispatch(getIngredientsFailed()));
  }
  }