import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from '../constants/modals';

export interface IOpenIngredientDetails {
    readonly type: typeof OPEN_INGREDIENT_DETAILS;
}
export interface ICloseIngredientDetails {
    readonly type: typeof CLOSE_INGREDIENT_DETAILS;
}
export interface IOpenOrderDetails {
    readonly type: typeof OPEN_ORDER_DETAILS;
}
export interface ICloseOrderDetails {
    readonly type: typeof CLOSE_ORDER_DETAILS;
}

export const openIngredientDetails = (): IOpenIngredientDetails => ({ type: OPEN_INGREDIENT_DETAILS });
export const closeIngredientDetails = (): ICloseIngredientDetails => ({ type: CLOSE_INGREDIENT_DETAILS });
export const openOrderDetails = (): IOpenOrderDetails => ({ type: OPEN_ORDER_DETAILS });
export const closeOrderDetails = (): ICloseOrderDetails => ({ type: CLOSE_ORDER_DETAILS });