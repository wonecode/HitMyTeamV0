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
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import imageCover from '../images/page-assets/esport-3.jpg';
import '../styles/register.scss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import PasswordStrengthBar from 'react-password-strength-bar';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';

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

export default function Register() {
  const [username, setUsername] = React.useState('');
  const [usernameError, setUsernameError] = React.useState(false);
  const [usernameErrorText, setUsernameErrorText] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorText, setEmailErrorText] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorText, setPasswordErrorText] = React.useState('');
  const [credentialsErrorText, setCredentialsErrorText] = React.useState('');
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const cookies = new Cookies();
  const history = useHistory();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const frenchScoreWords = ['Faible', 'Faible', 'Correct', 'Bon', 'Excellent'];
  const barColors = ['#c0c0c0', '#f44336', '#f1c40f', '#3498db', '#43a047'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setEmailErrorText('');
    setPasswordError(false);
    setPasswordErrorText('');
    setUsernameError(false);
    setUsernameErrorText('');
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

    if (username == '') {
      setUsernameError(true);
      setUsernameErrorText('Ce champ ne doit pas être vide');
      setLoading(false);
    }

    if (email && password && username) {
      const registerResponse = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          accept: 'application/ld+json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          createdAt: new Date(),
        }),
        credentials: 'include',
      });

      if (registerResponse.status === 201) {
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

          enqueueSnackbar(`Inscription réussie !`, {
            variant: 'success',
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
          });

          history.push('/profil');

          setLoading(false);
        } else if (loginResponse.status === 500) {
          setCredentialsErrorText(
            'Une erreur avec le serveur est survenue, réessayez dans quelques instants'
          );
          setEmailError(true);
          setPasswordError(true);
          setLoading(false);
        }

        setLoading(false);
      }

      const registerData = await registerResponse.json();
      const registerErrorCode = registerData.violations[0].message;

      if (
        registerResponse.status === 422 &&
        registerErrorCode === "Cette valeur n'est pas une adresse email valide."
      ) {
        setEmailErrorText("L'email que vous avez renseigné est invalide");
        setEmailError(true);
        setLoading(false);
      } else if (
        registerResponse.status === 422 &&
        registerErrorCode ===
          'Cette chaîne est trop courte. Elle doit avoir au minimum 12 caractères.'
      ) {
        setPasswordErrorText('Le mot de passe doit faire au moins 12 caractères');
        setPasswordError(true);
        setLoading(false);
      } else if (
        registerResponse.status === 422 &&
        registerErrorCode === 'Cette valeur est déjà utilisée.'
      ) {
        setUsernameErrorText("Ce nom d'utilisateur est déjà utilisé");
        setUsernameError(true);
        setLoading(false);
      } else if (
        registerResponse.status === 422 &&
        registerErrorCode ===
          'Le mot de passe doit contenir au minimum un chiffre, une majuscule, une minuscule et un caractère spécial.'
      ) {
        setPasswordErrorText(
          'Le mot de passe doit contenir au minimum un chiffre, une majuscule, une minuscule et un caractère spécial'
        );
        setPasswordError(true);
        setLoading(false);
      } else if (registerResponse.status === 500) {
        setCredentialsErrorText(
          'Une erreur avec le serveur est survenue, réessayez dans quelques instants'
        );
        setEmailError(true);
        setPasswordError(true);
        setUsernameError(true);
        setLoading(false);
      }
    }
  };

  return (
    <main className='register'>
      <Helmet>
        <title>Inscription | HitMyTeam</title>
      </Helmet>
      <Grid container>
        {!cookies.get('HitMyTeam') ? (
          <Grid item className='right-register' xs={12} sm={7} lg={6}>
            <Typography variant='h3' component='h1' color='primary'>
              S'inscrire à HitMyTeam
            </Typography>
            <Typography variant='h5' component='h2'>
              Veuillez vous inscrire afin d’accéder à la plateforme
            </Typography>
            <div className='buttons'>
              <Button
                variant='contained'
                color='default'
                size='large'
                startIcon={<FontAwesomeIcon icon={['fab', 'google']} />}
                className='twitter-button'
              >
                S'inscrire avec Google
              </Button>
              <Button
                variant='contained'
                color='default'
                size='large'
                startIcon={<FontAwesomeIcon icon={['fab', 'discord']} />}
              >
                S'inscrire avec Discord
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
              <div className='form-group'>
                <TextField
                  onChange={(e) => setUsername(e.target.value)}
                  id='username'
                  label='Nom d’utilisateur'
                  variant='outlined'
                  className='username'
                  error={usernameError}
                  required
                />
                <Typography variant='body2' component='p' color='error'>
                  {usernameErrorText}
                </Typography>
              </div>
              <div className='form-group'>
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  id='email'
                  label='Email'
                  type='email'
                  variant='outlined'
                  error={emailError}
                  required
                />
                <Typography variant='body2' component='p' color='error'>
                  {emailErrorText}
                </Typography>
              </div>
              <div className='form-group'>
                <TextField
                  onChange={(e) => setPassword(e.target.value)}
                  id='password'
                  label='Mot de passe'
                  variant='outlined'
                  type='password'
                  className='password'
                  error={passwordError}
                  required
                />
                <Typography className='password-error' variant='body2' component='p' color='error'>
                  {passwordErrorText}
                </Typography>
                <PasswordStrengthBar
                  scoreWords={frenchScoreWords}
                  barColors={barColors}
                  minLength={6}
                  shortScoreWord='Trop court'
                  password={password}
                />
              </div>
              <Button
                className={buttonClassname}
                disabled={loading}
                onClick={handleSubmit}
                variant='contained'
                color='primary'
              >
                S'inscrire
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
              </Button>
            </form>
            <Link className='already-registered' to='/connexion'>
              Déjà un compte ? Connectez-vous
            </Link>
          </Grid>
        ) : (
          <Grid item className='right-register' xs={12} sm={7} lg={6}>
            <Typography variant='h3' component='h1' color='primary'>
              Bonjour
            </Typography>
            <Typography variant='h5' component='h2'>
              Vous êtes déjà inscrit à HitMyTeam
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
        <Grid item className='left-register' xs={12} sm={5} lg={6}>
          <img src={imageCover} alt='img-esport' />
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
