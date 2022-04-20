import React, {useState ,useEffect, useRef}  from 'react';
import {Link, useLocation} from 'react-router-dom';
import CanvasDraw from "react-canvas-draw";

const DrawingPage = () => {

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
    return(
        <div className="drawing-page">
            <CanvasDraw ref={canvasRef} className="canvas" canvasWidth={window.innerWidth*0.75} canvasHeight={window.innerHeight*0.75}/>
            <button className="button" onClick={clearHandler}>Clear</button>
            <button className="button" onClick={saveHandler}>Save</button>
            <button className="button" onClick={loadHandler}>Load</button>
            <Link to={'/waiting'}><button className="button">Send</button></Link>
        </div>
    )
}

export default DrawingPage;