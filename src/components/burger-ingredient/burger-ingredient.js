import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';

function BurgerIngredient ({element, onClick}) {
  const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients);

  const counter = useMemo(() => {
    return (
      constructorIngredients.filter((item) => item._id === element._id).length
    );
  }, [constructorIngredients]);


  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: element
  });

  return (
    
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
  );

}

BurgerIngredient.propTypes = {
  element: PropTypes.oneOfType([PropTypes.object, ingredientsTypes]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;