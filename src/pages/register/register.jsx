import styles from './register.module.css';
import {
  Input,
  EmailInput,
  PasswordInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import {Link} from 'react-router-dom';

export default function RegisterPage () {

  return (
    <section className={styles.container}>
        <h1 className="text text_type_main-medium">
            Регистрация
        </h1>
        <form className={styles.form}>
        <div className="mt-6">
            <Input name={'name'} placeholder='Имя'/>
        </div>
        <div className="mt-6">
            <EmailInput name={'email'} />
        </div>
        <div className="mt-6">
            <PasswordInput name={'password'} />
        </div>
        <div className="mt-6">
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
        </div>
        </form>
        <div className="mt-20 text text_color_inactive text_type_main-small">
            Вы уже зарегистрированы?<Link className={"ml-4 " + styles.link} to='/login'>Войти</Link>
        </div>
    </section>
)


};
