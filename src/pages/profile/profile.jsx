import styles from './profile.module.css';
import { 
  Input,
  PasswordInput,
  EmailInput,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';

import {Link, NavLink} from 'react-router-dom';

export default function ProfilePage () {
  
  return (
    <section className={`${styles.root_container} mt-30`}>
      <div className={styles.links_container}>
        <NavLink to="/profile"
          exact
          activeClassName={styles.active_link}
          className={"text text_type_main-medium mt-5 text_color_inactive " + styles.menu_item}>Профиль</NavLink>
        <NavLink to="/profile/orders"
          exact
          activeClassName={styles.active_link}
          className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>История заказов</NavLink>
        <NavLink to="/logout"
          exact
          activeClassName={styles.active_link}
          className={"text text_type_main-medium mt-10 text_color_inactive " + styles.menu_item}>Выход</NavLink>
        <div className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</div>
      </div>
      <form className={styles.form_container}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          name='name'
        />
        <EmailInput name={'email'} />
        <PasswordInput name={'password'} />
        <div className={styles.buttons}>
          <Button type="secondary" htmlType="button" size="medium" >
            Отменить
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  )
};
