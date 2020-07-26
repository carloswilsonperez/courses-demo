import * as API from './api';

import React, {Component} from 'react';

import {DATA} from './DATA.js';
import Details from './Details';
import Navigator from './Navigator';
import {connect} from 'react-redux';
import styles from './App.module.css';

const getModulesInCourse = (courseId) => {
  const currentCourse = DATA['courses'].find(course => course.id === courseId); 
  const moduleIds = currentCourse.moduleIds;
  const listOfModulesForCurrentCourse = [];
  
  moduleIds.forEach(moduleId => {
    DATA['modules'].forEach(module => {
      if (module.id === moduleId) {
        listOfModulesForCurrentCourse.push(module);
      }
    });
  });

  return listOfModulesForCurrentCourse;
};

const getTopicsInCourse = (courseId) => {
  const modulesInCurrentCourse = getModulesInCourse(courseId);
  const listOfTopicIdsForCurrentCourse = [];

  modulesInCurrentCourse.forEach(module => {
    module.topicIds.forEach(topicId => listOfTopicIdsForCurrentCourse.push(topicId));
  });

  const listOfTopicsForCurrentCourse = listOfTopicIdsForCurrentCourse.map(topicId => {
    return DATA['topics'].find(topic => topic.id === topicId);
  });

  return listOfTopicsForCurrentCourse;
};

class Container extends Component {
    state = {
      courseId: '1', // id of the current course
      id: null, // id of the currently clicked card
      type: null, // type of the currently clicked card
      addTopic: false,  // flag to know when the user want to add a new topic
      addModule: false  // flag to know when the user want to add a new module
    };
  
    componentDidMount () {
      this.props.dispatch(API.handleGetModulesInCourse(this.state.courseId));
      // this.props.dispatch(API.handleGetTopicsInCourse(this.state.courseId));
    }
  
    updateType = (type, id) => {
      this.setState({id: id, type: type, addTopic: false, addModule: false});

      // Verify if topics are available for current module
      if (type === 'module') {
        const topicIds = this.props.modules.find(module => module.id === id).topicIds;
        const topicsAreAvailable = topicIds.every(topicId => {
          const topic = this.props.topics.find(topic => topic.id === topicId);
          if (topic) {
            return true;
          } else {
            return false;
          }
        });
        if (!topicsAreAvailable) {
          this.props.dispatch(API.handleGetTopicsInModule(id));
        }
      }

      // If not, get the topics and add them to the 'topics' array in the state
    }
  
    editContent = (moduleData) => {
      if (this.state.type === 'module' && this.state.addModule) {
        this.addNewModule(moduleData);
      } else if (this.state.type === 'module' && this.state.addTopic) {
        this.addNewTopic(moduleData);
      } else if (this.state.type === 'module' && !this.state.addModule && !this.state.addTopic) {
        this.editModule(moduleData);
      } else if (this.state.type === 'topic' && this.state.addTopic) {
        this.addNewTopic(moduleData);
      } else if (this.state.type === 'topic' && !this.state.addTopic) {
        this.editTopic(moduleData);
      }
    }
  
    editModule = (moduleData) => {
      let moduleToUpdate = this.props.modules.find(module => module.id === this.state.id);
      moduleToUpdate.title = moduleData.title;
      moduleToUpdate.description = moduleData.description;
      this.props.dispatch(API.editModule(moduleToUpdate));
    }
  
    editTopic = (moduleData) => {
      // Find module associated with the selected topic
      let copyOfTopics = [...this.props.topics];
      const topicToEdit = copyOfTopics.find(topic => topic.id === this.state.id);

      // Edit values for the selected topic
      topicToEdit.title = moduleData.title;
      topicToEdit.description = moduleData.description;
      this.props.dispatch(API.editTopic(topicToEdit));
    }
  
    addNewModule = (moduleData) => {
      const courseToUpdate = DATA['courses'].find(course => course.id === this.state.courseId);
      const idForNewModule = this.props.modules.length + 1;
      courseToUpdate.moduleIds.push(idForNewModule.toString());
  
      // Add a new module to the modules array
      const newModule = {
        id: idForNewModule.toString(),
        title: moduleData.title,
        description: moduleData.description,
        topicIds: []
      }

      this.props.dispatch(API.addNewModule(newModule));
      this.setState({id: newModule.id, type: 'module', addTopic: false, addModule: false});
    }
  
    addNewTopic = (topicData) => {
      // Find Module by moduleID
      const type = this.state.type;
      const id = this.state.id;
  
      if (type === 'module') {
        // Find module with given id
        const copyOfModules = this.props.modules.slice();
        const moduleForNewTopic = copyOfModules.find(module => module.id === id);
  
        // Add new topic id to modules's topicIds
        const newTopicId = this.props.topics.length + 1;
        moduleForNewTopic.topicIds.push(newTopicId.toString());

        // this.props.dispatch(API.editModule(moduleForNewTopic));

        // Add new entry to the topics array
        const newTopic = {
          id: newTopicId.toString(),
          title: topicData.title,
          description: topicData.description
        };

        this.props.dispatch(API.addNewTopic(newTopic));
  
        const copyOfTopics = [...this.props.topics];
        copyOfTopics.push(newTopic);
        this.setState({id: newTopic.id, type: 'topic', addTopic: false, addModule: false});

      } else {
        const copyOfModules = [...this.props.modules];
        const moduleForNewTopic = copyOfModules.find(module => module.topicIds.includes(this.state.id));
  
        // Add new topic id to modules's topicIds
        const newTopicId = this.props.topics.length + 1;
        moduleForNewTopic.topicIds.push(newTopicId.toString());
  
        // Add new entry to the topics array
        const newTopic = {
          id: newTopicId.toString(),
          title: topicData.title,
          description: topicData.description
        };

        this.props.dispatch(API.addNewTopic(newTopic));
  
        const copyOfTopics = [...this.props.topics];
        copyOfTopics.push(newTopic);
        this.setState({id: newTopic.id, type: 'topic', addTopic: false, addModule: false});
      }
    }
  
    showForm = (type) => {
      if (type === 'new module') {
        this.setState({addModule: true, type: 'module', addTopic: false});
      } else if (type === 'new topic') {
        this.setState({addTopic: true, addModule: false});
      }
    }
    
    render() {
      return (
        <div className={styles.container}>
          <Navigator
            id={this.state.id}
            type={this.state.type} 
            updateType={this.updateType} 
            showForm={this.showForm}
          />
          <Details 
            id={this.state.id} 
            type={this.state.type} 
            addTopic={this.state.addTopic}
            addModule={this.state.addModule}
            editContent={this.editContent}
            />
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
  
export default connect(mapStateToProps)(Container);