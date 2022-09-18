import { combineReducers } from 'redux';

import ingredientsReducer from './ingredients';
import constructorReducer from './constructor';
import ingredientDetailsReducer from './ingredient';
import orderReducer from './order';
import modalsReducer from './modals';

export const rootReducer = combineReducers({
  ingredientsReducer,
  constructorReducer,
  ingredientDetailsReducer,
  orderReducer,
  modalsReducer
});