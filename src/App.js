import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import { addOnAuthStateChangedListener } from './firebase/auth';
import { useEffect, useState } from 'react';
import { userIsAdmin } from './firebase/firestore';
import AdminPage from './pages/AdminPage';
import BookingPage from './pages/BookingPage';
import {
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    addOnAuthStateChangedListener(newUser => {
      setIsAdmin(false);
      setUser(newUser);
      userIsAdmin(result => setIsAdmin(result));
    });
  }, []);

  useEffect(() => {
    if (user) {
      if (isAdmin) navigate('/admin');
      else navigate('/');
    }
    else {
      navigate('/login');
    }
  }, [navigate, user, isAdmin])

  return <Routes>
    <Route path='/' element={<MainPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/admin' element={<AdminPage />} />
    <Route path='/booking' element={<BookingPage />} />
  </Routes>;
}

export default App;
