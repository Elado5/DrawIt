import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  const joinRoom = () => {
    if (userName !== "" && room !== "") {

      socket.emit("join_room", room);

    }
  };

  return (
    <div className="app">
      <Router forceRefresh={false}>
        <Routes>
          <Route path="/" element={<WelcomePage socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} joinRoom={joinRoom} />} exact />
          <Route path="/waiting" element={<WaitingPage />} />
          <Route path="/choice" element={<WordChoicePage />} />
          <Route path="/drawing" element={<DrawingPage socket={socket} />} />
          <Route path="/guessing" element={<GuessingPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
