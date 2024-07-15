import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';

import M from 'materialize-css';
import Spinner from '../components/Spinner/Spinner';
import firebase from '../components/firebase';
import { AuthContext } from '../components/Auth/Auth';
import './Website.css'

import Footer from '../components/Footer';

import section1 from '../assets/section1.json'
import carouselData from '../assets/CarouselData.json'

import SectionCards from '../components/SectionCards'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Grid
} from '@material-ui/core';

// import * as Amplitude from '@amplitude/node';
// const client = Amplitude.init('134db46c6891a3c3aed764a5dc7d8eda');

import AmplitudeEvent from '../components/AmplitudeEvent'

const Website = () => {
    const section1Data = section1.slice(0, 3);

    AmplitudeEvent("/website-landingpageloaded");

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const history = useHistory();

    if (currentUser) {
        return <Redirect to="/" />;
    }



    const postData = (event) => {
        setLoading(true);
        event.preventDefault();
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(user => {
                setLoading(false);
                // M.toast({ html: 'Successfully Signed In!', classes: "#43a047 green darken-1" });
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({ html: e.message, classes: "#c62828 red darken-3" });
            });

    };

    let display = (
        <Card >

        </Card>

    );

    if (loading) display = <Spinner />;


    return (
        <>
            <Carousel
                showStatus={false}
                showThumbs={false}
                showArrows={false}
                infiniteLoop={true}
                transitionTime={200}
                useKeyboardArrows
                autoPlay={true}>

                {
                    carouselData.map((obj) => (
                        <div>
                            <img src={obj.image} alt="image" />
                        </div>

                    ))
                }
            </Carousel>

            <div class="section1-grid">
                <div class="website-section-heading">
                    <Typography variant="h3" >
                        Film Makers Community
                    </Typography>
                    <p> A place to meet the needs for your film journey. </p>
                    <button class="see-more" >

                        <Typography variant="h5" >
                            <Link to="/signup" class="see-more">  Sign Up</Link>
                        </Typography>
                    </button>

                </div>
            </div>

           



            <div class="section1-grid">
                <div class="website-section-heading">
                    <Typography variant="h4" >
                        Opportunities
                    </Typography>
                </div>

                <Grid
                    container
                    spacing={2}
                >
                    {
                        section1Data.map((obj) => (
                            <Grid item md={3} class="grid-card">
                                <SectionCards cardData={obj} />
                            </Grid>

                        ))
                    }

                </Grid>
                <div class="website-section-heading">
                    <button class="see-more" >

                        <Typography variant="h5" >
                            <Link to="/signup" class="see-more">  VIEW ALL</Link>
                        </Typography>
                    </button>
                </div>


            </div>
            <Footer />
        </>

    )
};

export default Website;