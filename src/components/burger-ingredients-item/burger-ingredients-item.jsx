import React from 'react';
import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients-item.module.css';

function BurgerIngredientsItem(props) {
  return (
    <>
      <h2 className={`${styles.sectionTitle} text_type_main-medium mt-2 mb-6`}>{props.title}</h2>
      <ul className={`${styles.cardContainer} pl-4 pr-2`}>
        {
          props.data.map((item) => (
            <li key={item._id} className={`${styles.card} mb-8`}>
              <img src={item.image} alt=""/>
              <span className={`${styles.price} mt-2 mb-1 text_type_digits-default`}>
                {item.price}
                <CurrencyIcon type="primary" />
              </span>
              <p className={`${styles.name} text_type_main-default`}>{item.name}</p>
            </li>
          ))
        }
      </ul>
    </>
  );
}

BurgerIngredientsItem.propTypes = { 
  data: PropTypes.arrayOf(ingredientsTypes).isRequired
};

export default BurgerIngredientsItem;