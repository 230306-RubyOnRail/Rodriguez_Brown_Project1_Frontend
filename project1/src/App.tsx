import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';
import { User } from './models/user';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReimbursementList from './components/ReimbursementList';
import Nav from './components/Nav';
import ReimbursementCreate from './components/ReimbursementCreate';
import UserList from './components/UserList';


function App() {

const [principal, setPrincipal] = useState<User>();

  return (
    <div className="App">
      <BrowserRouter>
      <Nav currentUser={principal}/>
      <Routes>
        <Route path='/login' element={<Login currentUser={principal} setCurrentUser={setPrincipal}/>}/>
        <Route path='/' element={<Dashboard currentUser={principal}/>}/>
        <Route path='/reimbursements' element={<ReimbursementList currentUser={principal}/>}/>
        <Route path='/reimbursements/create' element={<ReimbursementCreate currentUser={principal}/>}/>
        <Route path='/users' element={<UserList currentUser={principal}/>}/>
        <Route path='/users/create' element={<UserList currentUser={principal}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
