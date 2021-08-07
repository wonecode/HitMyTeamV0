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
import Register from './pages/Register';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import blue from '@material-ui/core/colors/blue';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#F7CA18',
    },
    secondary: {
      main: blue[500]
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
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/connexion'>
            <Login />
          </Route>
          <Route path='/inscription'>
            <Register />
          </Route>
          <Layout>
            <Route path='/profil'>
              <Profile />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
