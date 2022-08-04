import React from 'react';
import ReactDOM from 'react-dom/client';
import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={`${styles.header}`}>
    <container className={styles.container}>
      <nav className={styles.nav}>
        <button href='#' className={`${styles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}> 
          <BurgerIcon type="secondary" />
          <span className={`${styles.button_text} ml-2 text text_type_main-default`}>Конструктор</span>
        </button>
        <button href='#' className={`${styles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
          <ListIcon type="secondary" />
          <span className={`${styles.button_text} ml-2 text text_type_main-default text_color_inactive`}>Лента заказов</span>
        </button>
      </nav>
        <Logo />
      <button href='#'
        className={`${styles.button} pt-4 pr-5 pb-4 pl-5 mr-2`}>
        <ProfileIcon type="secondary" />
        <span className={`${styles.button_text} ml-2 text text_type_main-default text_color_inactive`}>Личный кабинет</span>
      </button>
    </container>
  </header>
);
}

export default AppHeader;