import styles from './reset-password.module.css';
import { 
  PasswordInput,
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import {Link} from 'react-router-dom';

export default function ResetPasswordPage () {

  return (
    <section className={styles.container}>
        <h1 className="text text_type_main-medium">
            Восстановление пароля
        </h1>
        <form className={styles.form}>
        <div className="mt-6">
            <PasswordInput type='email' placeholder='Введите новый пароль' />
        </div>
        <div className="mt-6">
            <Input type='email' placeholder='Введите код из письма' />
        </div>
        <div className="mt-6">
            <Button type="primary" size="medium">
                Сохранить
            </Button>
        </div>
        </form>
        <div className="mt-20 text text_color_inactive text_type_main-small">
            Вспомнили пароль?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
        </div>
    </section>
)


};
