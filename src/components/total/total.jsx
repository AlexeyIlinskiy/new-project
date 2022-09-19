import styles from './total.module.css';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function Total ({openOrderDetails}) {
  const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients);
  const bun = Boolean(constructorIngredients) && constructorIngredients.find((item) => item.type === 'bun');
  
  const total = useMemo(() => {
    return (
      constructorIngredients.length ? constructorIngredients.reduce((total, current) => 
      (current.type !== 'bun' ? total + current.price : total + current.price * 2), 0) : 0
      );
    }, [constructorIngredients]);

  return (
    <div className={`${styles.total} mt-10 pr-8`}>
      <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
        {total} 
        <CurrencyIcon type="primary" />
      </span>
      <Button type="primary" size="medium" onClick={ openOrderDetails } disabled={ !constructorIngredients.length || !bun }>
        Оформить заказ
      </Button>
    </div>
  )  

};

Total.propTypes = { 
  openOrderDetails: PropTypes.func.isRequired,
};