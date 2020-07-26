import React, {Component} from 'react';

import Card from './Card';
import {connect} from 'react-redux';
import styles from './App.module.css';

function getTopicById(topics, topicId) {
  return topics.find(topic => topic.id === topicId);
}
  
class Lesson extends Component {
  render() {
    let {id, isLoading, module, updateState, toggleOpenModule, topics, type, visibleModuleId} = this.props;
    
    const listOfTopics = module.topicIds.map(topicId => {
      return getTopicById(topics, topicId);
    });

    const activeState = module.id === visibleModuleId && toggleOpenModule;
    return (
      <div className={styles.lesson}>
        { module &&
          <Card 
            title={module.title} 
            id={module.id}
            idSelected={id}
            typeSelected={type}
            updateState={updateState} 
            type="module"
            activeState={activeState}
          />}

          {activeState && listOfTopics && topics.length > 0 &&
            <div>
              {listOfTopics.map(topic => {
                if (topic === undefined) return null;
                return (
                  <Card
                    key={topic.id}
                    title={topic.title} 
                    id={topic.id} 
                    idSelected={id}
                    typeSelected={type}
                    updateState={updateState} 
                    type="topic"
                    activeState={activeState}
                  />
                );
              })}
            </div>
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    topics: state.topics
  }
}
  
export default connect(mapStateToProps)(Lesson);