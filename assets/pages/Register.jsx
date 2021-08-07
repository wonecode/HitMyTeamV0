import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import imageCover from '../images/page-assets/esport-3.jpg';
import '../styles/register.scss';

library.add(faDiscord);

export default function Register() {
  return (
    <main className='register'>
      <Helmet>
        <title>Inscription | HitMyTeam</title>
      </Helmet>
      <Grid container>
        <Grid
          item
          className='right-register'
          xs={12}
          sm={7}
          lg={6}
        >
          <Typography
            variant='h3'
            component='h1'
            color='primary'
          >
            S'inscrire à HitMyTeam
          </Typography>
          <Typography variant='h5' component='h2'>
            Veuillez vous inscrire afin d’accéder à la
            plateforme
          </Typography>
          <div className='buttons'>
            <Button
              variant='contained'
              color='default'
              size='large'
              startIcon={<TwitterIcon />}
              className='twitter-button'
            >
              S'inscrire avec Twitter
            </Button>
            <Button
              variant='contained'
              color='default'
              size='large'
              startIcon={
                <FontAwesomeIcon
                  icon={['fab', 'discord']}
                />
              }
            >
              S'inscrire avec Discord
            </Button>
          </div>
          <div className='middle-log'>
            <div className='bar'></div>
            <Typography
              variant='h6'
              component='h3'
              align='center'
              className='or'
            >
              Ou
            </Typography>
            <div className='bar'></div>
          </div>
          <form noValidate autoComplete='off'>
            <TextField
              id='username'
              label='Nom d’utilisateur'
              variant='outlined'
              className='username'
            />
            <TextField
              id='email'
              label='Email'
              type='email'
              variant='outlined'
            />
            <TextField
              id='password'
              label='Mot de passe'
              variant='outlined'
              type='password'
              className='password'
            />
            <Button variant='contained' color='primary'>
              S'inscrire
            </Button>
          </form>
          <Link
            className='already-registered'
            to='/connexion'
          >
            Déjà un compte ? Connectez-vous
          </Link>
        </Grid>
        <Grid
          item
          className='left-register'
          xs={12}
          sm={5}
          lg={6}
        >
          <img src={imageCover} alt='img-esport' />
        </Grid>
      </Grid>
      <footer>
        <Typography className='title-footer' component='p'>
          © 2021 HitMyTeam
        </Typography>
        <IconButton
          color='primary'
          href='https://twitter.com/HitMyTeamGG'
        >
          <TwitterIcon />
        </IconButton>
      </footer>
    </main>
  );
}
