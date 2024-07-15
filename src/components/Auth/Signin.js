import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Spinner from '../Spinner/Spinner';
import firebase from '../firebase';
import { AuthContext } from './Auth';
import { useStateValue } from '../../state/Provider'
import { actionTypes } from '../../state/reducer'
import AmplitudeEvent from '../../components/AmplitudeEvent'



const Signin = () => {
    AmplitudeEvent("/signin-loaded");


    const history = useHistory();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    // const [state, dispatch] = useStateValue();

    
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
                M.toast({html: 'Successfully Signed In!', classes:"#43a047 green darken-1"});
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({html: e.message, classes:"#c62828 red darken-3"});
            });

    };

    const googleAuth = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                // dispatch({
                //     type: actionTypes.SET_USER,
                //     user: result.user
                // });
                console.log(result);

                result.user.updateProfile({
                    displayName: result.user.displayName
                })
                setLoading(false);
                // M.toast({html: 'Successfully Signed In!', classes:"#43a047 green darken-1"});
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({html: e.message, classes:"#c62828 red darken-3"});
            });
    }


    let display =  (
        <div className="card auth-card input-field">
            <h2>Sign In</h2>
            <div className="google-btn" onClick={googleAuth}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                </div>  
                <p className="btn-text"><b>Sign in with google</b></p>
            </div>
            <h6>or</h6>
            <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={postData} >Login</button>
            <h6>Don't have an account?<Link to="/signup" ><span style={{ color: 'rgb(8, 93, 252)' }}> SignUp</span></Link></h6>
        </div>
    );

    if (loading) display = <Spinner />;
    

    return (
        <div className="mycard">
            {display}
        </div>
    )
};

export default Signin;