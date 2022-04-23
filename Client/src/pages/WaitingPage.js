import React, { useEffect } from 'react';
import {Link, Navigate, useNavigate } from 'react-router-dom';

const WaitingPage = ({ socket, playerNumber, setPlayerNumber, room }) => {

    // if (playerNumber === 1) {

    //     return (
    //         <Navigate replace to={`../choice`}></Navigate>
    //     )
    // }

    // else if (playerNumber === 2) {

    //     return (
    //         <Navigate replace to={`../guessing`}></Navigate>
    //     )
    // }

    const navigate = useNavigate();

    useEffect(() => {
      if(playerNumber === 1){
          navigate(`../choice`, {replace: true});
      }
      if(playerNumber === 2){
        navigate(`../guessing`, {replace: true});
    }
      return () => {
        
      }
    }, [navigate, playerNumber])
    

    // else {
        return (
            <div className="waiting-page">
                <p>This room is full, try another one.</p>
                <Link to={`/`}><button>Back</button></Link>
            </div>
        )
    // }
}

export default WaitingPage;