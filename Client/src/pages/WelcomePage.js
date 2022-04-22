import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = ({ socket, userName, setUserName, room, setRoom, joinRoom }) => {

    return (
        <div className="welcome-page">
            <h2 className="title">DrawIt!</h2>
            <input type="text" placeholder="user name" className="username" onChange={(e) => setUserName(e.target.value)}></input>
            <input type="text" placeholder="room id" className="room-id" onChange={(e) => setRoom(e.target.value)}></input>
            <div className="play-buttons">
                <Link to={`/choice`}><button className="play-button" onClick={joinRoom}>Play-Drawer</button></Link>
                <Link to={`/guessing`}><button className="play-button" onClick={joinRoom}>Play-Guesser</button></Link>
            </div>
        </div>
    )

}

export default WelcomePage;
