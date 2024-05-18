import React, { useState, useEffect } from "react";
import axios from "axios";
// Create a context for managing authentication
export const AuthContext = React.createContext();

const AuthContextProvider = props => {
// State to store the active user
  const [activeUser, setActiveUser] = useState({})
  // State to manage the Axios configuration
  const [config, setConfig] = useState({
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  })

// Effect to check if the user is authenticated when the component mount
  useEffect(() => {

    const controlAuth = async () => {
      try {
        const { data } = await axios.get("/auth/private", config);
        setActiveUser(data.user)
      }
      catch (error) {

        localStorage.removeItem("authToken");

        setActiveUser({})
      }
    };
    controlAuth()

  }, [])
 // Provide the active user and config to the components
  return (
    <AuthContext.Provider value={{ activeUser, setActiveUser, config, setConfig }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
