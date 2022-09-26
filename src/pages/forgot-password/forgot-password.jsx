import styles from './forgot-password.module.css';
import { 
  Input,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import {Link} from 'react-router-dom';

export default function ForgotPasswordPage () {

  return (
    <section className={styles.container}>
        <h1 className="text text_type_main-medium">
            Восстановление пароля
        </h1>
        <form className={styles.form}>
        <div className="mt-6">
            <Input type='email' placeholder='Укажите e-mail' />
        </div>
        <div className="mt-6">
            <Button type="primary" size="medium">
                Восстановить
            </Button>
        </div>
        </form>
        <div className="mt-20 text text_color_inactive text_type_main-small">
            Вспомнили пароль?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
        </div>
    </section>
)


};
