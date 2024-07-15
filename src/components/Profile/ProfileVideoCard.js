import * as React from 'react';
// import Box from '@mui/material/Box';
// import Avatar from '@mui/material/Avatar';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Tooltip from '@mui/material/Tooltip';
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
// import M from 'materialize-css';
// import firebase from './firebase';
// import { Link, useHistory } from 'react-router-dom';

// import './ProfileCards.css'
// import { Avatar, CardHeader, Box, Menu, MenuItem , ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@material-ui/core'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid, Box
} from '@material-ui/core';
export default function AccountMenu(props) {

  const { cardData } = props;
  console.log("cardData : storage", cardData)

  return (
    // <React.Fragment>
    <>
      <Box sx={{ m: 2 }} >
        {/* <Card > */}
        {/* { isMobile ? (
            <CardMedia
              component="img"
              alt="My Profile Portfolio"
              // height="320"
              width="320"
              image={cardData}
            />
          ):
          (
            <CardMedia
              component="img"
              alt="My Profile Portfolio"
              height="320"
              // width="320"
              image={cardData}
            />
          )} */}
        {/* <iframe className='video'
          height="320"
          title='Youtube player'
          sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
          src={`https://www.youtube.com/watch?v=91tjifYXz5A?autoplay=0`}>
        </iframe> */}

        <CardMedia
          component='iframe'
          height="420"
          height="320"
          title='test'
          src={cardData}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            As an actor
            </Typography>
        </CardContent>
        {/* </Card> */}
      </Box>
    </>
    // </React.Fragment>
  );
}
