import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Css/Register.css"
// Component for rendering a registration form
const RegisterScreen = () => {
  // State variables for username, email, password, confirm password, and error message
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();// Function for navigation

// Function to handle form submission when user tries to register
  const registerHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      // Clear password fields and set an error message if passwords do not match
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }

    try {
      // Send a POST request to the server for user registration
      const { data } = await axios.post(
        "/auth/register",
        {
          username,
          email,
          password,
        }
      );
// Store authentication token in local storage for future requests
      localStorage.setItem("authToken", data.token);
 // Redirect user to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1800)

    } catch (error) {
// Handle registration error by displaying error message
      setError(error.response.data.error);
// Clear the error message after a short delay
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (

    <div className="Inclusive-register-page">

      <div className="register-big-wrapper">


        <div className="register-banner-section ">

          <img src="register.png" alt="banner" width="490px" />
        </div>

        <div className="section-wrapper">

          <div className="top-suggest_login">
            <span> Have an account? </span>
            <a href="/login">Sign In</a>
          </div>

          <div className="top-register-explain">
            <h2>Create your Account</h2>

            <p>
              Post your thougths and opinions to engage with readers around the world!

            </p>


          </div>


          <form onSubmit={registerHandler} >
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="name"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="name">Username</label>

            </div>
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="Example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>


            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password

              </label>
            </div>
            <div className="input-wrapper">

              <input
                type="password"
                required
                id="confirmpassword"
                autoComplete="true"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>

            <button type="submit" >
              Register
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default RegisterScreen;