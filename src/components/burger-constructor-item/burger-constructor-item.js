import styles from './burger-constructor-item.module.css';
import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { DELETE_INGREDIENT_FROM_CONSTRUCTOR, moveItems } from '../../services/actions/constructor';

const BurgerConstructorItem = React.memo((props) => {

  const dispatch = useDispatch();
  const constructorIngredients = useSelector(store => store.constructorReducer.constructorIngredients);

  const deleteElement = (e, item) => {
    e.preventDefault();

    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      id: item._id
    })
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: 'constructorIngredient',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = props.index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
 
      dispatch(moveItems(dragIndex, hoverIndex));

      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'constructorIngredient',
    item: () => {
      return { id: props.item._id, index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));



return (
  <div className={`${styles.item} ${isDragging && styles.isDragging} mb-4`} 
    ref={ref}
    draggable = {true}
  >
    <DragIcon type="primary" />
    <ConstructorElement
      isLocked={false}
      text={props.item.name}
      price={props.item.price}
      thumbnail={props.item.image}
      handleClose={(e) => deleteElement(e, props.item)}
    />
  </div>
)
});

BurgerConstructorItem.propTypes = { 
  deleteElement: PropTypes.func.isRequired,
};

export default BurgerConstructorItem;

