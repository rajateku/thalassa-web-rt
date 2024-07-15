import React, { useContext, useEffect, useState } from 'react';
import firebase from 'firebase'
import {
    Typography,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Grid
} from '@material-ui/core';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../components/Auth/Auth';
// import { Avatar, CardHeader, Box, Menu, MenuItem , ListItemIcon, Divider, IconButton, Typography, Tooltip } from '@material-ui/core'
import AmplitudeEvent from '../components/AmplitudeEvent'
// import UserCard from "../components/Profile/userCard";
import firebase2 from '../components/firebase'
import ProfileCard from '../components/Profile/ProfileCard'
import ProfileVideoCard from '../components/Profile/ProfileVideoCard'
import Spinner from '../components/Spinner/Spinner';

const db = firebase2.firestore();
const storage = firebase2.storage();


const Profile = () => {
    AmplitudeEvent("/profile-loaded");
    const [posts, setPosts] = useState([]);
    const [resultposts, setresultposts] = useState([]);
    const [files, setFiles] = useState();
    const { currentUser } = useContext(AuthContext);
    console.log(currentUser)
    console.log(currentUser.uid)
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [videoLinks, setvideoLinks] = useState([`https://youtube.com/embed/4fzk4miRGw0?autoplay=0`,
        `https://youtube.com/embed/4fzk4miRGw0?autoplay=0`]);



    const [profileUrl, setprofileUrl] = useState("https://telfylm.web.app/profile-" + currentUser.uid);
    // var storageRef = storage.ref(`/profile-images/${currentUser.uid}/`);


    useEffect(() => {
        console.log("listening in snapshot")
        db.collection('profiles').where("googleuid", "==", currentUser.uid).onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })
        console.log("posts ", posts)

    }, [])

    const [file, setFile] = useState();
    const [imagetoUpload, setImagetoUpload] = useState('');

    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setImagetoUpload(e.target.files[0])
    }

    const upload = () => {
        if (imagetoUpload == null)
            return;
        storage.ref(`/profile-images/${currentUser.uid}/${imagetoUpload.name}`).put(imagetoUpload)
            // storage.ref(`/images/${imagetoUpload.name}`).put(imagetoUpload)
            .on("state_changed", alert("Success, reload after few seconds for changes"), alert);
    }


    const editprofile = () => {
        alert("Editing coming soon")

    }

    useEffect(() => {
        const fetchImages = async () => {
            let result = await storage.ref().child(`/profile-images/${currentUser.uid}`).listAll();
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

    // const notify = ()=>{
    //     toast('Link copied to clipboard',
    //       {position: toast.POSITION.TOP_CENTER})
    // }

    let display = (
        <Card >
        </Card>
    );
    if (loading) display = <Spinner />;


    display = (
        <>
            <h3 className="card auth-card input-field">Portfololio</h3>
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
                            <a href={profileUrl} target="_blank">Public Profile link</a>

                            {/* <button onClick={() => {navigator.clipboard.writeText(profileUrl)}} > Public Profile link</button> */}
                            <hr />
                            <button class="btn" onClick={editprofile} >
                                <Typography variant="h5" >
                                    Edit Profile
                    </Typography>
                            </button>
                        </div>


                    ))
                }

            </div>

            {/* <div className="card auth-card input-field">
                

                <div>
                    <hr/>
                    <button class="btn" onClick={editprofile} >
                        <Typography variant="h5" >
                            Edit Profile
                    </Typography>
                    </button>
                </div>
            </div> */}

            <Grid container spacing={2}>
                {
                    files?.map(file => (
                        <Grid item md={4} >
                            < ProfileCard cardData={file} />
                        </Grid>
                    ))
                }
            </Grid>

            {/* <Grid container spacing={2}>
                {
                    videoLinks?.map(videoLink => (
                        <Grid item md={4} >
                            < ProfileVideoCard cardData={videoLink} />
                        </Grid>
                    ))
                }
            </Grid> */}


            <div className="website-section-heading">
                <div>
                    <label for="files" class="btn">Choose Image</label>
                    <input id="files" style={{ display: 'none' }} type="file" onChange={handleChange} />

                    <button class="btn" onClick={upload} >
                        <Typography variant="h5" >
                            Upload
                    </Typography>
                    </button>
                </div>

                {/* <label for="file" class="btn" onChange={handleChange}>Select Image</label> */}
                {/* <input id="files" style="visibility:hidden;" type="file"> */}
                {/* <input type="file" onChange={handleChange} /> */}
                {/* <button onClick={upload}>Upload</button> */}
                {/* <button class="see-more" onClick={upload} >
                        <Typography variant="h5" >
                            Upload
                    </Typography>
                    </button> */}
                {/* <h2>Add Image:</h2> */}
                <img src={file} height="400vh" />
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