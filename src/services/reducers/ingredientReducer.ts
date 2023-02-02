import { TActions } from '../actions';
import { TIngredient } from '../types/data';

import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA
 } from '../constants/ingredient';

 type TInitialIngredientState = {
  currentIngredient: TIngredient | {}
}

 const initialIngredientState: TInitialIngredientState = {
  currentIngredient: {},
}

const ingredientDetailsReducer = (state = initialIngredientState, action: TActions) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        currentIngredient: action.item
        
      };
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        currentIngredient: {}
      };
    }
    default: {
      return state;
    }
  }
};

export default ingredientDetailsReducer;