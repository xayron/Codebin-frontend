import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import Home from './components/Home';
import RawCode from './components/RawCode';
import CodePage from './components/CodePage';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.25em',
      height: '0.4em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#6D7183',
      outline: '1px solid slategrey',
      borderRadius: '0.2vw',
      minHeight: '14vh',
    },
  },
  mainBackground: {
    background: "#0f0f0f",
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  root: {
    flexGrow: 1,
  },
}));

export default function App() {
  const classes = useStyles();
  /** Hook for changing title */
  useEffect(() => {
    document.title = 'Codebin';
  });

  return (
    <div className={classes.mainBackground}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/raw" render={(props) => <RawCode {...props} />} />
          <Route path="*" render={(props) => <CodePage {...props} />} />
        </Switch>
      </Router>
    </div>
  );
}