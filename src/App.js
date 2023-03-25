import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Netflix from './Pages/Netflix';
import NetflixIntro from './Pages/NetflixIntro';
import Favourites from './Pages/Favourites';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<Signup />} />
          <Route exact path='/netflixintro' element={<NetflixIntro />} />
          <Route exact path='/home' element={<Netflix />} />
          <Route exact path='/favourites' element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// This needs to be outside in src folder