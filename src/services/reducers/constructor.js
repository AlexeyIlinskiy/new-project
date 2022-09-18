import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  MOVE_INGREDIENT
} from '../actions/constructor';

const initialConstructorState = {
  constructorIngredients: []
};

const constructorReducer = (state = initialIngredientsState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: []
        
      };
    }
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(item => item.id !== action.id)
      };
    }
    case MOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: action.payload
      };
    }
    default: {
      return state;
    }
  }
 };

export default constructorReducer;

