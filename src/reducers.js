
export function isLoading (state = 0, action) {
  switch (action.type) {
    case 'START_ASYNC_CALL':
        return state + 1;
    case 'STOP_ASYNC_CALL':
        return state > 0 ? state - 1 : 0;
    default:
        return state;
  }
}

export function modules (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_MODULES':
      return [...action.modules];
    case 'ADD_NEW_MODULE':
      return [...state, action.module];
    case 'EDIT_MODULE':
      return state.map( (module) => {
        if(module.id !== action.module.id) {
            return module;
        }
        
        return {
          ...module,
          ...action.module
        };    
      });
    default:
      return state;
  }
}

export function topics (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_TOPICS':
      return [...state, ...action.topics];
    case 'ADD_NEW_TOPIC':
      return [...state, action.topic];
    case 'EDIT_TOPIC':
      return state.map((topic) => {
        if(topic.id !== action.topic.id) {
        return topic;
        }
        
        return {
          ...topic,
          ...action.topic
        };    
      });
    default:
      return state;
  }
}

export function isOn (state = true, action) {
  switch (action.type) {
    case 'TOGGLE_SWITCH':
      return !action.isOn;
    default:
      return state;
  }
}