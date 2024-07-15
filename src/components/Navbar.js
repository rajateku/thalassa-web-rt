import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import firebase from './firebase';
import { AuthContext } from './Auth/Auth';
import { Avatar, CardHeader, Box, Menu, MenuItem } from '@material-ui/core'
// import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import '../App.css';

import ProfileMenu from './ProfileMenu'

const Navbar = () => {

    const history = useHistory();
    const { currentUser } = useContext(AuthContext);


    useEffect(() => {
        let sidenav = document.querySelector('#mobile-links');
        M.Sidenav.init(sidenav, {});
    }, [])

    const renderList = () => {
        if (currentUser) {
            return [
                // <li className="sidenav-close" key="1"><Avatar src={currentUser.photoURL} alt="M"> Michael </Avatar></li>,
                
                <li className="sidenav-close" key="221"><Link to="/home">Home</Link></li>,
                <li className="sidenav-close" key="222"><Link to="/bluecard">Blue Card</Link></li>,
                // <li className="sidenav-close" key="13"><Link to="/faqs">FAQs</Link></li>,
                // <li className="sidenav-close" key="14"><Link to="/usefullinks">Useful Links</Link></li>,
                // <li className="sidenav-close" key="2"><Link to="/opportunities">Opportunities</Link></li>,
                // <li className="sidenav-close" key="3"><Link to="/profile">{currentUser.displayName}</Link></li>,
                <li className="sidenav-close" key="30">{currentUser.displayName}</li>,

                // <li className="sidenav-close" key="3"><Link to="/feature3">Feature 3</Link></li>,
                // <li className="sidenav-close" key="10">
                //     <CardHeader
                //         avatar={
                //             <Avatar
                //                 src={currentUser.photoURL}
                //             />
                //         }
                //     title={currentUser.displayName}
                //     /></li>,
                <ProfileMenu currentUser={currentUser}/>,
                
                // <li className="sidenav-close" key="2"><Link to="feature1">Profile</Link></li>,
                // <li className="sidenav-close" key="4">
                //     <button className="btn  "
                //         onClick={() => {
                //             firebase.auth().signOut()
                //                 .then(() => {
                //                     M.toast({ html: "Successfully Logged Out", classes: "#43a047 green darken-1" });
                //                     history.push('/signin');
                //                 })
                //                 .catch((e) => {
                //                     console.log(e);
                //                 })
                //         }} >
                //         Logout</button>
                // </li>,

            ];
        } else {
            return [
                <li className="sidenav-close" key="11"><Link to="/explore">Home</Link></li>,
                // <li className="sidenav-close" key="12"><Link to="/aboutus">About Us</Link></li>,

                <li className="sidenav-close" key="12"><Link to="/bluecard">Blue Card</Link></li>,
                <li className="sidenav-close" key="13"><Link to="/faqs">FAQs</Link></li>,
                <li className="sidenav-close" key="14"><Link to="/usefullinks">Useful Links</Link></li>,
                // <li className="sidenav-close" key="15"><NotificationsNoneIcon> </NotificationsNoneIcon></li>,
                // <li className="sidenav-close" key="13"><Link to="/resources">Resources</Link></li>,
                <li className="sidenav-close" key="15"><Link to="/signin">Sign in</Link></li>,
                <li className="sidenav-close" key="16"><Link to="/signup">Sign up</Link></li>
            ];
        }
    };


    return (
        <>
            <div class="navbar-fixed">
                {/* <ul id="dropdown1" class="dropdown-content">
                    <li><a href="#!">one</a></li>
                    <li><a href="#!">two</a></li>
                    <li class="divider"></li>
                    <li><a href="#!">three</a></li>
                </ul> */}
                <nav>
                    <div className="nav-wrapper white">
                        <Link to={currentUser ? "/" : "/explore"} className="brand-logo"> </Link>
                        <a href="#" className="sidenav-trigger" data-target="mobile-links">
                            <i className="material-icons">menu</i>
                        </a>
                        {/* <ul id="nav-mobile" className="right hide-on-med-and-down"> */}
                        <ul id="nav-mobile" className="right">
                            {renderList()}
                        </ul>
                    </div>

                </nav>
            </div>

            <ul className="sidenav" id="mobile-links">
                {renderList()}
            </ul>
        </>
    );
};


export default Navbar;
