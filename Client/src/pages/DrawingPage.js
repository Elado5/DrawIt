import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";

const DrawingPage = ({ socket, room , userName , points, addPoints}) => {

    const canvasRef = useRef(null);
    const location = useLocation();
    const pointsForWord = location.state?.pointsForWord;
    const word = location.state?.word;
    console.log('location.state', location.state)
    // if(!pointsForWord){
    //     document.location.href = '/';
    // }

    const saveHandler = () => {
        sessionStorage.setItem('drawingSave', canvasRef.current.getSaveData());
    }

    const loadHandler = () => {
        if (sessionStorage.getItem('drawingSave')) {
            canvasRef.current.loadSaveData(sessionStorage.getItem('drawingSave'), false);
        }
    }

    const clearHandler = () => {
        canvasRef.current.clear();
    }

    const sendDrawing = () => {
        //socket.emit("send_drawing", { drawing: "drawing" });
        socket.emit("send_drawing", {drawing: canvasRef.current.getSaveData(), room: room, word: word, pointsForWord: pointsForWord});
    }

    useEffect(() => {

        socket.on("receive_guess_result", (data) => {
            console.log('data', data)
            if(data.correct){
                //TODO success screen and move
                addPoints(pointsForWord);
            }
            else{
                //TODO fail screen and move
                alert("Failed");
            }
        })
    }, [socket])

    return (
        <div className="drawing-page">
            <CanvasDraw ref={canvasRef} className="canvas" canvasWidth={window.innerWidth * 0.75} canvasHeight={window.innerHeight * 0.75} />
            <p>Word To Draw: {word} |  Current Points: {points}</p>
            <p>User: {userName} | Room: {room}</p>
            <button className="button" onClick={clearHandler}>Clear</button>
            <button className="button" onClick={saveHandler}>Save</button>
            <button className="button" onClick={loadHandler}>Load</button>
            <button className="button" onClick={sendDrawing}>Send</button>
        </div>
    )
}

export default DrawingPage;