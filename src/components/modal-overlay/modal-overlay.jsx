import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';

import PropTypes from 'prop-types';

import { modals } from '../../utils/constants';

function ModalOverlay({ children, onClick }) {
    return ReactDOM.createPortal(
        (
          <div className={styles.root} onClick={onClick}>
              {children} 
          </div>
        ), 
        modals
    );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;