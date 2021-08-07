import { Button, Grid, Paper } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/profile.scss';
import Rank from '../images/lol-emblems/Emblem_Challenger.png';
import Bottom from '../images/lol-positions/Bottom.png';
import Jungle from '../images/lol-positions/Jungle.png';

export default function Profile() {
  return (
    <main className='profile'>
      <Helmet>
        <title>Profil | HitMyTeam</title>
      </Helmet>
      <div className='header'>
        <div className='header-content'>
          <Avatar
            src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            className='avatar'
          />
          <div>
            <Typography variant='h4' component='h1' gutterBottom>
              Username
            </Typography>
            <Chip size='small' label='Looking for team' color='primary' />
          </div>
        </div>
      </div>
      <Grid container className='content' spacing={3}>
        <Grid item elevation={3} lg={3} md={6} xs={12}>
          <Paper className='player-rank'>
            <img src={Rank} alt='player-rank' />
            <div>
              <Typography variant='h6' className='player-ranktier' component='h2'>
                Challenger I
              </Typography>
              <Typography variant='body1' className='player-leaguepoints' component='p'>
                24LP
              </Typography>
              <Typography variant='body2' className='player-winrate' component='p'>
                (34V 22D) 54%
              </Typography>
              <Button className='player-opgg' color='secondary' variant='contained'>
                OPGG
              </Button>
            </div>
          </Paper>
          <Paper className='player-role'>
            <Tooltip title='AD Carry' aria-label='role-bottom' placement='top' arrow>
              <img src={Bottom} alt='player-rank' />
            </Tooltip>
            <Tooltip title='Jungle' aria-label='role-jungle' placement='top' arrow>
              <img src={Jungle} alt='player-rank' />
            </Tooltip>
          </Paper>
          <Paper className='player-champions'>
            <Tooltip title='Kalista' aria-label='champion-kalista' placement='top' arrow>
              <img
                src='http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/Kalista.png'
                alt='player-rank'
              />
            </Tooltip>
            <Tooltip title='Tristana' aria-label='champion-tristana' placement='top' arrow>
              <img
                src='http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/Tristana.png'
                alt='player-rank'
              />
            </Tooltip>
            <Tooltip title='Caitlyn' aria-label='champion-Caitlyn' placement='top' arrow>
              <img
                src='http://ddragon.leagueoflegends.com/cdn/11.15.1/img/champion/Caitlyn.png'
                alt='player-rank'
              />
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>
    </main>
  );
}
