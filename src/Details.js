import React, {Component} from 'react';

import FormDetails from './FormDetails';
import {connect} from 'react-redux';
import styles from './App.module.css';

const findModuleBy = (type, id, modules, topics) => {
    if (id) {
      if (type === 'modules') {
        return modules.find(contentObject => {
          return contentObject.id === id;
        });
      } else if (type === 'topics') {
        return topics.find(contentObject => {
          return contentObject.id === id;
        });
      } else return null;
    };
  };
  
  class Details extends Component {
    render() {
      let {type, id, isLoading, editContent, addModule, addTopic, modules, topics} = this.props;
  
      let section;
      if (type === 'module') {
        section = 'modules';
      } else {
        section = 'topics'
      }
  
      // Get data for object of given type and id
      const module = findModuleBy(section, id, modules, topics);
  
      // Hand the info to the FormDetails component
      return (
        <div className={styles.details}>
          {((type !== null && id !== null) || addTopic || addModule) 
          && <FormDetails 
              module={module} 
              addTopic={addTopic}
              addModule={addModule}
              editContent={editContent}
          />}
        </div>
      );
    }
  }

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    modules: state.modules,
    topics: state.topics
  }
}

export default connect(mapStateToProps)(Details);