import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import AssessmentIcon from '@material-ui/icons/Assessment';
import PageviewIcon from '@material-ui/icons/Pageview';
import { Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'universal-cookie';
import { useSnackbar } from 'notistack';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  page: {
    width: '100%',
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  active: {
    color: '#ffd736',
    backgroundColor: '#202124',
  },
  activeIcon: {
    color: '#ffd736',
  },
  drawerContainer: {
    overflow: 'auto',
    padding: '16px',
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
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = children;
  const theme = useTheme();
  const cookies = new Cookies();
  const { enqueueSnackbar } = useSnackbar();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDisconnect = () => {
    cookies.remove('HitMyTeam');

    enqueueSnackbar(`Vous avez été déconnecté`, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });

    history.push('/connexion');
  }

  const mainMenuItems = [
    {
      text: 'Trouves ton équipe',
      icon: <PageviewIcon />,
      path: '/hityourteam',
    },
    {
      text: 'Classement',
      icon: <AssessmentIcon />,
      path: '/classement',
    },
  ];

  const secondMenuItems = [
    {
      text: 'Profil',
      icon: <AccountBoxIcon />,
      path: '/profil',
    },
    {
      text: 'Paramètres',
      icon: <SettingsIcon />,
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

  const drawer = (
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
              <ListItemIcon className={location.pathname == item.path ? classes.activeIcon : null}>
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
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon className={location.pathname == item.path ? classes.activeIcon : null}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <ListItem button onClick={() => handleDisconnect()}>
            <ListItemIcon>
              <ExitToAppIcon color='error' />
            </ListItemIcon>
            <ListItemText primary='Déconnexion' />
          </ListItem>
        </List>
        <Typography className='title-links' variant='h6'>
          HITMYTEAM
        </Typography>
        <List className='links-buttons'>
          {thirdMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon className={location.pathname == item.path ? classes.activeIcon : null}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <div className='layout-footer'>
          <Typography variant='body1'>© 2021 HitMyTeam</Typography>
        </div>
      </div>
    </Drawer>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className='nav-text'>
            <img src={logoSymbole} alt='hitmyteam' className='logo-typo' />
            <Avatar className={classes.avatar}></Avatar>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        <Hidden mdUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
