import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../Css/ForgotPassword.css"
import { BsArrowBarLeft } from 'react-icons/bs'
// This component renders a page where users can request a password reset link by providing their registered email address.
const ForgotPasswordScreen = () => {
  // Define state variables for email, error, and success messages.
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
// Function to handle the form submission for requesting a password reset.
  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the server's "/auth/forgotpassword" endpoint with the provided email.
      const { data } = await axios.post(
        "/auth/forgotpassword",
        { email }
      );
// If successful, set the success message.
      setSuccess(data.message);
    } catch (error) {
      // If an error occurs, set the error message, clear the email field, and clear the error after 5 seconds.
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="Inclusive-forgotPassword-page">

      <div className="forgotPassword-big-wrapper">
        <Link to="/" className="back_home">
          <BsArrowBarLeft />
        </Link>
        <form
          onSubmit={forgotPasswordHandler}
        >
          <div className="top-forgotpassword-explain">
            <h3 >Forgot Password</h3>
            <p >
              Please enter the registered email address, reset password confirmation message will be sent to this email
            </p>
          </div>

          {error && <div className="error_message">{error}</div>}
          {success && <div className="success_message  ">{success}  -
            <Link to="/" className="ml-3">Go home</Link></div>}

          <div className="input-wrapper">

            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">E-mail</label>

          </div>

          <button type="submit">
            Email Sent
          </button>

        </form>

      </div>

    </div>

  );
};

export default ForgotPasswordScreen;