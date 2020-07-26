import LockIcon from '@material-ui/icons/Lock';
import React from 'react';
import styles from './App.module.css';

const Switch = ({ isOn, handleToggle }) => {
    return (
      <div className={styles.switch}>
        <input
          checked={isOn}
          onChange={handleToggle}
          className={styles['react-switch-checkbox']}
          id={`react-switch-new`}
          type="checkbox"
        />
        <label
          className={styles['react-switch-label']}
          htmlFor={`react-switch-new`}
        >
          <span className={styles['react-switch-button']}>
            <LockIcon className={styles['react-switch-label-icon']}/>
          </span>
        </label>
      </div>
    );
  };

  export default Switch;    