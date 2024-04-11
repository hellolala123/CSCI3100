import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Homepage from './components/Homepage';

import AddTweetModal from './components/AddTweetModal';
import UserManagement from './components/UserManagement';
import UserProfile from './components/UserProfile';
import Navigation from './components/Navigation';
// other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addtweetmodal" element={<AddTweetModal />} />
        <Route path="/usermanagement" element={<UserManagement />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/navigation" element={<Navigation />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;
