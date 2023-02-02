import { combineReducers } from 'redux';

import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructor';
import ingredientDetailsReducer from './ingredientReducer';
import orderReducer from './orderReducer';
import modalsReducer from './modalsReducer';
import authReducer from './userReducer';
import wsReducer from './wsReducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  modals: modalsReducer,
  authReducer,
  wsReducer
});