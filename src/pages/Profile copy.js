import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../components/Auth/Auth';
// import { Avatar, CardHeader, Box, Menu, MenuItem , ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@material-ui/core'
import AmplitudeEvent from '../components/AmplitudeEvent'
// import UserCard from "../components/Profile/userCard";



const Profile = () => {
    AmplitudeEvent("profile-copy-loaded");

    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)



    let display = (
        <>
        <div className="card auth-card input-field">
            <img src={currentUser.photoURL}></img>

            <h4>{currentUser.displayName}</h4>
            <h5>{currentUser.email}</h5>
            <h5>Editing coming soon..</h5>

        </div>

                <div className="card auth-card input-field">
            <img src="https://cdn.mwallpapers.com/photos/celebrities/mahesh-babu/mahesh-babuhd-wallpapers-desktop-background-android-iphone-1080p-4k-rdkxq.jpg" height="455vh"></img>

        </div>
        </>
        
    );

    return (
        <div>

            <div className="mycard">
                {display}

            </div>

        </div>
    );
};

export default Profile;