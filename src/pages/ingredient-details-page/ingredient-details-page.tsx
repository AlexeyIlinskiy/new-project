//Страница с детальной информацией об ингредиенте /ingredients/:id

import styles from './ingredient-details-page.module.css';
import { useMemo, FC } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import { useParams } from 'react-router';
import IngredientDetails from '../../components/ingredient-details/ingredient-details'; //Компонент с детальной информацией об ингредиенте
import { TIngredient } from '../../services/types/data';

interface IParams {
  id: string;
}

export const IngredientDetailsPage: FC = () => {
  const { id } = useParams<IParams>();
  const ingredients = useSelector((store) => store.ingredients.ingredients);

  const currentIngredient = useMemo(() => ingredients.find((item: TIngredient) => item._id === id), [ingredients]);

  return (
    <section className={ styles.container }>
      {currentIngredient && (<IngredientDetails ingredient={currentIngredient} />)}
    </section>
  )
} 