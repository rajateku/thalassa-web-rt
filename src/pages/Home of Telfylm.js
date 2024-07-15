import React from 'react';

const Home = () => {

    let display =  (
        <div className="card auth-card input-field">
            <h2>Home</h2>
        </div>
        
    );

    return (
        <div>
             
            <div className="mycard">
            {display}
            {display}
            {display}
            {display}
            {display}
        </div>
               
        </div>
    );
};

export default Home;