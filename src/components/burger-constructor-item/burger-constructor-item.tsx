import styles from './burger-constructor-item.module.css';
import {memo, FC, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { deleteIngredientFromConstructor, moveItems } from '../../services/actions/constructorActions';
import { TIngredient } from '../../services/types/data';

interface IBurgerConstructorItemProps {
  item: TIngredient;
  index: number;
}

const BurgerConstructorItem: FC<IBurgerConstructorItemProps> = memo(({ item, index}) => {

  const dispatch = useDispatch();

  const deleteElement = (item: TIngredient) => {
    dispatch(deleteIngredientFromConstructor(item._id))
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: 'constructorIngredient',
    hover: (item: TIngredient, monitor) => {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: any = monitor.getClientOffset();
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
      return { id: item._id, index: index };
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
      text={item.name}
      price={item.price}
      thumbnail={item.image}
      handleClose={() => deleteElement(item)}
    />
  </div>
)
});

export default BurgerConstructorItem;

