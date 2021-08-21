import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import '../styles/login.scss';
import { Helmet } from 'react-helmet';
import imageCover from '../images/page-assets/esport-1.jpg';
import { Link } from 'react-router-dom';

library.add(faDiscord);

export default function Login() {
  return (
    <main className='login'>
      <Helmet>
        <title>Connexion | HitMyTeam</title>
      </Helmet>
      <Grid container>
        <Grid item className='left-login' xs={12} sm={5} lg={6}>
          <img src={imageCover} alt='img-esport' />
        </Grid>
        <Grid item className='right-login' xs={12} sm={7} lg={6}>
          <Typography variant='h3' component='h1' color='primary'>
            Se connecter à HitMyTeam
          </Typography>
          <Typography variant='h5' component='h2'>
            Veuillez vous connecter afin d’accéder à la plateforme
          </Typography>
          <div className='buttons'>
            <Button
              variant='contained'
              color='default'
              size='large'
              startIcon={<TwitterIcon />}
              className='twitter-button'
            >
              Se connecter avec Twitter
            </Button>
            <Button
              variant='contained'
              color='default'
              size='large'
              startIcon={<FontAwesomeIcon icon={['fab', 'discord']} />}
            >
              Se connecter avec Discord
            </Button>
          </div>
          <div className='middle-log'>
            <div className='bar'></div>
            <Typography variant='h6' component='h3' align='center' className='or'>
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
            <TextField id='password' label='Mot de passe' variant='outlined' type='password' />
            <div className='form-footer'>
              <FormControlLabel
                control={<Checkbox name='stay-logged' color='primary' />}
                label='Rester connecté'
              />
              <Link className='pass-forgot'>Mot de passe oublié ?</Link>
            </div>
            <Button variant='contained' color='primary'>
              Se connecter
            </Button>
          </form>
          <Link className='not-registered' to='/inscription'>
            Pas encore de compte ? Inscrivez-vous
          </Link>
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
