import styles from './feed-info.module.css';

import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { wsConnectionClosed, wsConnectionStart } from '../../services/actions/wsActions';

const FeedInfo: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(wsConnectionStart());
      return () => {
        dispatch(wsConnectionClosed());
      };
    },[]);

  const orders = useSelector((store) => store.wsReducer.messages.orders);
  const total = useSelector((store) => store.wsReducer.messages.total);
  const totalToday = useSelector((store) => store.wsReducer.messages.totalToday);

  return (
    <div className={ styles.stats }>
      <div className={ styles.production }>
        <div className={ styles.board }>
          <p className={ `${styles.title} text text_type_main-medium` }>Готовы:</p>
          <ul className={ styles.numbers }>
            {orders.filter((item) => item.status === 'done').slice(0, 20).map((item) => {
              return (
                <li className={ `${styles.done} text text_type_digits-default` } key={ item._id }>{ item.number }</li>);
              })}
          </ul>
        </div>
        <div className={ styles.board }>
          <p className={ `${styles.title} text text_type_main-medium` }>В работе:</p>
          <ul className={ styles.numbers }>
            {orders.filter((item) => item.status === 'created').slice(0, 20).map((item) => {
              return (
                <li className={ `${styles.inWork} text text_type_digits-default` } key={ item._id}>{ item.number }</li>);
              })}
          </ul>
        </div>
        </div>
      <div>
        <p className={ `${styles.title} text text_type_main-medium` }>Выполнено за все время:</p>
        <p className={ `${styles.total} text text_type_digits-large` }>{ total }</p>
      </div>
      <div>
        <p className={ `${styles.title} text text_type_main-medium` }>Выполнено за сегодня:</p>
        <p className={ `${styles.total} text text_type_digits-large` } >{ totalToday }</p>
      </div>
    </div>
  );
}

export default FeedInfo;