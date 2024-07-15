import React, { useState } from 'react';
import './Post.css'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';



import {
  Avatar,
  Card,
  CardHeader,


  CardMedia,
  CardContent,
  // CardActions,
  // Collapse,
  // IconButton,
  Typography,
  // red,
  Grid,
  Box, Divider
}
  from '@material-ui/core';



// import { ThumbUp, ChatBubbleOutline, AccountCircle, NearMe, ExpandMoreOutlined } from '@material-ui/icons';

const Post = ({ profilePic, image, username, timestamp, message, location , profileLink}) => {
  if (image === "") {
    image = "https://reelabilities.org/wp-content/uploads/2021/07/Casting-Call-Bob-Carter.jpg"
  }
  if (location === "") {
    location = "NA"
  }

  // const [isBrowser, setisBrowser] = useState(true);
  // const [isMobile, setisMobile] = useState(false);
  console.log("device, isBrowser ", isBrowser)
  console.log("device,isMobile ", isMobile)

  return (
    <>
      <Box sx={{ m: 1 }}>
        <Card >
          { isMobile ? (
            <CardMedia
              component="img"
              alt={message}
              // height="320"
              width="320"
              image={image}
            />
          ):
          (
            <CardMedia
              component="img"
              alt={message}
              height="320"
              // width="320"
              image={image}
            />
          )}
          {/* <CardMedia
            component="img"
            alt={message}
            // height="320"
            width="320"
            image={image}
          /> */}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {message}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By: {username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Location: {location}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <a href={profileLink}> Contact Info </a>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>

    // <Grid container  >

    //   <Grid item sm={0} md={3} ></Grid>


    //   <Grid item sm={12} md={6} >

    //     <Card className="post">
    //       <CardHeader
    //         avatar={
    //           <Avatar src={profilePic} className="postAvatar">
    //             {username.charAt(0)}
    //           </Avatar>
    //         }
    //         title={username}
    //         subheader={new Date(timestamp?.toDate()).toUTCString()}
    //       />
    //       <CardContent>
    //         <Typography variant="body" color="text.secondary">
    //           {message}
    //         </Typography>
    //       </CardContent>

    //       {image ? (
    //         <CardMedia
    //           component="img"
    //           // height="494"
    //           width="200"
    //           image={image}
    //         />
    //       ) : (<div> </div>)}

    //       {/* <CardMedia
    //     component="img"
    //     height="494"
    //     image={image}
    //   />   */}


    //     </Card>
    //   </Grid>
    //   <Grid item sm={0} md={3}  ></Grid>
    //   <Divider />


    // </Grid>

  )
}

export default Post;
