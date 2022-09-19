import styles from './burger-ingredients-section.module.css';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

const BurgerIngredientsSection = forwardRef(({ type, name, onClick }, ref) => {
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

BurgerIngredientsSection.propTypes = { 
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default BurgerIngredientsSection;