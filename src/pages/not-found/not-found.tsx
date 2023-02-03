//Страница с 404 ошибкой.
import { FC } from 'react';
import styles from './not-found.module.css';
 
export const NotFoundPage: FC = () => {
 return (
   <div className={styles.container}>
     <p className="text_type_main-large mt-0">Страница не найдена. Ошибка 404. </p>
   </div>
 );
}