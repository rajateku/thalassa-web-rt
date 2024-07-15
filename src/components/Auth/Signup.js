import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import M from 'materialize-css';
import Spinner from '../Spinner/Spinner';
// import firebase from '../firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Select from 'react-select'


import { AuthContext } from './Auth';
import AmplitudeEvent from '../../components/AmplitudeEvent'

const db = firebase.firestore();

const Signup = () => {
    AmplitudeEvent("/signup-loaded");


    const history = useHistory();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const find = (event) => {
        // event.preventDefault();
        setRole(event["value"]);

    };

    const options = [
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

    if (currentUser) {
        return <Redirect to="/" />;
    }

    const postData = (event) => {
        if (!name) return M.toast({ html: "Name can't be empty", classes: "#c62828 red darken-3" });
        // if (!role) return M.toast({ html: "Role can't be empty", classes: "#c62828 red darken-3" });
        setLoading(true);
        event.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(result => {

                result.user.updateProfile({
                    displayName: name,
                    roleName: role
                })
                setLoading(false);
                M.toast({ html: 'Successfully Signed Up!', classes: "#43a047 green darken-1" });
                db.collection('profiles').add({
                    name: name,
                    email: email,
                    role: role,
                    publicprofile: "https://telfylm.web.app/profile-" + result.user.uid,
                    googleuid: result.user.uid,
                    // photoURL: result.user.photoURL.replace('=s96-c', '=s296-c'),
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    updated: firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.push("/");

            })
            .catch(e => {
                setLoading(false);
                M.toast({ html: e.message, classes: "#c62828 red darken-3" });
            });
    };

    const googleAuth = () => {
        // if (!role) return M.toast({ html: "Role can't be empty", classes: "#c62828 red darken-3" });
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                result.user.updateProfile({
                    displayName: result.user.displayName,
                    roleName: role
                })
                setLoading(false);
                M.toast({ html: 'Successfully Signed Up!', classes: "#43a047 green darken-1" });
                db.collection('profiles').add({
                    name: result.user.displayName,
                    email: result.user.email,
                    role: role,
                    publicprofile: "https://telfylm.web.app/profile-" + result.user.uid,
                    googleuid: result.user.uid,
                    photoURL: result.user.photoURL.replace('=s96-c', '=s296-c'),
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    updated: firebase.firestore.FieldValue.serverTimestamp(),
                });
                history.push("/");
            })
            .catch(e => {
                setLoading(false);
                M.toast({ html: e.message, classes: "#c62828 red darken-3" });
            });
    }
    const colourStyles = {
        // control: styles => ({ ...styles, backgroundColor: 'white', fontColor: '#ff0100' }),
        control: styles => ({ ...styles, backgroundColor: '#fff585' }),
        // control: styles => ({ ...styles, backgroundColor: 'red' }),
        // option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        //   const color = 'red';
        //   return {
        //     // ...styles,
        //     // backgroundColor: isDisabled ? 'red' : "white",
        //     color: 'black',
        //     font: "20px",
        //     // cursor: isDisabled ? 'not-allowed' : 'default',
        //     // ...
        //   };
        // },
        // ...
    };

    const customStyles = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
            padding: 20,
        }),

        control: (_, { selectProps: { width } }) => ({
            width: width
        }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    }


    let display = (
        <div className="card auth-card input-field">
            <h2>Sign Up</h2>
            {/* <input type="text" placeholder="Full Name" value={name} onChange={(event) => setName(event.target.value)} /> */}
            {/* <input type="text" placeholder="Role (Ex: Actor, Singer, Writer)" value={role} onChange={(event) => setRole(event.target.value)} /> */}
            {/* <Select placeholder="Select Role (Can be changed later)" options={options} onChange={(e) => find(e)} styles={customStyles} menuColor='red' /> */}
            {/* <br /> */}
            {/* <p>Select role, can be changed later</p>
            <Select
                // defaultValue={flavourOptions[2]}
                isSearchable={false}
                options={options}
                onChange={(e) => find(e)}
                styles={colourStyles}
                defaultValue={options[0]}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 10,
                    colors: {
                        ...theme.colors,
                        // primary25: 'red',
                        primary: 'black',
                    },
                })}
            /> */}
                        <br />


            <div className="google-btn" onClick={googleAuth}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                </div>

                <p className="btn-text"><b>Sign up with google</b></p>
            </div>
            <h6>or</h6>
            {/* <Select placeholder="Select role (Ex: Actor, Singer, Editor)" options={options}   onChange={(e) => find(e)} /> */}
            <input type="text" placeholder="Full Name" value={name} onChange={(event) => setName(event.target.value)} />
            {/* <input type="text" placeholder="Role (Ex: Actor, Singer, Writer)" value={role} onChange={(event) => setRole(event.target.value)} /> */}

            <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
            <button className="btn waves-light #64b5f6 blue darken-1" onClick={postData} >SignUp</button>
            <h6>Already have an account?<Link to="/signin"><span style={{ color: 'rgb(8, 93, 252)' }}> SignIn</span></Link></h6>
        </div>
    );


    if (loading) display = <Spinner />


    return (
        <div className="mycard">
            {display}
        </div>
    )
};

export default Signup;