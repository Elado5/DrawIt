import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

const WaitingPage = ({ socket, playerNumber, setPlayerNumber,  room }) => {

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
           // <Navigate replace to={`/`}></Navigate>
           <p>Waiting...</p>
        )
    }
}

export default WaitingPage;