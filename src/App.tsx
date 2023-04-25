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
import React from 'react';
import { User } from 'firebase/auth';
import EditWorkPage from './pages/admin/EditWorkPage';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    function onAuthChanged(user: User | null) {
      console.log('onAuthChanged: ' + user);
      userIsAdmin(isAdmin => {
        if (user) {
          if (isAdmin) navigate('/admin');
          else navigate('/');
        }
        else {
          navigate('/');
        }
      });
    }

    addOnAuthStateChangedListener(onAuthChanged);
  }, [navigate]);

  return <Routes>
    <Route index element={<MainPage />} />
    <Route path='/booking' element={<BookingPage />} />
    <Route path='/admin' element={<AdminPage />} />
    <Route path='/works/edit/:workTitle' element={<EditWorkPage />} />
  </Routes>;
}

export default App;
