import React, { useState, useEffect } from 'react';
import './Feed.css';
import AmplitudeEvent from '../../components/AmplitudeEvent'

// components
import MessageSender from './MessageSender/MessageSender';
import Post2 from './Post/Post';

// database
import firebase from '../firebase'
const db = firebase.firestore();



const Feed = () => {
    AmplitudeEvent("feed-loaded");

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        console.log("listening in snapshot")
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
        })
        console.log(posts)

    }, [])

    return (
        <div className="feed">
            <MessageSender />
            {
                posts.map(post => (
                    <Post2
                        key={post.id}
                        postid={post.id}
                        postcity={post.data.city}
                        profilePic={post.data.profilePic}
                        message={post.data.message}
                        timestamp={post.data.timestamp}
                        username={post.data.username}
                        image={post.data.image}
                        className="feed-post"
                    />
                ))
            }
        </div>
    )
}

export default Feed;
