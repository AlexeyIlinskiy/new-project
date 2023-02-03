import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, FC } from 'react';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { addIngredientToConstructor,
  deleteIngredientFromConstructor }
  from '../../services/actions/constructorActions';

import { Total } from '../total/total';
import { BurgerConstructorItem } from '../burger-constructor-item/burger-constructor-item';
import { useHistory } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

interface IBurgerConstructor {
  openOrderDetails: (order: ReadonlyArray<TIngredient>) => void,
}

const BurgerConstructor: FC<IBurgerConstructor> = ({ openOrderDetails }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth } = useSelector((store) => store.authReducer);
  
  const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients);
  const burgerBun = constructorIngredients.filter((item) => item.type === 'bun');
  const orderToppings = constructorIngredients.filter((item: TIngredient) => item.type !== 'bun').map(item => item._id);
  const orderBun = constructorIngredients.find((item) => (item.type === 'bun') ? item._id : null);
  const orderData = useMemo(() => [orderBun, ...orderToppings, orderBun], [
    orderBun, orderToppings
  ]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      if(item.type === 'bun') { 
        for(let i = 0; i < 2; i++) {
          if(burgerBun.length > 0) {
            let id = 'bun';
            dispatch(deleteIngredientFromConstructor(id));
          }
          dispatch(addIngredientToConstructor({...item, key:'bun'}));
        }
      }
      else {
        dispatch(addIngredientToConstructor({...item, key:uuidv4()}));
      }
    },
  });

  const openOrder = () => {
    if (isAuth) {
      openOrderDetails(constructorIngredients);
    } else {
      history.push('/login');
    }
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
                text={`${burgerBun[0].name} (верх)`}
                price={burgerBun[0].price}
                thumbnail={burgerBun[0].image}
              />
            </div>
          )
        }
        </div>
        <div className={`${styles.scrollable} mb-4 pr-4`}>
        {
            constructorIngredients.map((item: TIngredient, index: number) => item.type !== 'bun' && (
                <BurgerConstructorItem item={item} key={ item.key } index={index}/>
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
                text={`${burgerBun[0].name} (низ)`}
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

export default BurgerConstructor;