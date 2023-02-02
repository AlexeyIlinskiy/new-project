import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, FC } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import { useDrag } from 'react-dnd';

import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

interface IBurgerIngredientItem {
  element: TIngredient;
  onClick: () => void;
}

const BurgerIngredient: FC<IBurgerIngredientItem> = ({element, onClick}) => {
  const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients);

  const counter = useMemo(() => {
    return (
      constructorIngredients.filter((item: TIngredient) => item._id === element._id).length
    );
  }, [constructorIngredients]);


  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: element
  });

  const location = useLocation();
  const ingredientId = element._id;

  return (
    <Link
      key={ ingredientId }
      to={{
        pathname: `/ingredients/${ingredientId}`,
        state: { background: location },
      }}
      className={ styles.link }
    >
    <div
      className={ styles.card }
      id={ element._id }
      onClick={ onClick }
      ref={ dragRef }
      draggable = {true}
    >
      {counter !== 0 && (<Counter count={ counter } size="default" />)}
      <img src={element.image} className={ styles.image } alt={ element.name } />
      <p className={ styles.price }>
        <span className='text text_type_digits-default'>{ element.price }</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={ `${styles.name} text_type_main-default` }>{ element.name }</p>
    </div>
    </Link>
  );

}

export default BurgerIngredient;