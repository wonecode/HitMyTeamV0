import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import '../styles/login.scss';
import { Helmet } from 'react-helmet';
import imageCover from '../images/page-assets/esport-1.jpg';
import { Link } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

library.add(faDiscord);
library.add(faGoogle);

const useStyles = makeStyles((theme) => ({
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorText, setEmailErrorText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('');
  const [credentialsErrorText, setCredentialsErrorText] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const cookies = new Cookies();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setEmailErrorText('');
    setPasswordError(false);
    setPasswordErrorText('');
    setCredentialsErrorText('');
    setSuccess(false);
    setLoading(true);

    if (email == '') {
      setEmailError(true);
      setEmailErrorText('Ce champ ne doit pas être vide');
      setLoading(false);
    }

    if (password == '') {
      setPasswordError(true);
      setPasswordErrorText('Ce champ ne doit pas être vide');
      setLoading(false);
    }

    if (email && password) {
      const loginResponse = await fetch('/security/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
        credentials: 'include',
      });

      if (loginResponse.status === 200) {
        const tokenData = await loginResponse.json();

        cookies.set('HitMyTeam', tokenData.token, { maxAge: 86400, secure: true });

        enqueueSnackbar(`Re bonjour ${email} !`, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });

        history.push('/profil');

        setLoading(false);
      } else if (loginResponse.status === 401) {
        setCredentialsErrorText("L'email ou le mot de passe est invalide");
        setEmailError(true);
        setPasswordError(true);
        setLoading(false);
      } else if (loginResponse.status === 500) {
        setCredentialsErrorText(
          'Une erreur avec le serveur est survenue, réessayez dans quelques instants'
        );
        setEmailError(true);
        setPasswordError(true);
        setLoading(false);
      }
    }
  };

  return (
    <main className='login'>
      <Helmet>
        <title>Connexion | HitMyTeam</title>
      </Helmet>
      <Grid container>
        <Grid item className='left-login' xs={12} sm={5} lg={6}>
          <img src={imageCover} alt='img-esport' />
        </Grid>
        {!cookies.get('HitMyTeam') ? (
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
                startIcon={<FontAwesomeIcon icon={['fab', 'google']} />}
                className='twitter-button'
              >
                Se connecter avec Google
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
              <Typography className='form-error' variant='body2' component='p' color='error'>
                {credentialsErrorText}
              </Typography>
              <div className='email'>
                <TextField
                  id='email'
                  label='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  variant='outlined'
                  error={emailError}
                  required
                />
                <Typography variant='body2' component='p' color='error'>
                  {emailErrorText}
                </Typography>
              </div>
              <div>
                <TextField
                  id='password'
                  label='Mot de passe'
                  onChange={(e) => setPassword(e.target.value)}
                  variant='outlined'
                  type='password'
                  error={passwordError}
                  required
                />
                <Typography variant='body2' component='p' color='error'>
                  {passwordErrorText}
                </Typography>
              </div>
              <div className='form-footer'>
                <Link className='pass-forgot'>Mot de passe oublié ?</Link>
              </div>
              <Button
                className={buttonClassname}
                disabled={loading}
                onClick={handleSubmit}
                variant='contained'
                color='primary'
              >
                Se connecter
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Button>
            </form>
            <Link className='not-registered' to='/inscription'>
              Pas encore de compte ? Inscrivez-vous
            </Link>
          </Grid>
        ) : (
          <Grid item className='right-login' xs={12} sm={7} lg={6}>
            <Typography variant='h3' component='h1' color='primary'>
              Bonjour
            </Typography>
            <Typography variant='h5' component='h2'>
              Vous êtes déjà connecté à HitMyTeam
            </Typography>
            <div className='buttons'>
              <Button
                variant='contained'
                color='primary'
                size='large'
                className='return-hmt'
                component={Link}
                to='/profil'
              >
                Retourner sur HitMyTeam
              </Button>
              <Button variant='contained' color='default' size='large' className='logout'>
                Se déconnecter de HitMyTeam
              </Button>
            </div>
          </Grid>
        )}
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
