import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase'
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Grid, Avatar, Box
} from '@material-ui/core';

import { AuthContext } from '../components/Auth/Auth';
// import { Avatar, CardHeader, Box, Menu, MenuItem , ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@material-ui/core'
import AmplitudeEvent from '../components/AmplitudeEvent'
// import UserCard from "../components/Profile/userCard";
import firebase2 from '../components/firebase'
import ProfileCards from '../components/Profile/ProfileCard'
import Spinner from '../components/Spinner/Spinner';


const db = firebase2.firestore();
const storage = firebase2.storage();

const Profile = (props) => {
    const path = { props }
    const profileToView = (path.props.location.pathname)

    const [files, setFiles] = useState();
    const [profile, setProfile] = useState();
    const [posts, setPosts] = useState([]);
    const [userDetails, setUserDetails] = useState('')
    const [userprofile, setuserprofile] = useState('')
    const [loading, setLoading] = useState(true);

    AmplitudeEvent("/viewprofile-loaded");
    const currentUserId = profileToView.slice(9);
    console.log("currentUser, ", currentUserId)

    // useEffect(() => {
    //     console.log("listening in snapshot")
    //     db.collection('profiles').where("googleuid", "==", currentUserId).get()
    //         .then(snapshot => setUserDetails(snapshot.data()))

    // }, [])

    useEffect(() => {
        console.log("listening in snapshot")
        db.collection('profiles').where("googleuid", "==", currentUserId).onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })
    }, [])
    console.log("posts", posts)


    useEffect(() => {

        const fetchImages = async () => {
            let result = await storage.ref().child(`/profile-images/${currentUserId}`).listAll();
            console.log("result :: storage", result)
            let urlPromises = result.items.map(imageRef => imageRef.getDownloadURL());
            return Promise.all(urlPromises);
        }

        const loadImages = async () => {
            const urls = await fetchImages();
            setFiles(urls);
            console.log("files :: storage", urls)
            setLoading(false);
        }
        loadImages();
    }, []);

    if (loading) display = <Spinner />;


    let display = (
        <>
            <Grid container spacing={2} >
                {
                    files?.map(file => (
                        <Grid item md={4} >
                            < ProfileCards cardData={file} />
                        </Grid>

                    ))
                }
            </Grid>
        </>

    );

    return (
        <div>
            {/* <img src={files?.[0]} height="200vh" margin-left="auto" ></img> */}
            {/* <Avatar sx={{ height: '4000px', width: '4000px' }} src={files?.[0]}> </Avatar> */}
            <div className="mycard">
                {
                    posts.map((obj) => (
                        <div className="card auth-card input-field">
                            <p>
                                <img src={obj.data.photoURL}></img>
                                <h5>{obj.data.name}</h5>
                                <h5>{obj.data.role}</h5>
                                <p>{obj.data.email}</p>
                            </p>
                        </div>

                    ))
                }
            </div>

            <div className="mycard">
                {display}
            </div>

        </div>
    );
};

export default Profile;