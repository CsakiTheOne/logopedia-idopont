import LoginPage from "./pages/LoginPage";
import MainPage from './pages/MainPage';
import { addOnAuthStateChangedListener } from "./firebase/auth";
import { useEffect, useState } from "react";
import { userIsAdmin } from "./firebase/firestore";
import AdminPage from "./pages/AdminPage";

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

  if (user) {
    if (isAdmin) return <AdminPage />;
    else return <MainPage />;
  }
  else {
    return <LoginPage />;
  }
}

export default App;
