import styles from './total.module.css';
import { FC } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../services/hooks/hooks';
import { TIngredient } from '../../services/types/data';

interface ITotal {
  openOrderDetails: () => void;
}

export const Total: FC<ITotal> = ({openOrderDetails}) => {
  const constructorIngredients = useSelector((store) => store.constructorReducer.constructorIngredients);
  const bun = Boolean(constructorIngredients) && constructorIngredients.find((item:TIngredient) => item.type === 'bun');

  const total = constructorIngredients.reduce((acc: number, { price }: any) =>  { 
    return  acc + parseInt(price)
  }, 0);

  return (
    <div className={`${styles.total} mt-10 pr-8`}>
      <span className={`${styles.totalSum} mr-10 text_type_digits-medium`}>
        {total} 
        <CurrencyIcon type="primary" />
      </span>
      <Button htmlType='button' type="primary" size="medium" onClick={ openOrderDetails } disabled={ !constructorIngredients.length || !bun }>
        Оформить заказ
      </Button>
    </div>
  )  
};
