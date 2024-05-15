import React, { createContext, useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userID, setUserID] = useState("");
    const [userEmailAddress, setUserEmailAddress] = useState("");
    const [token, setToken] = useState(""); //const a token 
    const navigate = useNavigate(); 
    const location = useLocation();
    let signinEndpoint = "http://localhost:8082/signin";

    const login = () => {
        setIsAuthenticated(true);
        navigate('/');
    };

    const logout=() =>{
        setIsAuthenticated(false);
        setUserID("");
        setToken("");
        localStorage.removeItem('user');
        navigate('/sigin');
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            //authorization is true
            const bearerToken = localStorage.getItem('user');
            setToken(bearerToken);

            const variables = {
                bearerToken: bearerToken,
            }
      
            axios.post(signinEndpoint, { variables })
            .then(response => response.json()) // Convert the response to JSON
            .then(data => {
                setIsAuthenticated(true);
                setUserID(data.data.currentUser.userID); // Access the userID from the data
                setUserEmailAddress(data.data.currentUser.emailAddress);
            })
            .catch(error => {
                console.log("error:", error);
                // check if it's an expiry error
                if (error == "TypeError: Cannot read properties of null (reading 'userID')") {
                    setIsAuthenticated(false);
                    localStorage.removeItem('user'); 
                    setIsAuthenticated(false);
                    setUserID("");
                    setToken("");
                    setUserEmailAddress("");
                    alert("Your session has expired. Please log in again."); // Notify user
                    // save the current path to redirect back to it after login
                    sessionStorage.setItem('redirectAfterLogin', location.pathname);
                    navigate('/signin'); // Navigate to login page
                } else {
                    console.log(error);
                }
            });
        }
    }, [navigate,location]); // <-- Add navigate as a dependency

    useEffect(() => {
        // log the updated userID value
        // userID.json().then(data => console.log(data));
    }, [userID]);    

    return (
        <AuthContext.Provider value={{ isAuthenticated, login , logout, userID, token, userEmailAddress}}>
            {children}
        </AuthContext.Provider>
    );
};