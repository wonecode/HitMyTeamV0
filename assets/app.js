import React from 'react';
import {
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { Helmet } from 'react-helmet';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#F7CA18',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='App'>
          <div className='content'>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/connexion'>
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
