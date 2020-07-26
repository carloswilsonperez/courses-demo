import React, {Component} from 'react';

import Badge from '@material-ui/core/Badge';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {connect} from 'react-redux';
import styles from './App.module.css';

class Card extends Component {
  updateState = (type, id) => {
    if (this.props.isOn) {
      this.props.updateState(type, id);
    }
  }

  render() {
    let {activeState, id, idSelected, isOn, title, type, typeSelected} = this.props;
    const cardStyle = type === 'topic' ? styles.cardTopic : styles.card;
    const cardIsClicked = type === typeSelected && id === idSelected;

    return (
      <div className={cardStyle}>
        {type === 'module' && <div className={styles['card-chevron-icon']}>
        {activeState ? <ExpandMoreIcon style={{ color: 'gray'}}/> : <NavigateNextIcon style={{ color: 'gray'}}/>}
        </div>}
        <div className={styles['card-body']} onClick={() => this.updateState(type, id)}>
        <div className={styles['card-menu-icon-container']}>
          <MenuIcon className={styles['card-menu-icon']}/>
        </div>
        <div className={isOn ? styles['card-content'] : styles['card-content-disabled']}>
          <div className={styles['card-content-header']}>
            <div className={cardIsClicked ? styles['card-content-header-selected'] : ''}>
              {type === 'module' ? 'Module' : 'Topic'} {id}
            </div>
            <div>
              <Badge className={styles['card-content-header-badge']} badgeContent={1} color="primary">
                <ChatBubbleIcon style={{fontSize: '18px'}}/>
              </Badge>
              <MoreHorizIcon style={{fontSize: '18px'}} />
            </div>
          </div>
          <div className={cardIsClicked ? styles['card-content-title-selected'] : styles['card-content-title']}>{title}</div>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    isOn: state.isOn
  }
}

export default connect(mapStateToProps)(Card);