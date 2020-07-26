import React, {Component} from 'react';

import Container from './Container';
import LoadingBar from 'react-redux-loading-bar';
import styles from './App.module.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <LoadingBar />
        <Container />
      </div>
    );
  }
}

export default App;
