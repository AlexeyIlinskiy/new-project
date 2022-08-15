import React from 'react';
import styles from './app.module.css';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

import {api} from '../../utils/constants'

function App() {
  const [apiData, setApiData] = React.useState([]);
  const [orderVisible, setOrderVisible] = React.useState(false);
  const [ingredientVisible, setIngredientVisible] = React.useState(false);
  const [currentIngredient, setCurrentIngredient] = React.useState({});

  React.useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        if(ingredientVisible) {
          setIngredientVisible(false)
        }
        else if(orderVisible) {
          setOrderVisible(false);
        }
      }
    }

    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);

  },[ingredientVisible, orderVisible]);

  React.useEffect(() => {
    fetch(api)
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => setApiData(data.data))
        .catch(e => {
          console.log('Error: ' + e.message);
        });
  }, []);

  const closeOrderModal = () => {
    setOrderVisible(false);
  };

  const openOrderModal = () => {
    setOrderVisible(true);
  };

  const closeIngredientModal = () => {
    setIngredientVisible(false);
  }

  const openIngredientModal = (item) => {
    setCurrentIngredient({...item});
    setIngredientVisible(true);
  }

  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={apiData} openModal={openIngredientModal}/>
        <BurgerConstructor construct={apiData} openModal={openOrderModal}/>
        { orderVisible && 
          (
              <Modal onClick={closeOrderModal} header="">
                <OrderDetails />
              </Modal>
          )
        }
        { ingredientVisible && 
          (
              <Modal onClick={closeIngredientModal} header="Детали ингредиента">
                <IngredientDetails currentIngredient={currentIngredient}/>
              </Modal>
          )
        }
      </main>
    </div>
  );
}

export default App;