import { TIngredient } from '../types/data';

import {
    ADD_INGREDIENT_DATA,
    DELETE_INGREDIENT_DATA
} from '../constants/ingredient'

export interface IAddIngredientData {
    readonly type: typeof ADD_INGREDIENT_DATA;
    readonly item: TIngredient;
}
export interface IDeleteIngredientData {
    readonly type: typeof DELETE_INGREDIENT_DATA;
}

export const addIngredientData = (item: TIngredient): IAddIngredientData => ({ type: ADD_INGREDIENT_DATA, item });
export const deleteIngredientData = (): IDeleteIngredientData => ({ type: DELETE_INGREDIENT_DATA });