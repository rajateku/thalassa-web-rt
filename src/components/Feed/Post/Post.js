import React, { useContext, useEffect, useState } from 'react';
import './Post.css'
import Select from 'react-select'
import { ThumbUp, ChatBubbleOutline, AccountCircle, NearMe, ExpandMoreOutlined } from '@material-ui/icons';

import {
  Button,
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  // CardActions,
  // Collapse,
  // IconButton,
  Typography,
  // red,
  Grid,
  Box, Divider
}
  from '@material-ui/core';

import { AuthContext } from '../../Auth/Auth';

// database
import firebase from 'firebase'
import firebase2 from '../../firebase'
const db = firebase2.firestore();



const Post = ({ profilePic, image, username, timestamp, message }) => {
  return (

    <Grid container  >

      <Grid item sm={0} md={3} ></Grid>


      <Grid item sm={12} md={6} >

        <Card  className="post">
          <CardHeader
            avatar={
              <Avatar src={profilePic} className="postAvatar">
                {username.charAt(0)}
              </Avatar>
            }
            title={username}
            subheader={new Date(timestamp?.toDate()).toUTCString()}
          />
          <CardContent>
            <Typography variant="body" color="text.secondary">
              {message}
            </Typography>
          </CardContent>

          {image ? (
            <CardMedia
              component="img"
              // height="494"
              width="494"
              image={image}
            />
          ) : (<div> </div>)}

          {/* <CardMedia
        component="img"
        height="494"
        image={image}
      />   */}


        </Card>
      </Grid>
      <Grid item sm={0} md={3}  ></Grid>
      <Divider />


    </Grid>
    



    // <div className="post">
    //     <div className="postTop">
    //         <Avatar src={profilePic} className="postAvatar" />

    //         <div className="postTopInfo">
    //             <h3>{username}</h3>
    //             {/* <p>time</p> */}
    //             {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
    //             <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
    //         </div>
    //     </div>

    //     <div className="postBottom">
    //         <p>{message}</p>
    //     </div>

    //     <div className="postImage">
    //         <img src={image} alt=""/>
    //     </div>

    //     <div className="postOptions">
    //         {/* <div className="postOption">
    //             <ThumbUp />
    //             <p>Like</p>
    //         </div> */}

    //         {/* <div className="postOption">
    //             <ChatBubbleOutline />
    //             <p>Comment</p>
    //         </div>

    //         <div className="postOption">
    //             <NearMe />
    //             <p>Save</p>
    //         </div>

    //         <div className="postOption">
    //             <AccountCircle />
    //             <ExpandMoreOutlined />
    //         </div> */}
    //     </div>
    // </div>
  )
}

const Post2 = ({ postid, postcity, profilePic, image, username, timestamp, message }) => {
  const [comment, setInput] = useState('');
  // const [commentObject, setCommentObject] = useState({});
  const [allCommentObjects, setAllCommentObjects] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [docid, setDocId] = useState(postid);
  const [city, setCity] = useState(postcity);
  const { currentUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState('');
  // setInput({"name" : currentUser.displayName,"comment" : comment})
  // const snap = await getDoc(doc(db, 'posts', docid));
  console.log("currentUser: ", currentUser.displayName)

  var docRef = db.collection("posts").doc(docid);
  console.log("city: ", postcity);
  var commentObject =({"user": currentUser.displayName, "comment" : comment, "imageUrl" : currentUser.photoURL})            
  // setCommentObject("hjh")            

  
  useEffect(() => {
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data().comments);
          setAllComments(doc.data().comments)
          setAllCommentObjects(doc.data().allCommentsWithNames)
      } else {
          // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

    }, [])
  




          const handleComment = e => {
            e.preventDefault();
            console.log("inside handle comment", docid);
            console.log("inside handle comment: ", db.collection("posts").doc(docid).get());            
            

            // docRef.get().then(function(doc) {
            //     if (doc.exists) {
            //         console.log("Document data:", doc.data().comments);
            //         setAllComments(doc.data().comments)
            //     } else {
            //         // doc.data() will be undefined in this case
            //         console.log("No such document!");
            //     }
            // }).catch(function(error) {
            //     console.log("Error getting document:", error);
            // });


            console.log("allComments" , allComments)
            console.log(comment)
            // setCommentObject({"user": "user", "comment" : "comment"})     
            allComments.push(comment);
            allCommentObjects.push(commentObject);
            setAllComments( allComments)
            console.log("allComments after addition", allComments)
            console.log("allCommentObjects", allCommentObjects)

            // send data to database
            db.collection("posts").doc(docid).update({comments: allComments});
            db.collection("posts").doc(docid).update({allCommentsWithNames: allCommentObjects});

            // db.collection('posts').add({
            //     message: comment,
            //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            //     profilePic: currentUser.photoURL,
            //     username: currentUser.displayName,
            //     image: imageUrl
            // })

            // clear form
            setInput('');
          // console.log("comment" + comment)
        }


  return (
<>
      

      <div className="post">
          <div className="postTop">
              <Avatar src={profilePic} className="postAvatar" />

              <div className="postTopInfo">
                  <h3>{username}</h3>
                  {/* <p>time</p> */}
                  {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
                  <p>{new Date(timestamp?.toDate()).toUTCString()}, {city}</p>
                  {/* <p>{city}</p> */}
              </div>
          </div>

          <div className="postBottom">
              <p>{message}</p>
              

          </div>

          {/* <div className="postImage">
              <img src={image} alt=""/>
          </div> */}
          <hr></hr>
          
      </div>
      

      <div className="comments-section" >
          <p> Comments</p>
          {
                allCommentObjects.map(commentWithName => (
                    <>
                    <div className="postTop">
                    <Avatar src={commentWithName.imageUrl} className="postAvatar" />

                    <div className="single-comment">
                        <h3>{commentWithName.user}</h3>
                        <p> {commentWithName.comment}</p>
                    </div>
                    </div>
                    {/* <Avatar src={commentWithName.imageUrl} className="postAvatar" /> */}
                    {/* <p> {commentWithName.user}: {commentWithName.comment}</p> */}
                    </>
                        
                ))
            }
              {/* <div className="postOption">
                  <ThumbUp />
                  <p>Like</p>
              </div>

              <div className="postOption">
                  <ChatBubbleOutline />
                  <p>Comment</p>
              </div> */}
              <form>
              {/* <span> <ChatBubbleOutline /><p>Comment</p></span> */}
                <input
                    value={comment}
                    onChange={e => setInput(e.target.value)}
                    className="postOption"
                    placeholder={`Add a comment`}
                />
                <Button variant="contained" onClick={handleComment} type="submit" color="blue" > Submit Comment</Button>                 
              </form>
              {/* <div className="postOption">
                  <NearMe />
                  <p>Save</p>
              </div> */}
              {/* <div className="postOption">
                  <AccountCircle />
                  <ExpandMoreOutlined />
              </div> */}
      </div>

      </>
  )
}

export default Post2;
