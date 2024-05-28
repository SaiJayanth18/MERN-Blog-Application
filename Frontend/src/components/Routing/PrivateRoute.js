import { useEffect,useState,useContext } from 'react';
import {Outlet, useNavigate} from 'react-router-dom'
import Home from '../GeneralScreens/Home';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";

const PrivateRoute =( ) => {
     // Check if authToken is present in localStorage
    const bool =localStorage.getItem("authToken") ? true :false
    // Set initial authentication state based on authToken presence
    const [auth ,setAuth] =useState(bool)
    const [error ,setError] =useState("")
    const navigate = useNavigate()
    const {setActiveUser,setConfig } = useContext(AuthContext)

    useEffect(() => {

       const controlAuth = async () => {
         // Define headers with authorization token
        const config = {
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        try {
            const { data } = await axios.get("/auth/private", config); 
// If request is successful, set authentication state, user data, and config
            setAuth(true)
            setActiveUser(data.user)
            setConfig(config)

        } 
        catch (error) {
 // If there's an error, clear authToken, reset state, and navigate to home page
            localStorage.removeItem("authToken");

            setAuth(false)
            setActiveUser({})

            navigate("/")

            setError("You are not authorized please login"); 
        }
        };
 // Call the controlAuth function
        controlAuth()
    }, [bool,navigate])

// Render Outlet (child routes) if authenticated, otherwise render Home component with an error message
    return (auth ? <Outlet />  : <Home error={error} />)
}

export default PrivateRoute;
