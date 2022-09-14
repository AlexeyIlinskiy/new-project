import { useState, useContext } from 'react';
import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import PropTypes from 'prop-types';
import { tabs } from '../../utils/constants';

import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section'
import {IngredientsContext} from '../../services/ingredientsContext';


function BurgerIngredients({openModal}) {
  
  const ingredients = useContext(IngredientsContext);
  
  const [current, setCurrent] = useState(tabs[0].name);

  return (
    <section className={`${styles.root} mr-10`}>
      <h1 className={`${styles.title} text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <div className={`${styles.tabs} mb-8`}>
        {
          tabs.map((item) => (
            <Tab 
              value={item.name} 
              active={current === item.name} 
              onClick={setCurrent}
              key={item.name}
            >
              {item.title}
            </Tab>)
          )
        }
      </div>
      <div className={styles.ingredients}>
        { 
          tabs.map( item => (
              <BurgerIngredientsSection 
                type={item.name} 
                key={item.name} 
                title={item.title}
                data={ingredients.filter((el) => el.type === item.name )}
                openModal={openModal}
              />
            )
          )
        }
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = { 
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;