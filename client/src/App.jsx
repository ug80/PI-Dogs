import React from 'react';
import { Route, Routes} from 'react-router-dom';
import {Home, Landing, Create, Detail} from './Views';
import { useLocation } from 'react-router-dom';
import './App.css'
import NavBar from './Components/NavBar/NavBar';

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/' && <NavBar/>}
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/detail/:id' element={<Detail/>} />
        <Route path='/create' element={<Create/>} />
      </Routes>
      
    </div>
  )
}

export default App
