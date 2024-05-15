import { useState, useContext } from 'react'
import {
  Router,
  Route,
} from "react-router-dom";
import './App.css'
import SignIn from './pages/SignIn'
import { AuthContext } from "./AuthContext";

function App() {
  const authContext = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<SignIn />} />
      )}
    </Router>
  )
}

export default App
