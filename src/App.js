import LoginPage from "./pages/LoginPage";

const user = null;

function App() {
  if (user) {
    return <p>Logged in</p>;
  }
  else {
    return <LoginPage/>;
  }
}

export default App;
