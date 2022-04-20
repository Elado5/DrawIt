import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
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
    <BrowserRouter forceRefresh={false}>
      <Route exact path="/">
        <WelcomePage socket={socket} userName={userName} setUserName={setUserName} room={room} setRoom={setRoom} joinRoom={joinRoom}/>
      </Route>
      <Route path="/waiting" component={WaitingPage}></Route>
      <Route path="/choice" component={WordChoicePage}></Route>
      <Route path="/drawing" component={DrawingPage}></Route>
      <Route path="/guessing" component={GuessingPage}></Route>
    </BrowserRouter>
  );
}

export default App;
