import axios from 'axios';

// Action types
const WORDCLOUD_DATA_REQUEST = 'WORDCLOUD_DATA_REQUEST';
const WORDCLOUD_DATA_FAILURE = 'WORDCLOUD_DATA_FAILURE';
const WORDCLOUD_DATA_SUCCESS = 'WORDCLOUD_DATA_SUCCESS';

// Action creators
const wordcloudDataRequest = () => {
  return {
    type: WORDCLOUD_DATA_REQUEST,
  };
};

const wordcloudDataFailure = () => {
  return {
    type: WORDCLOUD_DATA_FAILURE,
  };
};

const wordcloudDataSuccess = wordData => {
  return {
    type: WORDCLOUD_DATA_SUCCESS,
    wordData,
  };
};

const initialState = { status: 'initial', wordData: [] };

// Reducer
export const wordcloudData = (state = initialState, action) => {
  switch (action.type) {
    case WORDCLOUD_DATA_REQUEST:
      return { status: 'fetching', wordData: [] };
    case WORDCLOUD_DATA_FAILURE:
      return { status: 'failed', wordData: [] };
    case WORDCLOUD_DATA_SUCCESS:
      return { status: 'fetched', wordData: action.wordData };
      default:
        return state;
  }
};

// Thunk
export const fetchWordcloudData = word => {
  return dispatch => {
    dispatch(wordcloudDataRequest());
    return axios
      .get(`/api/tweets/${word}`)
      .then(response => response.data)
      .then(wordData => dispatch(wordcloudDataSuccess(wordData)))
      .catch(() => dispatch(wordcloudDataFailure()));
  };
};