import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = ({ socket, points, userName, setUserName, room, setRoom, joinRoom }) => {

    const highestScore = localStorage.getItem('highestScore');

    return (
        <div className="welcome-page">
            <h2 className="title">DrawIt!</h2>
            {highestScore && <h1 className="score">Highest Score: {highestScore}</h1>}
            <input type="text" placeholder="user name" className="username" onChange={(e) => setUserName(e.target.value)}></input>
            <input type="text" placeholder="room id" className="room-id" onChange={(e) => setRoom(e.target.value)}></input>
            <div className="play-buttons">
                <Link to={`/waiting`}><button className="play-button" onClick={joinRoom}>Play</button></Link>
            </div>
        </div>
    )

}

export default WelcomePage;
