import React, { useState, useEffect } from 'react';
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Grid,
    Box
} from '@material-ui/core';

import './Feed.css';
import AmplitudeEvent from '../../components/AmplitudeEvent'

// components
import MessageSender from './MessageSender/MessageSender';
import Castingform from './MessageSender/Castingform';
import Post from './Post/Post';

// database
import firebase from '../firebase'
const db = firebase.firestore();



const Feed = () => {
    AmplitudeEvent("opportunities-loaded");

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        console.log("listening in snapshot")
        db.collection('opportunities').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })
        console.log(posts)

    }, [])

    return (
        <div className="feed">
            <MessageSender />
            <hr/>
            <h3> Available opportunities</h3>
            <Box sx={{ ml: 6, mr:6 }}>

            <Grid
                container
                spacing={2}
            >
                {
                    posts.map(post => (
                        <Grid item md={3} sm={12}>
                            <Post
                                key={post.id}
                                profilePic={post.data.profilePic}
                                message={post.data.message}
                                timestamp={post.data.timestamp}
                                username={post.data.username}
                                image={post.data.image}
                                location={post.data.location}
                                profileLink={post.data.profileLink}
                                className="feed-post"
                            />
                        </Grid>

                    ))
                }

            </Grid>
            </Box>


        </div>
    )
}

export default Feed;
