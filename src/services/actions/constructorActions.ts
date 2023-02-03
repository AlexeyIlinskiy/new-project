import { AppThunk, AppDispatch } from "../types/data";

import { 
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  MOVE_INGREDIENT 
} from "../constants/constructor";

import { TIngredient } from '../types/data';

export interface IAddIngredientToConstructor {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly draggedIngredient: TIngredient;
}
export interface IDeleteIngredientFromConstructor {
  readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly id: string;
}

export interface IMoveConstructorElement {
  readonly type: typeof MOVE_INGREDIENT
  readonly payload: {
    dragIndex: number,
    hoverIndex: number
  }
}

export const addIngredientToConstructor = (draggedIngredient: TIngredient): IAddIngredientToConstructor => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  draggedIngredient: draggedIngredient
})

export const deleteIngredientFromConstructor = (id: string): IDeleteIngredientFromConstructor => ({
  type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  id: id
})
export const moveConstructorElement = (dragIndex: number, hoverIndex: number): IMoveConstructorElement => ({
  type: MOVE_INGREDIENT,
  payload: {
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
})

export const moveItems: AppThunk = (dragIndex: number, hoverIndex: number) => (dispatch: AppDispatch) => {
  dispatch(moveConstructorElement(dragIndex, hoverIndex));
}