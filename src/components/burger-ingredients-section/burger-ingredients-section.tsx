import styles from './burger-ingredients-section.module.css';

import { forwardRef } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { TIngredient } from '../../services/types/data';

interface IBurgerIngredientsSection {
  type: string;
  name: string;
  onClick: (el: TIngredient) => void;
}

const BurgerIngredientsSection = forwardRef<HTMLLIElement, IBurgerIngredientsSection>(({ type, name, onClick }, ref) => {
  const ingredients = useSelector(state => state.ingredients.ingredients);

  return (
    (
      <li ref={ ref }>
        <h2 className='text text_type_main-medium text_color_primary'>{ name }</h2>
        <div className={ styles.cardContainer }>
          { ingredients && ingredients.filter(item => item.type === type).map((element, index) => (
            <BurgerIngredient element={ element } onClick={() => onClick(element)} key={ element._id } />))}
        </div>
      </li>
    )
  );
}
)

export default BurgerIngredientsSection;