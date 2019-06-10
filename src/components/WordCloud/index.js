import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core/';

import WordCloudComponent from './WordCloudComponent';
import Loading from '../Common/Loading';
import Input from '../Common/Input';
import Message from '../Common/Message';
import EmbeddedTweets from '../EmbeddedTweets';

import { endLoading } from '../../reducers/loadingReducer';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    width: '100%',
    height: '100vh',
  },
  input: {
    margin: '1rem 0',
  },
  button: {
    backgroundColor: theme.palette.secondary.contrastText,
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
  },
  tweetsList: {
    alignItems: 'center',
    overflowY: 'scroll',
    maxHeight: '100vh',
  },
}));

const WordCloud = props => {
  const classes = useStyles();

  const {
    tweets,
    loading: { wordcloudIsLoading },
    wordcloudData: { status, wordData },
    endLoading,
  } = props;

  useEffect(() => {
    if (status === 'failed' || status === 'fetched')
      endLoading('wordcloudIsLoading');
  }, [tweets, status]);

  return (
    <Fragment>
      <div className={classes.input}>
        <Input />
      </div>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        <Grid item xs>
          {!wordcloudIsLoading && status === 'initial' && (
            <Message message="Please enter data" />
          )}
          {status === 'failed' && (
            <Message message="Data fetched unsuccessfully. Please try again." />
          )}
          {wordcloudIsLoading && <Loading />}
          {status === 'fetched' && <WordCloudComponent wordData={wordData} />}
        </Grid>
        {tweets && tweets.selectedTweets.length && (
          <Grid item xs={3} className={classes.tweetsList}>
            <EmbeddedTweets />
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { endLoading }
)(WordCloud);
