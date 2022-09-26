import styles from './login.module.css';
import { 
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import {Link} from 'react-router-dom';

export default function LoginPage () {

  return (
    <section className={styles.container}>
        <h1 className="text text_type_main-medium">
            Вход
        </h1>
        <form className={styles.form}>
        <div className="mt-6">
            <EmailInput name={'email'} />
        </div>
        <div className="mt-6">
            <PasswordInput name={'password'} />
        </div>
        <div className="mt-6">
            <Button type="primary" size="medium">
                Войти
            </Button>
        </div>
        </form>
        <div className="mt-20 text text_color_inactive text_type_main-small">
            Вы — новый пользователь?<Link className={"ml-4 " + styles.link} to='/register'>Зарегистрироваться</Link>
        </div>
        <div className="mt-4 text text_color_inactive text_type_main-small">
            Забыли пароль?<Link className={"ml-4 " + styles.link} to='/forgot-password'>Восстановить пароль</Link>
        </div>
    </section>
)


};
