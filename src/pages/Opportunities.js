import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Spinner from '../components/Spinner/Spinner';
import firebase from '../components/firebase';
import { AuthContext } from '../components/Auth/Auth';
import section1Data from '../assets/section1.json'
import events from '../assets/resources-events.json'
import carouselData from '../assets/CarouselData.json'

import SectionCards from '../components/SectionCards'

import Footer from '../components/Footer';

import AmplitudeEvent from '../components/AmplitudeEvent'

import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Grid
} from '@material-ui/core';

const diys = section1Data;


const Opportunities = () => {

    AmplitudeEvent("opportunities-loaded");

    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);

    // if (currentUser) {
    //     return <Redirect to="/opportunities" />;
    // }

    let display = (
        <>

            <div class="section1-grid">
                <div class="website-section-heading">
                    <Typography variant="h2" >
                        Opportunities
                    </Typography>
                </div>

                <Grid
                    container
                    spacing={2}
                >
                    {
                        diys.map((obj) => (
                            <Grid item md={3} class="grid-card">
                                <SectionCards cardData={obj} />
                            </Grid>

                        ))
                    }

                </Grid>



            </div>

            <div class="section1-grid">
                <div class="website-section-heading">
                    <Typography variant="h2" >
                        Equipment for rent
                    </Typography>
                </div>

                <Grid
                    container
                    spacing={2}
                >
                    {
                        events.map((obj) => (
                            <Grid item md={3} class="grid-card">
                                <SectionCards cardData={obj} />
                            </Grid>

                        ))
                    }

                </Grid>
                <div class="website-section-heading">
                    <button class="see-more" >

                        <Typography variant="h5" >
                            <Link to="/signup" class="see-more">  Signup to view all </Link>
                        </Typography>
                    </button>
                </div>


            </div>


        </>


    );

    if (loading) display = <Spinner />;


    return (
        <div className="mycard">
            {display}
            {/* {display} */}
            <Footer />
        </div>
    )
};

export default Opportunities;