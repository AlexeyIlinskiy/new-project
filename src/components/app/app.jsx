import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';

 import {getIngredients} from '../../services/actions/ingredients';
 
 import {
  GET_ORDER_FAILED,
  getOrder
} from '../../services/actions/order';

import {
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA
} from '../../services/actions/ingredient';

import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
  OPEN_ORDER_DETAILS,
  CLOSE_ORDER_DETAILS
} from '../../services/actions/modals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const dispatch = useDispatch();

  const currentIngredient = useSelector(state => state.ingredientDetails.currentIngredient);
  const ingredientDetailsVisible = useSelector(state => state.modals.ingredientDetailsVisible);
  const orderVisible = useSelector(state => state.modals.orderVisible);
  const order = useSelector(state => state.order.order);

  useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])

  const closeModal = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });;
    dispatch({ type: GET_ORDER_FAILED });
    dispatch({ type: CLOSE_ORDER_DETAILS });
  };

  const openOrderModal = () => {
    dispatch({ type: OPEN_ORDER_DETAILS });
  };

  const openIngredientModal = (item) => {
    dispatch({ type: ADD_INGREDIENT_DATA, item });
    dispatch({ type: OPEN_INGREDIENT_DETAILS });
  }

  const createOrder = (orderData) => {
    dispatch(getOrder(orderData));
    openOrderModal();
  };

  return (
    <div className="app">
      
        <AppHeader />
        <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients openModal={openIngredientModal} />
          <BurgerConstructor openOrderDetails={createOrder} />
        </DndProvider>
        { Boolean(orderVisible) && 
          <Modal 
            header= { '' }
            onClose={ closeModal }
          >
            <OrderDetails orderNumber={order.number}/>
            </Modal>
        }
        { Boolean(ingredientDetailsVisible) && 
          <Modal 
            ingredient={ currentIngredient }
            header="Детали ингредиента"
            onClose={ closeModal }
          >
            <IngredientDetails currentIngredient={currentIngredient}/>
          </Modal>
        }
      </main>
      
    </div>
  );
};

export default App;