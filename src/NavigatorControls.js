import React, {Component} from 'react';

import {DATA} from './DATA.js';
import Lesson from './Lesson';
import Switch from './Switch';
import {connect} from 'react-redux';
import styles from './App.module.css';

class NavigatorControls extends Component {
    render() {
      const {addTopicIsDisabled, showForm} = this.props;
  
      return (
        <div className={styles['navigator-controls']}>
          <div>
            <button
              disabled={addTopicIsDisabled}
              className={addTopicIsDisabled ? styles['disabled-button'] : styles['navigator-controls-button']}
              onClick={() => showForm('new topic')}>
                + Add Topic
            </button>
          </div>
          <div>
            <button 
            className={styles['navigator-controls-button']}
            onClick={() => showForm('new module')}>
              + Add Module
            </button>
          </div>
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    modules: state.modules
  }
}

export default NavigatorControls;