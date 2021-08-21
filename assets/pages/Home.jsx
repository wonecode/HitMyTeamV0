import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import '../styles/home.scss';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import imageCover from '../images/page-assets/HMT-Assets-v1.png';
import logoTypo from '../images/logo/logo-typo-white.png';

export default function Home() {
  return (
    <main className='home'>
      <Helmet>
        <title>Accueil | HitMyTeam</title>
      </Helmet>
      <Grid container>
        <Grid item className='left-home' xs={12} sm={5} lg={6}>
          <img src={imageCover} alt='img-esport' />
        </Grid>
        <Grid item className='right-home' xs={12} sm={7} lg={6}>
          <img src={logoTypo} alt='hitmyteam' className='logo-title' />
          <Typography variant='h2' component='h2' color='primary' gutterBottom>
            Prenez part à l’histoire dès maintenant
          </Typography>
          <Typography variant='h4' component='h3'>
            Rejoignez HitMyTeam dès aujourd’hui.
          </Typography>
          <div className='buttons'>
            <Button
              size='large'
              variant='contained'
              color='primary'
              className='register-button'
              component={Link}
              to='/inscription'
            >
              S'inscrire
            </Button>
            <Button
              size='large'
              variant='outlined'
              color='primary'
              component={Link}
              to='/connexion'
            >
              Se connecter
            </Button>
          </div>
        </Grid>
      </Grid>
      <footer>
        <Typography className='title-footer' component='p'>
          © 2021 HitMyTeam
        </Typography>
        <IconButton color='primary' href='https://twitter.com/HitMyTeamGG'>
          <TwitterIcon />
        </IconButton>
      </footer>
    </main>
  );
}
