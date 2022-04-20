import React from 'react';
import {Link} from 'react-router-dom';

const WelcomePage = () => {

    return (
        <div className="welcome-page">
            <h3>DrawIt!</h3>
            <Link to={`/waiting`} className="play-button">Play</Link>
        </div>
    )

}

export default WelcomePage;
