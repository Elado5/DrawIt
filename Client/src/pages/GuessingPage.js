import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";

const GuessingPage = ({ socket, room , userName, points, addPoints}) => {

    const canvasRef = useRef(null);
    const location = useLocation();
    const [word, setWord] = useState("");
    const [guess, setGuess] = useState("");
    const [pointsForWord, setPointsForWord] = useState(0);
    // console.log('points', points)
    // if(!points){
    //     document.location.href = '/';
    // }

    const loadDrawing = (drawing) => {
            canvasRef.current.loadSaveData(drawing, false);
    }
    const loadDrawingReplay = () => {
        if (sessionStorage.getItem('drawingSave')) {
            canvasRef.current.loadSaveData(sessionStorage.getItem('drawingSave'), false);
        }
    }

    const sendGuessResult = () => {
        if (guess !== "" && word !== "" && pointsForWord !== 0){
            console.log(`word : ${word} ---- guess : ${guess} ---- pointsForWord : ${pointsForWord}`)
            if (guess === word){
                socket.emit("send_guess_result", {room: room, correct: true}); // send result and add points to other player
                addPoints(pointsForWord); //add points locally
            }
            else{
                socket.emit("send_guess_result", {room: room, correct: false});
            }
        }
    }
    
    useEffect(() => {

        socket.on("receive_drawing", (data) => {
            console.log('data from drawing received', data)
            sessionStorage.setItem('drawingSave', data.drawing); //get saved drawing data from playmate
            setWord(data.word); // get the word that needs to be guessed
            setPointsForWord(data.pointsForWord); // get how many points the word is worth
            loadDrawing(data.drawing); // load the drawing automatically
        })
    }, [socket])


    return (
        <div className="guessing-page">
            <CanvasDraw ref={canvasRef} className="canvas" canvasWidth={window.innerWidth * 0.75} canvasHeight={window.innerHeight * 0.75} disabled={true}/>
            <p>User: {userName} | Room: {room}</p>
            <p>Points For Word: {userName} | Current Points: {points}</p>
            <input type="text" placeholder="Your Guess" className="guess-input" onChange={(e) => setGuess(e.target.value)}/>
            <button className="button" onClick={sendGuessResult}>Send Guess</button>
            <button className="button" onClick={loadDrawingReplay}>Replay Animation</button>
        </div>
    )
}

export default GuessingPage;