import styles from './modal-overlay.module.css';
import { FC } from 'react';

interface IModalOverlay {
  onClick: () => void;
}

export const ModalOverlay: FC<IModalOverlay> = ({onClick }) => {
    
  return (
    <div className={styles.root} onClick={onClick}>
    </div>
  )
};