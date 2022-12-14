import styles from './app.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
 
import AppHeader from '../app-header/app-header';

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
import { MainPage, IngredientDetailsPage, RegisterPage, LoginPage,  ForgotPasswordPage, ResetPasswordPage, ProfilePage, OrdersListPage, NotFoundPage, OrdersPage } from '../../pages/index';
import { getUser } from '../../services/actions/user';
import { ProtectedRoute } from '../protected-route/protected-route';


const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
 
  const currentIngredient = useSelector(state => state.ingredientDetails.currentIngredient);
  // const ingredientDetailsVisible = useSelector(state => state.modals.ingredientDetailsVisible);
  // const orderVisible = useSelector(state => state.modals.orderVisible);
  const order = useSelector(state => state.order.order);

  const { isAuth } = useSelector((store) => store.authReducer);
 
 
 
  useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])
 
  const closeModal = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });;
    dispatch({ type: GET_ORDER_FAILED });
    dispatch({ type: CLOSE_ORDER_DETAILS });
    history.goBack();
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

  useEffect(() => {
    if (!isAuth && localStorage.getItem('jwt')) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (order.number) {
      history.push(`/profile/orders/${order.number}`, { background: location });
    }
  }, [order]);
 
  return (
    <div className='app'>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
          <Switch location={background || location}>
            <Route path='/' exact = { true }>
              <MainPage openIngredientModal={openIngredientModal} createOrder={createOrder} />
            </Route>
            <Route path='/ingredients/:id' exact={ true }>
              <IngredientDetailsPage />
            </Route>
            <Route path='/orders' exact = { true }>
              <OrdersPage />
            </Route>
            <Route path='/login' exact = { true }>
              <LoginPage />
            </Route>
            <Route path='/register' exact = { true }>
              <RegisterPage />
            </Route>
            <Route path='/forgot-password' exact = { true }>
              <ForgotPasswordPage />
            </Route>
            <Route path='/reset-password' exact = { true }>
              <ResetPasswordPage />
            </Route>
            <ProtectedRoute path='/profile' exact={ true }>
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path='/profile/orders' exact={ true }>
              <OrdersListPage />
            </ProtectedRoute>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
            {background && (
              <ProtectedRoute path="/profile/orders/:orderNumber">
                <Modal header= { '' } onClose={ closeModal }>
                  <OrderDetails />
                </Modal>
              </ProtectedRoute> 
            )}
            {background && (
            <Route path="/ingredients/:id">
              <Modal ingredient={ currentIngredient } header="Детали ингредиента" onClose={ closeModal } >
                <IngredientDetails />
              </Modal>
            </Route>
          )}
      </DndProvider>
    </div>
  );
};
 
export default App;