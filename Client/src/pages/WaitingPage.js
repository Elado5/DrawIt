import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const WaitingPage = ({ socket, playerNumber, setPlayerNumber, room }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (playerNumber === 1) {
            navigate(`../choice`, { replace: true });
        }
        if (playerNumber === 2) {
            navigate(`../guessing`, { replace: true });
        }
        return () => {

        }
    }, [navigate, playerNumber])


    return (
        <div className="waiting-page">
            <p>This room is full, try another one.</p>
            <Link to={`/`}><button>Back</button></Link>
        </div>
    )
}

export default WaitingPage;