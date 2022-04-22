import React, { useEffect } from 'react';
import {Link, Navigate } from 'react-router-dom';

const WaitingPage = ({ socket, playerNumber, setPlayerNumber, room }) => {

    if (playerNumber === 1) {

        return (
            <Navigate replace to={`../choice`}></Navigate>
        )
    }

    else if (playerNumber === 2) {

        return (
            <Navigate replace to={`../guessing`}></Navigate>
        )
    }

    else {
        return (
            <div className="waiting-page">
                <p>This room is full, try another one.</p>
                <Link to={`/`}><button>Back</button></Link>
            </div>
        )
    }
}

export default WaitingPage;