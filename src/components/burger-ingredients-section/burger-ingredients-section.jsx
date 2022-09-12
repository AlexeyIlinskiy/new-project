import {useContext} from 'react';
import styles from './burger-ingredients-section.module.css';

import PropTypes from 'prop-types';
import ingredientsTypes from '../../utils/types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientsContext } from '../../services/ingredientsContext';

export default function BurgerIngredientsSection({ type, title, openModal }) {

    const ingredients = useContext(IngredientsContext);

  return (
    <>
      <h2 className={`${styles.sectionTitle} text_type_main-medium mt-2 mb-6`}>{title}</h2>
      <ul className={`${styles.cardContainer} pl-4 pr-2`}>
        { ingredients.filter(elem => elem.type === type).map((item) => (
            <li key={item._id} className={`${styles.card} mb-8`} onClick={() => openModal(item)}>
              <img src={item.image} alt={item.name}/>
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

BurgerIngredientsSection.propTypes = { 
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired
};