import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

const WaitingPage = ({ playerNumber, socket, room }) => {

    if (playerNumber === 1) {

        return (
            <div className="waiting-page"></div>
        )
    }

    else if (playerNumber === 2) {

        return (
            <div className="waiting-page"></div>
        )
    }

    else {
        return (
            <Navigate replace to={`/`}></Navigate>
        )
    }
}

export default WaitingPage;