import {useEffect, FC, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { modals } from '../../utils/constants';

type TModal = {
  children: ReactNode;
  header: string;
  onClose: () => void;
  headerStyle?: string;
};

export const Modal: FC<TModal> = ({header, children, onClose}) => {

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    }

    document.addEventListener('keydown', close);

    return () => {document.removeEventListener('keydown', close);}

  },[onClose]);
  

    return ReactDOM.createPortal (
      (
      <>
        <ModalOverlay onClick={ onClose } />  
        <div className={`${styles.root} pt-10 pr-10 pb-15 pl-10`}>
          <div className={styles.header}>
            { header && <h2 className="text_type_main-large">{header}</h2>}
            <button className={styles.closeButton} onClick={ onClose }>
              <CloseIcon type="primary" />
            </button>
          </div>
            {children}
        </div>
      </>
      ), modals
  );
};