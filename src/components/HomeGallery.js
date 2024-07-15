import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Spinner from '../components/Spinner/Spinner';
import firebase from '../components/firebase';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
import './HomeGallery.css'

import { AuthContext } from '../components/Auth/Auth';
import section1Data from '../assets/section1.json'
import homeGalleryData from '../assets/HomeGalleryData.json'
import carouselData from '../assets/CarouselData.json'
import Select from 'react-select'

import HomeGalleryCards from '../components/HomeGalleryCards'

import Footer from '../components/Footer';
import AmplitudeEvent from '../components/AmplitudeEvent'
import AmplitudeClick from '../components/AmplitudeClick'

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


const db = firebase.firestore();

const diys = section1Data.slice(0, 3);


const HomeGallery = () => {

    const { currentUser } = useContext(AuthContext);
    // AmplitudeEvent("homegallery-loaded/" + currentUser.displayName);
    AmplitudeClick("homegallery-loaded" ,  currentUser.displayName);

    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [galleryItemsCurrent, setgalleryItemsCurrent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [amplitudeTrigger, setamplitudeTrigger] = useState("");
    // const { currentUser } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState('')


    // const find = (event) => {
    //     // event.preventDefault();
    //     setRole(event["value"]);

    // };
    const [profiles, setprofiles] = useState([]);

    const options = [
        { value: 'All', label: 'All' },
        { value: 'Actor', label: 'Actor' },
        { value: 'Actress', label: 'Actress' },
        { value: 'Costume Designer', label: 'Costume Designer' },
        { value: 'Dialogue Writer', label: 'Dialogue Writer' },
        { value: 'Editor', label: 'Editor' },
        { value: 'Lyric Writer', label: 'Lyric writer' },
        { value: 'Musician', label: 'Musician' },
        { value: 'Script Writer', label: 'Script Writer' },
        { value: 'Still Photographer', label: 'Still Photographer' },
        { value: '', label: '' }
    ]

    useEffect(() => {
        console.log("listening in snapshot")
        db.collection('profiles').doc("MYipUY9tfbUWcjG7ryav").get()
            .then(snapshot => setUserDetails(snapshot.data()))
        console.log("profiles :: userdetails", userDetails);


    }, [])


    useEffect(() => {
        console.log("listening in snapshot")
        db.collection('profiles').onSnapshot(snapshot => {
            setprofiles(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })
        console.log("profiles ::", profiles);
        // const homeGalleryData2 = (profiles.concat(homeGalleryData));
        // setgalleryItemsCurrent(profiles.concat(homeGalleryData));
        // const all = homeGalleryData2;

    }, [])

    useEffect(() => {
        console.log("listening in snapshot")
        setgalleryItemsCurrent(profiles.concat(homeGalleryData));
    }, [profiles])

    // // const homeGalleryData2 = (profiles.concat(homeGalleryData));
    // // sethomeGalleryData2(profiles.concat(homeGalleryData));
    const all = (profiles.concat(homeGalleryData));;

    const handleFilter = (role) => {
        console.log(role.value)
        AmplitudeClick("filter-cliked-" + role.value, currentUser.displayName )
        if (role.value === "All") {
            setgalleryItemsCurrent(all)
            return
        }
        setgalleryItemsCurrent(all.filter((galleryItem) => galleryItem.data.role === role.value))
    };

    let display = (
        <>
            <Box sx={{ m: 6 }}>
                <Grid
                    container
                    spacing={2}
                >
                    {
                        galleryItemsCurrent.map((obj) => (
                            <Grid item md={3} >
                                <HomeGalleryCards cardData={obj.data} />
                            </Grid>

                        ))
                    }

                </Grid>
            </Box>
        </>


    );

    if (loading) display = <Spinner />;


    return (
        <>
                <div className="filtercontainer">
                    <Select isSearchable={false} placeholder="Select role (Ex: Actor, Singer, Editor)" options={options} onChange={(e) => handleFilter(e)} className="galleryFilter" />
                </div>
            <div className="mycard">
                {display}
            </div>
        </>
    )
};

export default HomeGallery;