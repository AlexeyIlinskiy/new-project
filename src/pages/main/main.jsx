import styles from './main.module.css';
import PropTypes from 'prop-types';
 
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
 
export function MainPage ({ openIngredientModal, createOrder }) {
 
 return (
   <main className={styles.main}>
     <BurgerIngredients openModal={openIngredientModal}/>
     <BurgerConstructor openOrderDetails={createOrder} />
   </main>
 );
};
 
MainPage.propTypes = {
 createOrder: PropTypes.func.isRequired,
 openIngredientModal: PropTypes.func.isRequired
};
