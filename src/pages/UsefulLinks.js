import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Spinner from '../components/Spinner/Spinner';
import firebase from '../components/firebase';
import { AuthContext } from '../components/Auth/Auth';

import links from '../assets/links.json'

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

const FAQs = (props) => {
    AmplitudeEvent("/usefullinks-loaded");
    const linksData = links;
    // json_keys = Object.keys(linksData)



    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);

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
                M.toast({ html: 'Successfully Signed In!', classes: "#43a047 green darken-1" });
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({ html: e.message, classes: "#c62828 red darken-3" });
            });

    };

    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                result.user.updateProfile({
                    displayName: result.user.displayName
                })
                setLoading(false);
                M.toast({ html: 'Successfully Signed In!', classes: "#43a047 green darken-1" });
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({ html: e.message, classes: "#c62828 red darken-3" });
            });
    }


    let display = (
        <>
            <div class="about-us">
                <h4>Links (Mostly relevant to Munich)</h4>
                
                {
                        // linksData.map((obj, key) => (
                        Object.keys(linksData).map((key, index) => (
                            <>
                            <h3> {key} </h3>
                            <div>
                            {
                        linksData[key].map((obj, i) => (
                            i%2 === 1 ?
                            (<div><a href={obj}>{obj}</a></div>                           
                                ) : null
                        ))
                }
                            </div>
                           </>
                        ))
                        
                }
            
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

export default FAQs;