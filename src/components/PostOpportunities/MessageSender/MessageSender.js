import React, { useContext, useEffect, useState } from 'react';
import './MessageSender.css'
import firebase from 'firebase'

// icons
import { Avatar } from '@material-ui/core'
// import { Videocam, PhotoLibrary, InsertEmoticon} from '@material-ui/icons'
import { Button } from '@material-ui/core';
import Select from 'react-select'


import {

    Card,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CardHeader,
    CardMedia,
    CardContent,
    // CardActions,
    // Collapse,
    // IconButton,
    Typography,
    // red,
    Grid,
    Box
}
    from '@material-ui/core';

// context api
// import { useStateValue } from '../../../state/Provider'
import { AuthContext } from '../../Auth/Auth';


// database
import firebase2 from '../../firebase'
const db = firebase2.firestore();

const MessageSender = () => {
    // console.log(useStateValue())
    // const [{ currentUser }, dispatch] = useStateValue();
    const { currentUser } = useContext(AuthContext);

    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [location, setLocation] = useState('');
    const [other, setOther] = useState('');
    const [profileLink, setProfileLink] = useState("https://telfylm.web.app/profile-" + currentUser.uid);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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

    const handleSubmit = e => {
        e.preventDefault();

        // send data to database
        db.collection('opportunities').add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            profilePic: currentUser.photoURL,
            username: currentUser.displayName,
            image: imageUrl,
            location: location,
            profileLink: profileLink
        })

        // clear form
        setInput('');
        setImageUrl('');
        setLocation('');
        setOther('');
        setProfileLink('');
    }

    const find = (event) => {
        // event.preventDefault();

        setInput(event["value"]);

    };

    return (
        <>
            <button variant="outlined" onClick={handleClickOpen} className="postOpportunity">
                + Post a requirement
            </button>

            {/* <div className="messageSender"> */}
                <Grid container spacing={4}>
                    <Grid item sm={1} md={4} ></Grid>
                    <Grid item sm={12} md={8} >
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Calling for</DialogTitle>
                            <DialogContent>
                                <form>

                                    {/* <h4>Calling for </h4> */}

                                    <Select isSearchable={false} options={options} onChange={(e) => find(e)} />

                                    <input
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        className="messageImageInput"
                                        placeholder={"Location"} />
                                    <input
                                        value={imageUrl}
                                        onChange={e => setImageUrl(e.target.value)}
                                        className="messageImageInput"
                                        placeholder={"Public Image URL (Optional)"} />

                                    <input
                                        value={other}
                                        onChange={e => setOther(e.target.value)}
                                        className="messageImageInput"
                                        placeholder={"Any specific requirements (Optional)"} />
                                    <Button variant="contained" onClick={handleSubmit} type="submit" color="blue" > Submit</Button>


                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Exit</Button>
                            </DialogActions>
                        </Dialog>

                        <div>
                            {/* <form>
                           
                            <h4>Calling for </h4>

                            <Select options={options} onChange={(e) => find(e)} />

                            <input
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                className="messageImageInput"
                                placeholder={"Location"} />
                            <input
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                                className="messageImageInput"
                                placeholder={"Public Image URL (Optional)"} />

                            <input
                                value={other}
                                onChange={e => setOther(e.target.value)}
                                className="messageImageInput"
                                placeholder={"Any specific requirements (Optional)"} />

                        </form> */}



                            {/* <Button variant="contained" onClick={handleSubmit} type="submit" color="blue" > Submit</Button> */}
                        </div>

                    </Grid>

                    {/* <Grid item sm={1} md = {2} ></Grid> */}


                </Grid>

            {/* </div> */}
        </>
        // <div className="messageSender">
        //     <div className="messageSenderTop">
        //         <Avatar src={user.photoURL} />
        //         <form>
        //             <input 
        //                 value={input} 
        //                 onChange={e => setInput(e.target.value)} 
        //                 className="messageSenderInput" 
        //                 placeholder={`Share your climate experience, ${user.displayName}?`} 
        //             />
        //             <input
        //                 value={imageUrl}
        //                 onChange={e => setImageUrl(e.target.value)} 
        //                 placeholder={"Image URL (Optional)"} />
        //             {/* <button onClick={handleSubmit} type="submit">Hidden submit</button> */}
        //         </form>
        //         <Button variant="contained" onClick={handleSubmit} type="submit" color="blue" > Submit</Button>
        //         {/* <Button sx = {{ backgroundcolor : "blue"}}>submit</Button> */}

        //     </div>

        //     {/* <div className="messageSenderBottom">
        //         <div className="messageSenderOption">
        //             <Videocam style={{color: 'red'}} />
        //             <h3>Live Video</h3>
        //         </div>

        //         <div className="messageSenderOption">
        //             <PhotoLibrary style={{color: 'green'}} />
        //             <h3>Photo/Video</h3>
        //         </div>

        //         <div className="messageSenderOption">
        //             <InsertEmoticon style={{color: 'orange'}} />
        //             <h3>Feeling/Activity</h3>
        //         </div>
        //     </div> */}
        // </div>
    )
}

export default MessageSender;
