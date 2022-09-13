import { useState, useEffect } from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {getIngredients, getOrderNumber} from '../../utils/burger-api';

import { IngredientsContext } from '../../services/ingredientsContext';

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [orderVisible, setOrderVisible] = useState(false);
  const [ingredientVisible, setIngredientVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [orderNumber, setOrderNumber] = useState();

  useEffect(()=>{
    getIngredients()
    .then(setIngredients)
  //  .then(console.log(getIngredients))
   .catch((err) => console.log ('Ошибка: ' + err.message));
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

  const createOrder = (order) => {
    getOrderNumber(order)
      .then((data) => {
        openOrderModal();
        setOrderNumber(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <IngredientsContext.Provider value={ingredients}>
          <BurgerIngredients openModal={openIngredientModal}/>
          <BurgerConstructor openOrderDetails={createOrder}/>
        </IngredientsContext.Provider>
        { Boolean(orderVisible) && 
          <Modal 
            header= { '' }
            onClose={ closeModal }
          >
            <OrderDetails orderNumber={orderNumber}/>
            </Modal>
        }
        { Boolean(ingredientVisible) && 
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