import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefreshHandler from './RefreshHandler';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" /> 
  }

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />}/>} />
        <Route path='/profile' element={<PrivateRoute element={<Profile />}/>} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>} />
        <Route path='/schedule' element={<PrivateRoute element={<Schedule/>}/>} />
      </Routes>
    </div>
  );
}

export default App;
