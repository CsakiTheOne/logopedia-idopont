import LoginPage from "./pages/LoginPage";
import MainPage from './pages/MainPage';
import { addOnAuthStateChangedListener } from "./firebase/auth";
import { useEffect, useState } from "react";
import { userIsAdmin } from "./firebase/firestore";
import AdminPage from "./pages/AdminPage";
import { colorScheme } from './theme/theme';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    addOnAuthStateChangedListener(newUser => {
      setIsAdmin(false);
      setUser(newUser);
      userIsAdmin(result => setIsAdmin(result));
    });
  }, []);

  document.body.style.backgroundColor = colorScheme.background;
  document.body.style.color = colorScheme.onBackground;

  return <>
    {
      user
        ? (
          isAdmin
            ? <AdminPage />
            : <MainPage />
        )
        : <LoginPage />
    }
  </>
}

export default App;
