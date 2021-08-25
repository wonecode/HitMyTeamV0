import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/layout.scss';
import logoSymbole from '../images/logo/logo-symbole-typo-yellow.png';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import HelpIcon from '@material-ui/icons/Help';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    color: '#ffd736',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  activeIcon: {
    color: '#ffd736',
  },
  drawerContainer: {
    overflow: 'auto',
    padding: '16px'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const mainMenuItems = [
    {
      text: 'Profil',
      icon: <AccountBoxIcon />,
      path: '/profil',
    },
  ];

  const secondMenuItems = [
    {
      text: 'Paramètres',
      icon: <SettingsIcon />,
    },
    {
      text: 'Déconnexion',
      icon: <ExitToAppIcon color='error' />,
      path: '/deconnexion',
    },
  ];

  const thirdMenuItems = [
    {
      text: 'Nouveautés',
      icon: <NewReleasesIcon />,
      path: '/nouveautes',
    },
    {
      text: 'FAQ',
      icon: <HelpIcon />,
      path: '/faq',
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <div className='nav-text'>
            {mainMenuItems.map((item) => (
              <img src={logoSymbole} alt='hitmyteam' className='logo-typo' />
            ))}
            <Avatar className={classes.avatar}></Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <div className='drawer-header'>
            <Avatar className={classes.avatar}></Avatar>
            <div>
              <Typography className='username'>WONEZER</Typography>
              <Typography className='status' color='primary'>
                Player
              </Typography>
            </div>
          </div>
          <Divider />
          <Typography className='first-title title-links' variant='h6'>
            GENERAL
          </Typography>
          <List className='links-buttons'>
            {mainMenuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={location.pathname == item.path ? classes.active : null}
              >
                <ListItemIcon
                  className={location.pathname == item.path ? classes.activeIcon : null}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Typography className='title-links' variant='h6'>
            COMPTE
          </Typography>
          <List className='links-buttons'>
            {secondMenuItems.map((item) => (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Typography className='title-links' variant='h6'>
            HITMYTEAM
          </Typography>
          <List className='links-buttons'>
            {thirdMenuItems.map((item) => (
              <ListItem button key={item.text}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
