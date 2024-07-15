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


// import { Avatar, CardHeader, Box, Menu, MenuItem , ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@material-ui/core'
import FALLBACK_IMAGE from '../../src/assets/fallbackimage.png';
import AmplitudeClick from './AmplitudeClick'
// import AmplitudeEvent from './AmplitudeEvent'



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
  console.log("profile cardData", cardData)
  const handleFilter = (name) => {
    AmplitudeClick("viewedProfile-" +  name,  "user")
};

  // const onMediaFallback = event => event.target.src = FALLBACK_IMAGE;


  return (
    // <React.Fragment>
    <>

      <a href={cardData.publicprofile} target="_blank" onClick={(e) => handleFilter(cardData.name)}>
        <Box >
          <Card >
            {/* <CardMedia
              component="img"
              alt="green iguana"
              height="320"
              src={cardData.photoURL}
            // onError={onMediaFallback}
            /> */}

            {cardData.photoURL ? (
              <CardMedia
              component="img"
              alt="green iguana"
              height="320"
              src={cardData.photoURL}
              />
            ) :
              (
                <CardMedia
                component="img"
                alt="green iguana"
                height="320"
                src={FALLBACK_IMAGE}
                />
              )}

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cardData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cardData.role}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium"> <a href={cardData.publicprofile} target="_blank" onClick={(e) => handleFilter(cardData.name)}>View Full Profile</a></Button>
            </CardActions>
          </Card>
        </Box>
      </a>
    </>
    // </React.Fragment>
  );
}
