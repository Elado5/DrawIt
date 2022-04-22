import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";

const GuessingPage = ({ socket, room , userName}) => {

    const canvasRef = useRef(null);
    const location = useLocation();
    const points = location.state?.points;
    const [guess, setGuess] = useState("");

    console.log('points', points)
    if(!points){
        document.location.href = '/';
    }

    const loadHandler = () => {
        if (sessionStorage.getItem('drawingSave')) {
            canvasRef.current.loadSaveData(sessionStorage.getItem('drawingSave'), false);
        }
    }

    const sendGuess = () => {
        socket.emit("send_guess", {guess: guess, room: room});
    }
    const sendDrawing = () => {
        //socket.emit("send_drawing", { drawing: "drawing" });
        socket.emit("send_drawing", {drawing: canvasRef.current.getSaveData(), room: room});
    }
    useEffect(() => {
        socket.on("receive_guess", (data) => {
            sessionStorage.setItem('drawingSave', data.guess); //get saved drawing data from playmate
            loadHandler(data.guess);
        })
    }, [socket])


    return (
        <div className="guessing-page">
            <CanvasDraw ref={canvasRef} className="canvas" canvasWidth={window.innerWidth * 0.75} canvasHeight={window.innerHeight * 0.75} disabled={true}/>
            <p>User: {userName} Room: {room}</p>
            <input type="text" placeholder="Your Guess" className="guess-input" onChange={(e) => setGuess(e.target.value)}/>
            <button className="button" onClick={sendGuess}>Send Guess</button>
            <button className="button" onClick={loadHandler}>Replay Animation</button>
        </div>
    )
}

export default GuessingPage;