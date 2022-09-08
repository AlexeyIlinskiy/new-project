import React from 'react';
import { useState, useEffect } from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { getIngredients } from '../../utils/burger-api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [orderVisible, setOrderVisible] = useState(false);
  const [ingredientVisible, setIngredientVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});

  useEffect(()=>{
    getIngredients()
    .then(setIngredients)
    .catch((e) => alert ('Ошибка: ' + e.message));
  }, []);

  const closeModal = () => {
    setOrderVisible(false);
    setIngredientVisible(false);
  };

  const openOrderModal = () => {
    setOrderVisible(true);
  };

  const openIngredientModal = (item) => {
    setCurrentIngredient({...item});
    setIngredientVisible(true);
  }

  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} openModal={openIngredientModal}/>
        <BurgerConstructor ingredients={ingredients} openModal={openOrderModal}/>
        { orderVisible && 
          <Modal 
            header= { '' }
            onClose={ closeModal }
          >
            <OrderDetails />
            </Modal>
        }
        { ingredientVisible && 
          <Modal 
            header="Детали ингредиента"
            onClose={ closeModal }
          >
            <IngredientDetails currentIngredient={currentIngredient}/>
          </Modal>
        }
      </main>
    </div>
  );
}

export default App;