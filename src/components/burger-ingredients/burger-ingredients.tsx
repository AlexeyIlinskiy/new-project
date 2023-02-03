import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef, useState, FC } from 'react';
import { TIngredient } from '../../services/types/data';

import BurgerIngredientsSection from '../burger-ingredients-section/burger-ingredients-section'

type TBurgerIngredients = {
  openModal: (element: TIngredient) => void;
};

const BurgerIngredients: FC<TBurgerIngredients> = ({openModal}) => {
  
  const bunRef = useRef<HTMLLIElement>(null);
  const sauceRef = useRef<HTMLLIElement>(null);
  const mainRef = useRef<HTMLLIElement>(null);
  const scrollRef = useRef<HTMLUListElement>(null);

  const [current, setCurrent] = useState<string>('Булки');

  const switchTabs = (value: string) => {
    setCurrent(value);
    switch (value) {
      case 'Булки': {
        bunRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'Соусы': {
        sauceRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      case 'Начинки': {
        mainRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      }
      default: {
        bunRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    const containerTop = container?.getBoundingClientRect().top as number;
    const bunTop = bunRef.current?.getBoundingClientRect().top as number;
    const sauceTop = sauceRef.current?.getBoundingClientRect().top as number;
    const mainTop = mainRef.current?.getBoundingClientRect().top as number;
    const offset = [
      { name: 'Булки', value: Math.abs(containerTop - bunTop) },
      { name: 'Соусы', value: Math.abs(containerTop - sauceTop) },
      { name: 'Начинки', value: Math.abs(containerTop - mainTop) },
    ];
    const closest = offset.sort((a, b) => a.value - b.value)[0].name;
    if (current !== closest) {
      setCurrent(closest);
    }
  };
  
  return (
		<section className={ `${styles.root} mr-10`}>
			<h1 className={`${styles.title} text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
			<div className={`${styles.tabs} mb-8`}>
      	<Tab value="Булки" active={ current === 'Булки' } onClick={ switchTabs }>
        	Булки
      	</Tab>
      	<Tab value="Соусы" active={ current === 'Соусы' } onClick={ switchTabs }>
        	Соусы
      	</Tab>
      	<Tab value="Начинки" active={ current === 'Начинки' } onClick={ switchTabs }>
        	Начинки
      	</Tab>
    	</div>
			<ul className={ ` ${styles.ingredients} pl-4 pr-2` } onScroll={handleScroll}>
        <BurgerIngredientsSection type='bun' name='Булки' onClick={ openModal } ref={ bunRef } />
        <BurgerIngredientsSection type='sauce' name='Соусы'  onClick={ openModal } ref={ sauceRef } />
        <BurgerIngredientsSection type='main' name='Начинки' onClick={ openModal } ref={ mainRef }/>
      </ul>
		</section>
  )
}

export default BurgerIngredients;