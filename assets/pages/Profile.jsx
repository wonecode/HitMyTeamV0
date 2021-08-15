import { Button, Grid, IconButton, Paper } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import '../styles/profile.scss';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const { v4: uuidv4 } = require('uuid');
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { Skeleton } from '@material-ui/lab';
import RefreshIcon from '@material-ui/icons/Refresh';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SnackbarProvider, useSnackbar } from 'notistack';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const riotHeader = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
  'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
  'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
  Origin: 'https://developer.riotgames.com',
  'X-Riot-Token': 'RGAPI-60d14418-379a-458c-890f-d7319122aa93',
};

function getSteps() {
  return [
    "Renseignez votre nom d'invocateur",
    'Vérifiez votre compte',
    'Commencez à utiliser HitMyTeam !',
  ];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return "Veuillez saisir votre nom d'invocateur afin de remplir votre profil.";
    case 1:
      return 'Entrez ce code dans l\'onglet "Vérification" de votre client League of Legends. (Paramètres du client -> Vérification -> Sauvegarder) Une fois l\'opération terminée, cliquez sur "vérifier".';
    case 2:
      return '🎉 Bienvenue sur HitMyTeam ! 🎉';
    default:
      return 'Unknown stepIndex';
  }
}

const arrToInstanceCountObj = (arr) =>
  arr.reduce((obj, e) => {
    obj[e] = (obj[e] || 0) + 1;
    return obj;
  }, {});

function getSortedKeys(obj) {
  var keys = (keys = Object.keys(obj));
  return keys.sort(function (a, b) {
    return obj[b] - obj[a];
  });
}

function firstCaps(word) {
  word = word.toLowerCase();
  word = word[0].toUpperCase() + word.substring(1);

  return word;
}

export default function Profile() {
  const [openSettings, setOpenSettings] = React.useState(true);
  const [summonerName, setSummonerName] = React.useState('');
  const [summonerNameError, setSummonerNameError] = React.useState(false);
  const [summonerNameErrorText, setSummonerNameErrorText] = React.useState('');
  const [hideFormSummoner, setHideFormSummoner] = React.useState('form-visible');
  const [hideCodeVerification, setHideCodeVerification] = React.useState('code-invisible');
  const [uuid, setUuid] = React.useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const [isVerified, setIsVerified] = React.useState(false);
  const [verifySummonerError, setVerifySummonerError] = React.useState(true);
  const [verifySummonerErrorText, setVerifySummonerErrorText] = React.useState('');
  const [summonerData, setSummonerData] = React.useState([]);
  const [profileIcon, setProfileIcon] = React.useState('');
  const [leagueData, setLeagueData] = React.useState([]);
  const [leagueRankIcon, setLeagueRankIcon] = React.useState('');
  const [playerOpgg, setPlayerOpgg] = React.useState('');
  const [playerWinrate, setPlayerWinrate] = React.useState('');
  const [playerMainChamp, setPlayerMainChamp] = React.useState('');
  const [playerSecondChamp, setPlayerSecondChamp] = React.useState('');
  const [playerThirdChamp, setPlayerThirdChamp] = React.useState('');
  const [playerTier, setPlayerTier] = React.useState('');
  const [playerRank, setPlayerRank] = React.useState('');
  const [playerMainRole, setPlayerMainRole] = React.useState('');
  const [playerMainRoleImg, setPlayerMainRoleImg] = React.useState('');
  const [playerLeaguepoints, setPlayerLeaguepoints] = React.useState('');
  const [playerHotstreak, setPlayerHotstreak] = React.useState('');
  const [playerWins, setPlayerWins] = React.useState('');
  const [playerLosses, setPlayerLosses] = React.useState('');
  const [copyCode, setCopyCode] = React.useState(false);
  const steps = getSteps();
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpenSettings(true);
  };

  const handleClose = () => {
    setOpenSettings(false);
  };

  const formSummoneVisible = () => {
    setHideFormSummoner('form-visible');
  };

  const formSummonerInvisible = () => {
    setHideFormSummoner('form-invisible');
  };

  const codeVerificationVisible = () => {
    setHideCodeVerification('code-visible');
  };

  const codeVerificationInvisible = () => {
    setHideCodeVerification('code-invisible');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSummonerNameError(false);
    setSummonerNameErrorText('');
    setVerifySummonerErrorText('');

    if (summonerName == '') {
      setSummonerNameError(true);
      setSummonerNameErrorText('Ce champ de doit pas être vide');
    }

    if (summonerName) {
      const summonerResponse = await fetch(
        encodeURI(
          'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName
        ),
        {
          headers: riotHeader,
        }
      );

      if (summonerResponse.status === 200) {
        setSummonerData(await summonerResponse.json());
        formSummonerInvisible();
        setUuid(uuidv4() + summonerName[0]);
        handleNext();
        codeVerificationVisible();
      } else if (summonerResponse.status === 404) {
        setSummonerNameError(true);
        setSummonerNameErrorText('Cet invocateur est introuvable');
      } else {
        setSummonerNameErrorText(
          "Une erreur avec le serveur est survenue, réessayer plus tard ou contactez un membre de l'équipe de HitMyTeam"
        );
      }
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => {
    handleClose();
    setActiveStep(0);
    formSummoneVisible();
    codeVerificationInvisible();
    setVerifySummonerErrorText('');
    setSummonerNameErrorText('');
    setSummonerNameError(false);
  };

  const codePaste = () => {
    setCopyCode(true);
  };

  const verifySummoner = async () => {
    const summonerKeyResponse = await fetch(
      'https://euw1.api.riotgames.com/lol/platform/v4/third-party-code/by-summoner/' +
        summonerData.id,
      {
        headers: riotHeader,
      }
    );

    if (summonerKeyResponse.status === 200) {
      const summonerKey = await summonerKeyResponse.json();

      if (summonerKey === uuid) {
        setIsVerified(true);
        handleNext();
        codeVerificationInvisible();
        setProfileIcon(
          'http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/' +
            summonerData.profileIconId +
            '.png'
        );
        setVerifySummonerError(false);
        setVerifySummonerErrorText('');
        setCopyCode(false);

        const leagueResponse = await fetch(
          'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerData.id,
          {
            headers: riotHeader,
          }
        );
        const leagueData = await leagueResponse.json();

        let playerStats;
        for (let i = 0; i < leagueData.length; i++) {
          if (leagueData[i].queueType === 'RANKED_SOLO_5x5') {
            playerStats = leagueData[i];
          }
        }

        setLeagueData(playerStats);
        setLeagueRankIcon(require('../images/lol-emblems/Emblem_' + playerStats.tier + '.png'));
        setPlayerOpgg('https://euw.op.gg/summoner/userName=' + summonerName);
        setPlayerWinrate(
          Math.round((playerStats.wins / (playerStats.wins + playerStats.losses)) * 100) + '%'
        );

        const version = '11.16.1';

        const dragonResponse = await fetch(
          'http://ddragon.leagueoflegends.com/cdn/' + version + '/data/fr_FR/champion.json'
        );
        const dragonData = await dragonResponse.json();
        let championList = dragonData.data;

        function getChampName(id) {
          for (var i in championList) {
            if (championList[i].key == id) {
              return championList[i].id;
            }
          }
        }

        // Get season history

        const accountId = summonerData.accountId;

        const matchesReponse = await fetch(
          'https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/' +
            accountId +
            '?queue=420',
          {
            headers: riotHeader,
          }
        );

        const matchesData = await matchesReponse.json();
        const matchesList = matchesData.matches;

        let champions = [];
        for (let i = 0; i < matchesList.length; i++) {
          champions.push(matchesList[i].champion);
        }

        const championsOcc = arrToInstanceCountObj(champions);
        setPlayerMainChamp(getChampName(getSortedKeys(championsOcc)[0]));
        setPlayerSecondChamp(getChampName(getSortedKeys(championsOcc)[1]));
        setPlayerThirdChamp(getChampName(getSortedKeys(championsOcc)[2]));

        setPlayerTier(firstCaps(playerStats.tier));
        setPlayerRank(playerStats.rank.length);
        setPlayerLeaguepoints(playerStats.leaguePoints);
        setPlayerHotstreak(playerStats.hotStreak);
        setPlayerWins(playerStats.wins);
        setPlayerLosses(playerStats.losses);
        setSummonerName(playerStats.summonerName);

        let lane = [];
        for (let i = 0; i < matchesList.length; i++) {
          if (matchesList[i].lane === 'BOTTOM') {
            lane.push(matchesList[i].role);
          } else {
            lane.push(matchesList[i].lane);
          }
        }

        const laneOcc = arrToInstanceCountObj(lane);

        function getSortedKeys(obj) {
          var keys = (keys = Object.keys(obj));
          return keys.sort(function (a, b) {
            return obj[b] - obj[a];
          });
        }

        let playerMainRole = getSortedKeys(laneOcc)[0];

        if (playerMainRole === 'NONE') {
          setPlayerMainRole(getSortedKeys(laneOcc)[1]);
        }

        if (playerMainRole === 'DUO_CARRY') {
          setPlayerMainRole('AD Carry');
        } else if (playerMainRole === 'DUO_SUPPORT') {
          setPlayerMainRole('Support');
        } else {
          setPlayerMainRole(firstCaps(playerMainRole));
        }

        // Img Roles

        if (playerMainRole === 'DUO_CARRY') {
          setPlayerMainRoleImg(require('../images/lol-positions/Bottom.svg'));
        } else if (playerMainRole === 'DUO_SUPPORT') {
          setPlayerMainRoleImg(require('../images/lol-positions/Support.svg'));
        } else {
          setPlayerMainRoleImg(require(`../images/lol-positions/${firstCaps(playerMainRole)}.svg`));
        }

        enqueueSnackbar('Votre profil a bien été chargé !', {
          variant: 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      } else {
        setIsVerified(false);
        setVerifySummonerErrorText('La vérification est incorrecte');
      }
    } else {
      setIsVerified(false);
      setVerifySummonerErrorText('La vérification est incorrecte');
    }
  };

  const getLeagueData = async () => {
    if (isVerified === true) {
      const leagueResponse = await fetch(
        'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerData.id,
        {
          headers: riotHeader,
        }
      );
      const leagueData = await leagueResponse.json();

      setLeagueData(leagueData[0]);

      enqueueSnackbar('Votre profil a bien été actualisé !', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  return (
    <main className='profile'>
      <Helmet>
        <title>{summonerName !== '' ? summonerName : 'Profil'} | HitMyTeam</title>
      </Helmet>
      <div className='header'>
        <div className='header-content'>
          {profileIcon !== '' ? (
            <Avatar src={profileIcon} className='avatar' />
          ) : (
            <Skeleton variant='circle' width={100} height={100} />
          )}
          <div>
            <Typography variant='h4' component='h1' gutterBottom>
              {isVerified === true ? summonerData.name : <Skeleton />}
            </Typography>
            <Chip size='small' label='Looking for team' color='primary' />
          </div>
        </div>
        {isVerified === false ? (
          <Button color='primary' variant='contained' onClick={handleClickOpen}>
            Initialiser le profil
          </Button>
        ) : (
          <Tooltip title='Rafraîchir le profil' aria-label='refresh-profile' placement='top' arrow>
            <Button variant='contained' color='primary' onClick={getLeagueData}>
              <RefreshIcon />
            </Button>
          </Tooltip>
        )}
      </div>
      <Grid container className='content' spacing={3}>
        <Grid item elevation={3} lg={3} md={6} xs={12}>
          <Paper className='player-rank'>
            {leagueRankIcon !== '' ? (
              <img src={leagueRankIcon} alt='player-rank-icon' />
            ) : (
              <Skeleton variant='circle' width={150} height={150} />
            )}
            <div>
              {playerTier !== '' ? (
                <Typography color='primary' variant='h6' className='player-ranktier' component='h2'>
                  {`${playerTier} ${playerRank}`}
                </Typography>
              ) : (
                <Skeleton width={150} height={40} />
              )}
              {playerLeaguepoints !== '' && playerHotstreak !== '' ? (
                <Typography variant='body1' className='player-leaguepoints' component='p'>
                  {`${playerLeaguepoints} LP `}
                  <Tooltip title='Série de victoires' aria-label='hotStreak' placement='top' arrow>
                    <span>{playerHotstreak === true ? '🔥' : '❄️'}</span>
                  </Tooltip>
                </Typography>
              ) : (
                <Skeleton width={150} height={30} />
              )}
              <Typography variant='body2' className='player-winrate' component='p'>
                {playerWinrate !== '' && playerWins !== '' && playerLosses !== '' ? (
                  [playerWins, 'V', '/', playerLosses, 'D', ' (', playerWinrate, ')']
                ) : (
                  <Skeleton width={150} height={20} />
                )}
              </Typography>
              {isVerified === true ? (
                <Button
                  href={playerOpgg}
                  target='_blank'
                  size='small'
                  className='player-opgg'
                  color='secondary'
                  variant='contained'
                >
                  OPGG
                </Button>
              ) : (
                <Skeleton variant='rect' width={60} height={30} />
              )}
            </div>
          </Paper>
          <div className='player-spec'>
            <Paper className='player-role'>
              <div className='main-role-content'>
                {playerMainRole !== '' ? (
                  <img src={playerMainRoleImg} alt='player-rank' />
                ) : (
                  <Skeleton variant='circle' width={35} height={35} />
                )}
                {playerMainRole !== '' ? (
                  <Typography variant='h6'>{playerMainRole}</Typography>
                ) : (
                  <Skeleton width={100} />
                )}
              </div>
            </Paper>
            <Paper className='player-champions'>
              {playerMainChamp !== '' ? (
                <Tooltip title={playerMainChamp} aria-label='champion-1' placement='top' arrow>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${playerMainChamp}.png`}
                    alt='player-rank'
                  />
                </Tooltip>
              ) : (
                <Skeleton variant='circle' width={35} height={35} />
              )}
              {playerSecondChamp !== '' ? (
                <Tooltip title={playerSecondChamp} aria-label='champion-2' placement='top' arrow>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${playerSecondChamp}.png`}
                    alt='player-rank'
                  />
                </Tooltip>
              ) : (
                <Skeleton variant='circle' width={35} height={35} />
              )}
              {playerThirdChamp !== '' ? (
                <Tooltip title={playerThirdChamp} aria-label='champion-3' placement='top' arrow>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/${playerThirdChamp}.png`}
                    alt='player-rank'
                  />
                </Tooltip>
              ) : (
                <Skeleton variant='circle' width={35} height={35} />
              )}
            </Paper>
          </div>
        </Grid>
      </Grid>

      <Dialog open={openSettings} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>
          Liez votre compte HitMyTeam avec Riot Games
        </DialogTitle>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <DialogContent>
                <Typography>Votre profil League of Legends est complet !</Typography>
              </DialogContent>
            </div>
          ) : (
            <div>
              <DialogContent>
                <DialogContentText>{getStepContent(activeStep)}</DialogContentText>
              </DialogContent>
            </div>
          )}
        </div>
        <DialogContent className='main-content-dialog'>
          <form noValidate autoComplete='off' onSubmit={handleSubmit} id={hideFormSummoner}>
            <div className='init-summoner'>
              <TextField
                onChange={(e) => setSummonerName(e.target.value)}
                autoFocus
                label="Nom d'invocateur"
                type='text'
                fullWidth
                error={summonerNameError}
                required
              />
              <Button type='submit' color='primary' variant='contained' size='small'>
                <CheckCircleIcon />
              </Button>
            </div>
            <Typography variant='body2' component='p' color='error'>
              {summonerNameErrorText}
            </Typography>
          </form>
          <Typography variant='body2' component='p' color='primary'>
            {copyCode === true ? 'Code copié !' : ''}
          </Typography>
          <div className='uuid-code' id={hideCodeVerification}>
            <CopyToClipboard text={uuid}>
              <Typography onClick={codePaste} className='code' color='primary'>
                {uuid}
                <button className='copy' aria-label='copy-to-clipboard'>
                  <FileCopyIcon fontSize='small' />
                </button>
              </Typography>
            </CopyToClipboard>
            <Button size='small' variant='contained' onClick={verifySummoner}>
              Vérifier
            </Button>
          </div>
          <Typography variant='body2' component='p' color='error'>
            {verifySummonerErrorText}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} color='primary'>
            Annuler
          </Button>
          <Button onClick={handleClose} color='primary'>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
