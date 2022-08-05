import React from 'react';
import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';

import { 
  ConstructorElement, 
  Button, 
  CurrencyIcon,
  DragIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';

function BurgerConstructor(props) {
  return (
    <section className={styles.root}>
      <div className={`${styles.container} `}>
        <div className={`${styles.item} mb-4 pr-8`}>
        <div className={`${styles.iconEmpty}`}></div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price="200"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
        <div className={`${styles.scrollable} mb-4 pr-4`}>
          {
            props.construct.slice(1, -1).map(item => 
              (
                <div className={`${styles.item} mb-4`} key={item.name}>
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
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price="200"
            thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
          />
        </div>
      </div>
      <div className={`${styles.total} mt-10 pr-8`}>
        <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
          600 
          <CurrencyIcon type="primary" />
        </span>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}


BurgerConstructor.propTypes = { 
  construct: PropTypes.arrayOf(ingredientsTypes).isRequired
};

export default BurgerConstructor;