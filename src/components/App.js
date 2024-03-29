import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Landing from './Landing';
import { loginSession } from '../reducers/userReducer';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './Search';
import Navbar from './Navbar';

import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';

const App = ({ loginSession }) => {
  useEffect(() => {
    loginSession();
  }, []);

  return (
    <SnackbarProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline /> {/* normalize browser css default setups */}
          <Route component={Navbar} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/search/" component={Search} />
          <Route path="/search/:searchType/:searchText" component={Search} />
        </Router>
      </ThemeProvider>
    </SnackbarProvider>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loginSession: () => dispatch(loginSession()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
