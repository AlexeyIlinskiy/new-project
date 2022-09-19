import {
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  MOVE_INGREDIENT
} from '../actions/constructor';

const initialConstructorState = {
  constructorIngredients: [],
};

const constructorReducer = (state = initialConstructorState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.draggedIngredient]
        
      };
    }
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR: {
      let itemToDeleteIndex = state.constructorIngredients.map(item => item._id).indexOf(action.id);
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter((item, index) => index !== itemToDeleteIndex )
      };
    }
    case MOVE_INGREDIENT: {
      const replacedConstructorIngredients = [...state.constructorIngredients];
      const draggedIngredient = replacedConstructorIngredients[action.payload.dragIndex];
      replacedConstructorIngredients.splice(action.payload.dragIndex, 1);
      replacedConstructorIngredients.splice(action.payload.hoverIndex, 0, draggedIngredient);

      return {
        ...state,
        constructorIngredients: replacedConstructorIngredients
      };
    }
    default: {
      return state;
    }
  }
 };

export default constructorReducer;

