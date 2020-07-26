import { Field, Form } from 'react-final-form';
import { Grid, Paper } from '@material-ui/core';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import React from 'react';
import { TextField } from 'final-form-material-ui';
import {connect} from 'react-redux';
import styles from './App.module.css';

const validate = (values) => {
    const errors = {};
    if (!values.title && !values.addModule && !values.addModule) {
      errors.title = 'Required';
    }
    if (!values.description && !values.addModule && !values.addModule) {
      errors.description = 'Required';
    }
    return errors;
  };
  
  function FormDetails(props) {
    const {addTopic, addModule, isOn, module, editContent} = props;
  
    let title = '';
    let description = '';
  
    if (!addTopic && !addModule) {
      title = module.title || '';
      description = module.description || '';
    }
  
    const onSubmit = async values => {
      props.dispatch(showLoading());
      const sleep = ms => new Promise(resolve => setTimeout(() => {
        resolve();
      }, ms));
      await sleep(1300);
      props.dispatch(hideLoading());
      editContent(values);
    };

    let label;
    if (addTopic) {
      label = 'ADD TOPIC';
    } else if (addModule) {
      label = 'ADD MODULE';
    } else {
      label = 'UPDATE CONTENT'
    }
    
    return (
      <div style={{ padding: 0, maxWidth: 800 }}>
        <Form
          onSubmit={onSubmit}
          initialValues={{ title: title, description: description, addTopic: addTopic, addModule: addModule }}
          validate={validate}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="title"
                      component={TextField}
                      type="text"
                      label="Title"
                      disabled={!isOn}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="description"
                      fullWidth
                      required
                      component={TextField}
                      type="text"
                      label="Description"
                      disabled={!isOn}
                    />
                  </Grid>
                  <Grid item style={{ marginTop: 16 }}>
                    <button
                    className={!isOn ? styles['disabled-button'] : styles['navigator-controls-button']}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!isOn}
                    >
                      {label}
                    </button>
                  </Grid>
                </Grid>
              </Paper>
              {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
            </form>
          )}
        />
      </div>
    );
  }

  function mapStateToProps(state) {
    return {
      isLoading: state.isLoading,
      isOn: state.isOn
    }
  }
    
  export default connect(mapStateToProps)(FormDetails);