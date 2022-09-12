import { useContext, useReducer, useEffect } from "react"
import styles from './total.module.css';

import ingredientsTypes from '../../utils/types';
import PropTypes from 'prop-types';

import { 
  Button, 
  CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientsContext } from "../../services/ingredientsContext";


const initialState = {
  total: 0
}

export default function Total ({openOrderDetails}) { 

  const ingredients = useContext(IngredientsContext);
  
  const bun = ingredients.find((item) => item.type === 'bun');
  const toppings = ingredients.filter(item => item.type === 'main' || item.type === 'sauce');
  const total = toppings.length && toppings.reduce((total, current) => total + current.price, 0) + bun.price * 2;


//создадим функцию редьюсер
function reducer (state, action) {
  switch(action.type) {
    case 'TOTAL':
      return { ...state, total};
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

const [state, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
  dispatch (
    {type: 'TOTAL'}
  )
}, [ingredients]);


  return (
    <div className={`${styles.total} mt-10 pr-8`}>
      <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
        {state.total} 
        <CurrencyIcon type="primary" />
      </span>
      <Button type="primary" size="medium" onClick={ openOrderDetails }>
        Оформить заказ
      </Button>
    </div>
  )    
}

Total.propTypes = { 
  openOrderDetails: PropTypes.func.isRequired,
};