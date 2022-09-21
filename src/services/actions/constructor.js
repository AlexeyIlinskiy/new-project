//Работа с ингредиентами в конструкторе
export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const moveItems = (dragIndex, hoverIndex) => {
  return function(dispatch) {
    dispatch({
      type: MOVE_INGREDIENT,
      payload: {
        dragIndex: dragIndex,
        hoverIndex: hoverIndex
      }
    })
  }
}