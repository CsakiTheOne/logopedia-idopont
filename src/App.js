import LoginPage from './pages/LoginPage';
import MainPage from './pages/user/MainPage';
import { addOnAuthStateChangedListener } from './firebase/auth';
import { useEffect, useState } from 'react';
import { userIsAdmin } from './firebase/firestore';
import AdminPage from './pages/admin/AdminPage';
import BookingPage from './pages/user/BookingPage';
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  function onAuthChanged(user) {
    console.log('onAuthChanged: ' + user);
    userIsAdmin(isAdmin => {
      if (user) {
        if (isAdmin) navigate('/admin');
        else navigate('/');
      }
      else {
        navigate('/login');
      }
    });
  }

  useEffect(() => {
    addOnAuthStateChangedListener(onAuthChanged);
  }, []);

  return <Routes>
    <Route path='/' element={<MainPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/admin' element={<AdminPage />} />
    <Route path='/booking' element={<BookingPage />} />
  </Routes>;
}

export default App;
