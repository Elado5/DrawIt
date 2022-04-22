import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";

const DrawingPage = ({ socket, room , userName}) => {

    const canvasRef = useRef(null);
    const location = useLocation();
    const points = location.state?.points;
    const word = location.state?.word;
    console.log('location.state', location.state)
    // if(!points){
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
        socket.emit("send_drawing", {drawing: canvasRef.current.getSaveData(), room: room});
    }

    useEffect(() => {
        // socket.on("receive_drawing", (data) => {
        //     alert(data.drawing);
        // })
        socket.on("receive_drawing", (data) => {
            sessionStorage.setItem('drawingSave', data.drawing); //get saved drawing data from playmate
        })
    }, [socket])

    return (
        <div className="drawing-page">
            <CanvasDraw ref={canvasRef} className="canvas" canvasWidth={window.innerWidth * 0.75} canvasHeight={window.innerHeight * 0.75} />
            <p>User: {userName} Room: {room}</p>
            <p>Word to draw: {word}</p>
            <p>Points for word: {points}</p>
            <button className="button" onClick={clearHandler}>Clear</button>
            <button className="button" onClick={saveHandler}>Save</button>
            <button className="button" onClick={loadHandler}>Load</button>
            <button className="button" onClick={sendDrawing}>Send</button>
        </div>
    )
}

export default DrawingPage;