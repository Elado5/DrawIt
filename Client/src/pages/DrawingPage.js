import React, {useState ,useEffect, useRef}  from 'react';
import {Link, useLocation} from 'react-router-dom';

const DrawingPage = () => {

    const location = useLocation();
    const points = location.state?.points;

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    console.log('points', points)
    // if(!points){
    //     document.location.href = '/';
    // }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth /2;
        canvas.height = window.innerHeight/2;
        canvas.style.width = `${window.innerWidth/2}px`;
        canvas.style.height = `${window.innerHeight/2}px`;

        const context = canvas.getContext("2d");
        context.scale(1,1);
        context.lineCap = "round";
        context.StrokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;

        contextRef.current = context;
    }, [])

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };
    const Draw = ({nativeEvent}) => {
        if(!isDrawing){
            return;
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };
    const endDrawing = () => {
        setIsDrawing(false);
    };

    const saveCanvas = () => {
        let canvasDrawing = canvasRef.current.toDataURL();
        let data = {image: canvasDrawing};
        let string = JSON.stringify(data);

        console.log('data ', data);
        console.log('string ', string)
    }

    return(
        <div className="drawing-page">
            <canvas className="canvas"
            onMouseDown={startDrawing}
            onMouseMove={Draw}
            onMouseUp={endDrawing}
            onTouchStart={''}
            onTouchMove={''}
            onTouchEnd={''}
            ref={canvasRef}
            />
            <button onClick={saveCanvas}>Save</button>
            <Link to={'/waiting'}><button>Send</button></Link>
        </div>
    )
}

export default DrawingPage;