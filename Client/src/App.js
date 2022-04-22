import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './styles/App.css';
import WelcomePage from './pages/WelcomePage';
import WaitingPage from './pages/WaitingPage';
import WordChoicePage from './pages/WordChoicePage';
import DrawingPage from './pages/DrawingPage';
import GuessingPage from './pages/GuessingPage';

import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App () {

  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [points, setPoints] = useState(0);
  const [playerNumber, setPlayerNumber] = useState(0); //? 0 = not playing, 1 = player1, 2 = player2
  const [currPage, setCurrPage] = useState("");

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room);
    }
    console.log('session storage Player Number: ', sessionStorage.getItem('playerNumber'))
    console.log('playerNumber', playerNumber)
  };

  const addPoints = (amount) => {
    setPoints(points + amount);
    console.log('new score: ', points )
  }

  useEffect(() => {
    socket.on("receive_number", (data)=> {
      console.log('receive_number data => ', data);
      if(playerNumber === 0){
      setPlayerNumber(data);
      }
    })

    return (console.log('released receive number'));
  }, [])

  return (
    <div className="app">
      <Router forceRefresh={false}>
        <Routes>
          <Route path="/" element={<WelcomePage socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} joinRoom={joinRoom} />} exact />
          <Route path="/waiting" element={<WaitingPage socket={socket} playerNumber={playerNumber} />} />
          <Route path="/choice" element={<WordChoicePage socket={socket}/>} />
          <Route path="/drawing" element={<DrawingPage socket={socket} room={room} userName={userName} points={points} addPoints={addPoints} playerNumber={playerNumber}/>} />
          <Route path="/guessing" element={<GuessingPage socket={socket} room={room} userName={userName} points={points} addPoints={addPoints} playerNumber={playerNumber}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
