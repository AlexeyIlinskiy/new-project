import styles from './app.module.css';
import { useEffect, useState, FC} from 'react';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';
 
import AppHeader from '../app-header/app-header';

import { Modal }from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
 
import {getIngredients} from '../../services/actions/ingredientsActions';

import {
 getOrderFailed,
 getOrder
} from '../../services/actions/orderActions';
 
import {
 addIngredientData,
 deleteIngredientData
} from '../../services/actions/ingredientActions';
 
import {
 openIngredientDetails,
 openOrderDetails,
 closeIngredientDetails,
 closeOrderDetails
} from '../../services/actions/modalsActions';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MainPage, IngredientDetailsPage, RegisterPage, LoginPage,  ForgotPasswordPage, ResetPasswordPage, ProfilePage, FeedHistoryPage, NotFoundPage, FeedPage, FeedOrderPage } from '../../pages/index';
import { getUser } from '../../services/actions/userActions';
import { ProtectedRoute } from '../protected-route/protected-route';
import { FeedModal } from '../feed-modal/feed-modal';
import { TIngredient, TLocation } from '../../services/types/data';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation<TLocation>();
  const history = useHistory();
  const background = location.state?.background;
 
  const currentIngredient = useSelector(state => state.ingredientDetails.currentIngredient);
  const order = useSelector(state => state.order.order);

  const { isAuth } = useSelector((store) => store.authReducer);

  const [orderNumber, setOrderNumber] = useState('');
 
 
 
  useEffect(()=> {
    dispatch(getIngredients())
  }, [dispatch])
 
  const closeModal = () => {
    dispatch(deleteIngredientData());
    dispatch(closeIngredientDetails());;
    dispatch(getOrderFailed());
    dispatch(closeOrderDetails());
    history.goBack();
  };
 
  const openOrderModal = () => {
    dispatch(openOrderDetails());
  };
 
  const openIngredientModal = (item: TIngredient) => {
    dispatch(addIngredientData(item));
    dispatch(openIngredientDetails());
  }
 
  const createOrder = (orderData: ReadonlyArray<TIngredient>) => {
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

  useEffect(() => {
    const number = location.pathname.split('/').at(-1);
    if (number) setOrderNumber(number);
  }, [location]);
 
  return (
    <div className={styles.app}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
          <Switch location={background || location}>
            <Route path='/' exact = { true }>
              <MainPage openIngredientModal={openIngredientModal} createOrder={createOrder} />
            </Route>
            <Route path='/ingredients/:id' exact={ true }>
              <IngredientDetailsPage />
            </Route>
            <Route path='/feed' exact = { true }>
              <FeedPage />
            </Route>
            <Route path='/feed/:id' exact={ true }>
              <FeedOrderPage />
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
            <ProtectedRoute path='/profile/orders/:id' exact={ true }>
              <FeedOrderPage />
            </ProtectedRoute>
            <ProtectedRoute path='/profile' exact={ true }>
              <ProfilePage />
            </ProtectedRoute>
            <ProtectedRoute path='/profile/orders' exact={ true }>
              <FeedHistoryPage />
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
              <Modal header="Детали ингредиента" onClose={ closeModal } >
                <IngredientDetails />
              </Modal>
            </Route>
          )}

            {background && (
            <Route path="/feed/:id" exact={ true }>
              <Modal onClose={ closeModal } header={`#${orderNumber}`} headerStyle='text text_type_digits-default'>
                <FeedModal />
              </Modal>
            </Route>
          )}

            {background && (
            <ProtectedRoute path="/profile/orders/:id" exact={ true }>
              <Modal onClose={ closeModal } header={`#${orderNumber}`} headerStyle='text text_type_digits-default'>
                <FeedModal />
              </Modal>
            </ProtectedRoute>
          )}
      </DndProvider>
    </div>
  );
};
 
export default App;