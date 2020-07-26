import * as API from './api';

import React, {Component} from 'react';

import {DATA} from './DATA.js';
import Lesson from './Lesson';
import Switch from './Switch';
import {connect} from 'react-redux';
import styles from './App.module.css';

class Navigator extends Component {
    state = {
      visibleModuleId: null,
      toggleOpenModule: false
    };
  
    updateState = (type, id) => {
      if (!this.props.isLoading) {
        this.props.updateType(type, id);
      }
    
      if (id === this.state.visibleModuleId && type === 'module' && !this.props.isLoading) {
        this.setState({
          toggleOpenModule: !this.state.toggleOpenModule
        });
      } else if (type === 'module' && !this.props.isLoading) {
        this.setState({
          toggleOpenModule: true,
          visibleModuleId: id
        });
      }
    }

    toggleSwitch = () => {
      this.props.dispatch(API.toggleSwitch(this.props.isOn));
    }
  
    render() {
      const {id, isLoading, isOn, modules, showForm, type} = this.props;
      const addTopicIsDisabled = !this.state.visibleModuleId || !isOn;
      const courseTitle = DATA['courses'][0].title;
  
      return (
        <div className={styles.navigator}>
          <div className={styles['switch-container']}>
            Section Unlocked
            <Switch
              isOn={isOn}
              handleToggle={this.toggleSwitch}
            />
          </div>
          <div className={styles['course-input-container']}>
            <input type="text" className={styles['course-input']} defaultValue={courseTitle} disabled={!isOn} />
          </div>
          <div className={styles['course-lesson-body']}>
          { modules && modules.length > 0 &&
            modules.map(module => {
              return (
                <Lesson 
                  key={Math.random()}
                  id={id}
                  module={module}
                  toggleOpenModule={this.state.toggleOpenModule}
                  type={type}
                  updateState={this.updateState}
                  visibleModuleId={this.state.visibleModuleId}
                />
              );
            })
          }
          </div>
          {
            modules.length === 0 && <div>NO MODULES AVAILABLE</div>
          }
          <div className={styles['navigator-controls']}>
            <div>
              <button
                disabled={addTopicIsDisabled}
                className={addTopicIsDisabled ? styles['disabled-button'] : styles['navigator-controls-button']}
                onClick={() => showForm('new topic')}>
                  <span className={styles['navigator-controls-plus']}>+</span> Add Topic
              </button>
            </div>
            <div>
              <button 
              disabled={!isOn}
              className={!isOn ? styles['disabled-button'] : styles['navigator-controls-button']}
              onClick={() => showForm('new module')}>
                <span className={styles['navigator-controls-plus']}>+</span> Add Module
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    isOn: state.isOn,
    modules: state.modules
  }
}

export default connect(mapStateToProps)(Navigator);