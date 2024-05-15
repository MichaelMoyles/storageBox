import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import reactLogo from '../assets/react.svg'
import '../App.css'
import axios from "axios";
import Cookies from "js-cookie";

function SignIn() {
  const navigate = useNavigate();
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleSignIn = async () => {
    const signInUsingAccount = async () => {
      setIsSigningIn(true);

      const variables = {
          emailAddress: signInEmail,
          password: signInPassword,
      };

      try {
        axios.post("http://localhost:8082/signin", { variables }).then((response) => {
        
          const token = response.data.authenticate;
          if (token === "Incorrect email address or password: Bad credentials") {
            alert(
              "Incorrect email address or password. Please enter the correct email address and password or sign up for an account."
            );
            setIsSigningIn(false);
          } else {
            localStorage.setItem("user", token);
            console.log(token);
            Cookies.set("user", token, { expires: 7, secure: true }); // Store the cookies
            console.log("saved cookies when signin in", Cookies.get("user"));
            setIsSigningIn(false);

            setTimeout(() => {
              // get the redirect path stored in session storage
              const redirectPath = sessionStorage.getItem("redirectAfterLogin");
              // if it exists, navigate to it, otherwise navigate to '/generation'
              navigate(redirectPath || "/");
              // then remove the redirect path from session storage
              sessionStorage.removeItem("redirectAfterLogin");
            }, 1000);
          }
        });
      } catch (error) {
          // Handle error
          console.error("Error during sign in:", error);
          setIsSigningIn(false);
        }
    };

    const token = localStorage.getItem("user");
    if (!token) {
      signInUsingAccount();
    }
  };

  return (
    <div>
      <a href="/">
        <img src={reactLogo} alt="Logo"/>
      </a>
      <div id="sign-in-button">
        <h2>Sign In</h2>
        <p>If you already have an account:</p>
        <input
          type="email"
          placeholder="E-Mail Address"
          className="text-input"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="text-input"
          value={signInPassword}
          onChange={(e) => setSignInPassword(e.target.value)}
          required
        />
        {isSigningIn ? (
          <button className="primary-button" disabled>
            Loading..
          </button>
        ) : (
          <button className="primary-button" onClick={handleSignIn}>
            Sign-In
          </button>
        )}
      </div>
      <div id="sign-up-button">
        <p>Don't have an account?</p>
        <button
          className="primary-button"
          onClick={handleSignupClick}
        >
          Sign Up Here
        </button>
      </div>
    </div>
  );
}

export default SignIn
