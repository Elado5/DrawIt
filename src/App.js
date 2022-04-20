import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/App.css';
import WelcomePage from './pages/WelcomePage';
import WaitingPage from './pages/WaitingPage';
import WordChoicePage from './pages/WordChoicePage';
import DrawingPage from './pages/DrawingPage';
import GuessingPage from './pages/GuessingPage';

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={WelcomePage}></Route>
        <Route path="/waiting" component={WaitingPage}></Route>
        <Route path="/choice" component={WordChoicePage}></Route>
        <Route path="/drawing" component={DrawingPage}></Route>
        <Route path="/guessing" component={GuessingPage}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
