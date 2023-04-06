import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import { User } from './models/user';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

const [principal, setPrincipal] = useState<User>();

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>}/>
        <Route path='/' element={<Dashboard currentUser={principal}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
