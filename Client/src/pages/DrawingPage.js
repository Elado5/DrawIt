import React, {useState ,useEffect, useRef}  from 'react';
import {Link, useLocation} from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";

const DrawingPage = ({socket}) => {

    const canvasRef = useRef(null);
    const location = useLocation();
    const points = location.state?.points;

    console.log('points', points)
    // if(!points){
    //     document.location.href = '/';
    // }

    const saveHandler = () => {
        localStorage.setItem('drawingSave', canvasRef.current.getSaveData());
    }

    const loadHandler = () => {
        if(localStorage.getItem('drawingSave')){
            canvasRef.current.loadSaveData(localStorage.getItem('drawingSave'), false);
        }
    }

    const clearHandler = () => {
        canvasRef.current.clear();
    }

    const sendDrawing = () => {
        socket.emit("send_drawing", {drawing: "drawing"});
      }
    
      useEffect (() => {
        socket.on("receive_drawing", (data) => {
          alert(data.drawing);
        })
      }, [socket])

    return(
        <div className="drawing-page">
            <CanvasDraw ref={canvasRef} className="canvas" canvasWidth={window.innerWidth*0.75} canvasHeight={window.innerHeight*0.75}/>
            <button className="button" onClick={clearHandler}>Clear</button>
            <button className="button" onClick={saveHandler}>Save</button>
            <button className="button" onClick={loadHandler}>Load</button>
            <button className="button" onClick={sendDrawing}>Send</button>
        </div>
    )
}

export default DrawingPage;