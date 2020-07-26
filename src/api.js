import { hideLoading, showLoading } from 'react-redux-loading-bar';

import {DATA} from './DATA.js';

export const getModulesInCourse = (courseId) => {
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

  return new Promise((res, rej) => {
    setTimeout(() => res(listOfModulesForCurrentCourse), 1000)
  });
};

export const getTopicsInCourse = async (courseId) => {
  let modulesInCurrentCourse = await getModulesInCourse(courseId);
  const listOfTopicIdsForCurrentCourse = [];

  modulesInCurrentCourse.forEach(module => {
    module.topicIds.forEach(topicId => listOfTopicIdsForCurrentCourse.push(topicId));
  });

  const listOfTopicsForCurrentCourse = listOfTopicIdsForCurrentCourse.map(topicId => {
    return DATA['topics'].find(topic => topic.id === topicId);
  });

  return new Promise((res, rej) => {
    setTimeout(() => res(listOfTopicsForCurrentCourse), 7000)
  });
};

export const getTopicsInModule = async (moduleId) => {
  const course = DATA['modules'].find(module => module.id === moduleId);
  const topicIds = course.topicIds;

  const listOfTopicsForCurrentModule = topicIds.map(topicId => DATA['topics'].find(topic => topic.id === topicId));

  return new Promise((res, rej) => {
    setTimeout(() => res(listOfTopicsForCurrentModule), 2000)
  });
};

export function startAsyncCall() {
  return {
      type: 'START_ASYNC_CALL',
  }
}

export function stopAsyncCall() {
  return {
      type: 'STOP_ASYNC_CALL',
  }
}

export function toggleSwitch(isOn) {
  return {
      type: 'TOGGLE_SWITCH',
      isOn
  }
}

export function receiveModules(modules) {
  return {
      type: 'RECEIVE_MODULES',
      modules
  }
}

export function addNewModule(module) {
  return {
      type: 'ADD_NEW_MODULE',
      module
  }
}

export function editModule(module) {
  return {
      type: 'EDIT_MODULE',
      module
  }
}

export function receiveTopics(topics) {
  return {
      type: 'RECEIVE_TOPICS',
      topics
  }
}

export function addNewTopic(topic) {
  return {
      type: 'ADD_NEW_TOPIC',
      topic
  }
}

export function editTopic(topic) {
  return {
      type: 'EDIT_TOPIC',
      topic
  }
}

export function handleGetModulesInCourse(courseId) {
  return (dispatch) => {
    dispatch(startAsyncCall());
    dispatch(showLoading());
    return getModulesInCourse(courseId)
      .then((modules) => {
        dispatch(stopAsyncCall());
        dispatch(hideLoading());
        dispatch(receiveModules(modules));
      });
  }
}

export function handleGetTopicsInCourse(courseId) {
  return (dispatch) => {
    dispatch(startAsyncCall());
    return getTopicsInCourse(courseId)
      .then((topics) => {
        dispatch(stopAsyncCall());
        dispatch(receiveTopics(topics));
      });
  }
}

export function handleGetTopicsInModule(moduleId) {
  return (dispatch) => {
    dispatch(startAsyncCall());
    dispatch(showLoading());
    return getTopicsInModule(moduleId)
      .then((topics) => {
        dispatch(stopAsyncCall());
        dispatch(hideLoading());
        dispatch(receiveTopics(topics));
      });
  }
}
