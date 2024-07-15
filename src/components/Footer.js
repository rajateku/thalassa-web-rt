import React, { useContext, useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
// import firebase from './firebase';
// import { AuthContext } from './Auth/Auth';
// import { Avatar, CardHeader, Box, Menu, MenuItem } from '@material-ui/core'
import '../App.css';

// import ProfileMenu from './ProfileMenu'

const Footer = () => {

  return (
    <>
      <footer class="page-footer">
        <div class="container">
          <div class="row">
            <div class="col l6 s12">
              <h5 >Contact</h5>
              <p class=" text-lighten-4">Leave your feedback at thalassa@gmail.com</p>
            </div>
            <div class="col l4 offset-l2 s12">
              {/* <h5 >Social</h5> */}
              <p>thalassa © 2022 Copyright</p>
              <ul >
                {/* <li><a href="https://www.instagram.com/theclimatebook/" target="_blank">Instagram</a></li> */}
                {/* <li><a href="#!">Twitter</a></li> */}
                {/* <li><a href="https://www.linkedin.com/company/the-climate-book" target="_blank">LinkedIn</a></li> */}
                {/* <li><a href="#!">Link 4</a></li> */}
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-copyright">
          <div class="container">
            {/* Expatgyd © 2022 Copyright */}
            {/* <a class="right" href="#!">More Links</a> */}
          </div>
        </div>
      </footer>
    </>
  );
};


export default Footer;
