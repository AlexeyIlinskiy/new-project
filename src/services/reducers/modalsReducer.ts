import { TActions } from '../actions';

import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
 } from '../constants/modals';


 type TInitialModalState = {
  ingredientDetailsVisible: boolean;
  orderVisible: boolean;
}

const initialModalState: TInitialModalState = {
  ingredientDetailsVisible: false,
  orderVisible: false
}

   export const modalsReducer = (state = initialModalState, action: TActions) => {
    switch (action.type) {
      case OPEN_INGREDIENT_DETAILS: {
        return {
          ingredientDetailsVisible: true
          
        };
      }
      case CLOSE_INGREDIENT_DETAILS: {
        return {
          ingredientDetailsVisible: false
        };
      }
      case OPEN_ORDER_DETAILS: {
        return {
          orderVisible: true
          
        };
      }
      case CLOSE_ORDER_DETAILS: {
        return {
          orderVisible: false
        };
      }
      default: {
        return state;
      }
    }
   };

export default modalsReducer;