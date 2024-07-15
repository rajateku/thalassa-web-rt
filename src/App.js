import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';


import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ViewProfile from './pages/ViewProfile';
import Aboutus from './pages/Aboutus';
import Resources from './pages/Resources';
import BlueCard from './pages/BlueCard';
import FAQs from './pages/FAQs';
import UsefulLinks from './pages/UsefulLinks';
import Opportunities from './pages/Opportunities';
import Website from './pages/Website';
import Navbar from './components/Navbar';
import Feed from './components/Feed/Feed';


// import Feed from './components/PostOpportunities/Feed';
import HomeGallery from './components/HomeGallery';

// import Navbar from './components/Navbar2';
import { AuthProvider } from './components/Auth/Auth';
import PrivateRoute from "./components/Auth/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          {/* <PrivateRoute path="/" exact component={Feed}/> */}
          <PrivateRoute path="/" exact component={Feed}/>
          {/* <PrivateRoute path="/opportunities" exact component={Feed}/> */}
          <PrivateRoute path="/profile" exact component={Profile}/>
          <Route path="/explore"  component={Website}/>
          <Route path="/aboutus" component={Aboutus}/>
          <Route path="/resources" component={Resources}/>
          <Route path="/bluecard" component={BlueCard}/>
          <Route path="/faqs" component={FAQs}/>
          <Route path="/usefullinks" component={UsefulLinks}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/profile-*" component={ViewProfile}/>
          <Route path="*">
            <Redirect to="/explore" />
          </Route>

        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
