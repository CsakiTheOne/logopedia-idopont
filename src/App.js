import LoginPage from "./pages/LoginPage";
import MainPage from './pages/MainPage';
import { addOnAuthStateChangedListener } from "./firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    addOnAuthStateChangedListener(newUser => {
      setUser(newUser);
    });
  }, []);

  if (user) {
    return <MainPage />;
  }
  else {
    return <LoginPage />;
  }
}

export default App;
