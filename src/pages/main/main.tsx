//Главная страница с конструктором /
import { FC } from 'react';
import styles from './main.module.css';
import { TIngredient } from '../../services/types/data';

 
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients'; //Компонент с ингредиентами
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'; //Компонент с конструктором
 

interface IMainPage { 
  openIngredientModal: (element: TIngredient) => void;
  createOrder: (order: ReadonlyArray<TIngredient>) => void;
}

export const MainPage: FC<IMainPage> = ({ openIngredientModal, createOrder }) => {
 
 return (
   <main className={`${styles.container} pl-10`}>
     <BurgerIngredients openModal={openIngredientModal}/>
     <BurgerConstructor openOrderDetails={createOrder} />
   </main>
 );
};
