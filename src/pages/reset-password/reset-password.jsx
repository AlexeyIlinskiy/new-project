import styles from './reset-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';

import { resetPassword } from '../../services/actions/user';

export function ResetPasswordPage () {
  const { isAuth } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();

  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');

  const prevPath = history.location.state?.previousPath;

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(password, token, history));
    // history.push('/login');
  }

  const handleSetPassword = (e) => {setPassword(e.target.value)}
  const handleSetToken = (e) => {setToken(e.target.value)}

  if (isAuth) {
    return (
      <Redirect to={"/"}/>
    );
  }

  if (!prevPath) {
    return (
      <Redirect to={{
        pathname: '/login',
      }}
      />
    );
  }

  return (
    <section className={styles.container}>
      <h1 className={`${styles.title} text_type_main-medium mb-6`}>
            Восстановление пароля
      </h1>
      <form 
        id="reset-password-form" 
        className={`${styles.form}`}
        onSubmit={handleResetPassword}
      >
        <Input
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleSetPassword}
          value={password}
          name={'password'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleSetToken}
          value={token}
          name={'code'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="mt-20 text text_color_inactive text_type_main-small">
        Вспомнили пароль?<Link className={`${styles.link} ml-4`} to='/login'>Войти</Link>
      </p>
    </section>
 )


};
