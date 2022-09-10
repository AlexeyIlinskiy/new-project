import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';

import { 
  ConstructorElement, 
  Button, 
  CurrencyIcon,
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';

//import { IngredientsContext } from '../../services/ingredientsContext';

import styles from './burger-constructor.module.css';

export default function BurgerConstructor({ ingredients, openModal}) {
  
  const bun = ingredients.find((item) => item.type === 'bun');
  const toppings = ingredients.filter(item => item.type === 'main' || item.type === 'sauce');

  return (
    <section className={styles.root}>
      <div className={`${styles.container} `}>
        <div className={`${styles.item} mb-4 pr-8`}>
        <div className={`${styles.iconEmpty}`}></div>
         {bun && <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </div>
        <div className={`${styles.scrollable} mb-4 pr-4`}>
          {
            toppings.map((item) => 
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
            bun && <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
          />
          }
        </div>
      </div>
      <div className={`${styles.total} mt-10 pr-8`}>
        <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
          600 
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium" onClick={ openModal }>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}


BurgerConstructor.propTypes = { 
  ingredients: PropTypes.arrayOf(ingredientsTypes).isRequired,
  openModal: PropTypes.func.isRequired,
};