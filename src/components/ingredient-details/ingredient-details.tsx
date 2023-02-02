import styles from './ingredient-details.module.css';
import { FC } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

interface IIngredientDetails {
  ingredient?: TIngredient;
}

interface IParams {
  id: string;
}

const IngredientDetails: FC<IIngredientDetails> = () => {
  const { id } = useParams<IParams>();

  const { ingredients } = useSelector((store) => store.ingredients);
  const currentIngredient = ingredients.length && ingredients.find((item) => item._id === id);

  return (
    <section className={styles.root}>
      { currentIngredient
      && (
      <>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      <h4 className="text_type_main-medium mb-8 mt-4">{currentIngredient.name}</h4>
      <div className={`${styles.info}`}>
        <div className={`${styles.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Калории,ккал</span>
          <span className="text_type_digits-default">{currentIngredient.calories}</span>
        </div>
        <div className={`${styles.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Белки, г</span>
          <span className="text_type_digits-default">{currentIngredient.proteins}</span>
        </div>
        <div className={`${styles.infoItem} mr-5`}>
          <span className="text_type_main-default mb-2">Жиры, г</span>
          <span className="text_type_digits-default">{currentIngredient.fat}</span>
        </div>
        <div className={`${styles.infoItem}`}>
          <span className="text_type_main-default mb-2">Углеводы, г</span>
          <span className="text_type_digits-default">{currentIngredient.carbohydrates}</span>
        </div>
      </div>
    </>)}
    </section>
  )
};

export default IngredientDetails;