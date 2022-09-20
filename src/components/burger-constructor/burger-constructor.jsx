import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { ADD_INGREDIENT_TO_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR }
  from '../../services/actions/constructor';

import Total from '../total/total';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';

function BurgerConstructor ({ openOrderDetails }) {
  const dispatch = useDispatch();
  
  const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients);
  const burgerBun = constructorIngredients.filter((item) => item.type === 'bun');
  const orderToppings = constructorIngredients.filter((item) => item.type !== 'bun').map(item => item._id);
  const orderBun = constructorIngredients.find((item) => (item.type === 'bun') ? item._id : null);
  const orderData = useMemo(() => [orderBun, ...orderToppings, orderBun], [
    orderBun, orderToppings
  ]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if(item.type === 'bun') { 
        for(let i = 0; i < 2; i++) {
          if(burgerBun.length > 0) {
            let id = burgerBun[0]._id;  
            dispatch({
              type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
              id:{...item, key:uuidv4()}
            });
          }
          dispatch({
            type: ADD_INGREDIENT_TO_CONSTRUCTOR,
            draggedIngredient: {...item, key:uuidv4()}
          });
        }
      }
      else {
        dispatch({
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          draggedIngredient: {...item, key:uuidv4()}
        });
      }
    },
  });

  const openOrder = () => {
    openOrderDetails(orderData);
  };

  return (
    <section className={styles.root} >
      <div className={`${styles.container} `} ref={dropTarget} >
        <div className={`${styles.item} mb-4 pr-8`}>
        {
          burgerBun.length > 0 && (
            <div className={`${styles.item} mb-4 pr-8`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={burgerBun[0].name}
                price={burgerBun[0].price}
                thumbnail={burgerBun[0].image}
              />
            </div>
          )
        }
        </div>
        <div className={`${styles.scrollable} mb-4 pr-4`}>
        {
            constructorIngredients.map((item,index) => item.type !== 'bun' && (
                <BurgerConstructorItem item={item} key= { item.key } index={index}/>
              )
            )
          }
        </div>
        <div className={`${styles.item} mb-4 pr-8`}>
        {
          burgerBun.length > 0 && (
            <div className={`${styles.item} mb-4 pr-8`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={burgerBun[0].name}
                price={burgerBun[0].price}
                thumbnail={burgerBun[0].image}
              />
            </div>
          )
        }
        </div>
      </div>
      <Total openOrderDetails={openOrder}/>
    </section>
  );
}

BurgerConstructor.propTypes = { 
  openOrderDetails: PropTypes.func.isRequired,
};

export default BurgerConstructor;