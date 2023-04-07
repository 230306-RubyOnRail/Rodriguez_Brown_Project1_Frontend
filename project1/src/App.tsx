import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import { User } from './models/user';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Reimbursement } from './models/reimbursement';
import ReimbursementShow from './components/Reimbursement_Show';


function App() {

const [principal, setPrincipal] = useState<User>();

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>}/>
        <Route path='/' element={<Dashboard currentUser={principal}/>}/>
        <Route path='/reimbursements' element={<ReimbursementShow currentUser={principal}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
