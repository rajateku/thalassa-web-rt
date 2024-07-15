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

import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid
} from '@material-ui/core';
export default function AccountMenu(props) {
    
  const {cardData} = props;
  console.log(cardData)
  
  return (
    // <React.Fragment>
      <>
      <Card >
        <CardMedia
            component="img"
            alt="green iguana"
            height="180"
            image={cardData.image}
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {cardData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {cardData.description}
            </Typography>
        </CardContent>
        {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
        </CardActions> */}
    </Card>
    </>
    // </React.Fragment>
  );
}
