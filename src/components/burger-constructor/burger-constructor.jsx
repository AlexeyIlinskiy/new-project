import { useContext, useEffect, useReducer } from 'react';
import styles from './burger-constructor.module.css';

import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';

import { 
  ConstructorElement, 
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientsContext } from '../../services/ingredientsContext';

import Total from '../total/total';

const initialState = {
  bun: {},
  toppings: []
}

export default function BurgerConstructor({openModal}) {
  
  const ingredients = useContext(IngredientsContext);
  
  const bun = ingredients.find((item) => item.type === 'bun');
  const toppings = ingredients.filter(item => item.type === 'main' || item.type === 'sauce');

  //создадим функцию редьюсер
  function reducer (state, action) {
    switch(action.type) {
      case 'CREATE_CART':
        return { ...state, bun, toppings};
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
      }
    }

  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch (
      {type: 'CREATE_CART'}
    )
  }, [ingredients]);
  
  return (
    <section className={styles.root}>
      <div className={`${styles.container} `}>
        <div className={`${styles.item} mb-4 pr-8`}>
        <div className={`${styles.iconEmpty}`}></div>
         {state.bun && <ConstructorElement
            type="top"
            isLocked={true}
            text={`${state.bun.name} (верх)`}
            price={state.bun.price}
            thumbnail={state.bun.image}
          />}
        </div>
        <div className={`${styles.scrollable} mb-4 pr-4`}>
          { state.toppings.length === 0 ? 'Добавьте ингредиенты' :
            state.toppings.map((item) => 
              (
                <div className={`${styles.item} mb-4`} key={item._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
            )
          }
        </div>
        <div className={`${styles.item} mb-4 pr-8`}>
        <div className={`${styles.iconEmpty}`}></div>
          {
            state.bun && <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${state.bun.name} (верх)`}
              price={state.bun.price}
              thumbnail={state.bun.image}
          />
          }
        </div>
      </div>
      <Total openModal={openModal}/>
    </section>
  );
}

BurgerConstructor.propTypes = { 
  ingredients: PropTypes.arrayOf(ingredientsTypes).isRequired
};