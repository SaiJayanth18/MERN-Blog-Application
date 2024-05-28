import { useState } from "react";
import axios from "axios";
import "../../Css/Login.css"
import { Link, useNavigate } from "react-router-dom";
// Component for rendering a login page with form for email and password input
const LoginScreen = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

// Function to handle form submission when user tries to log in
  const loginHandler = async (e) => {
    e.preventDefault();// Prevents default form submission behavior


    try {
       // Send a POST request to the server for user authentication
      const { data } = await axios.post(
        "/auth/login",
        { email, password }// Include email and password in the request body
      );
      // Store authentication token in local storage for future requests
      localStorage.setItem("authToken", data.token);

// Redirect user to home page after a short delay
      setTimeout(() => {

        navigate("/")

      }, 1800)

    } catch (error) {
       // Handle authentication error by displaying error message
      setError(error.response.data.error);
       // Clear the error message after a short delay
      setTimeout(() => {
        setError("");
      }, 4500);

    }
  };

  return (

    <div className="Inclusive-login-page">

      <div className="login-big-wrapper">

        <div className="section-wrapper">

          <div className="top-suggest_register">

            <span>Don't have an account? </span>
            <a href="/register">Sign Up</a>

          </div>

          <div className="top-login-explain">
            <h2>Login to your Account </h2>

            <p>
              Please Login to your Account, Thank You!
            </p>


          </div>


          <form onSubmit={loginHandler} >
            {error && <div className="error_message">{error}</div>}
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
            <Link to="/forgotpassword" className="login-screen__forgotpassword"> Forgot Password ?
            </Link>
            <button type="submit" >
              Login
            </button>

          </form>


        </div>

        <div className="login-banner-section ">

          <img src="login.jpeg" alt="banner" width="400px" />
        </div>

      </div>


    </div>


  );
};

export default LoginScreen;