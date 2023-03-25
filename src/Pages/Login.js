import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../CSS/Login.css';
import Footer from '../Components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function Login() {
  const Navigate = useNavigate();
  const cookie = new Cookies();

  const [lformValues, setLFormValues] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLFormValues(prevValue => {
      return {
        ...prevValue,
        [name]: value
      }
    });
  }

  const handleLogIn = (e) => {
    e.preventDefault();
    if (lformValues.email !== "" && lformValues.password !== "") {
      axios.post('https://rs-flixbackend.onrender.com/login', lformValues)
        .then((response) => {
          let status = response.status;
          if (status === 200) {
            toast.success("Successfully Logged-In");
            cookie.set("jwtToken", response.data.token, {maxAge: 5*24*60*60});
            setTimeout(() => { Navigate('/netflixintro'); }, 2000);
          }
        })
        .catch((err) => {
          if (err) {
            let status = err.response.status;
            // message = err.response.data.message;
            if (status === 503) {
              toast.error("The server is down, Please try again later");
            }
            else if (status === 404) {
              toast.error("No E-Mail registered with your entered E-Mail");
            }
            else {
              toast.error("Invalid Password");
            }
          }
        });
    }
    else {
      if (lformValues.email === "") {
        toast.warn("Please Enter your E-Mail");
      }
      if (lformValues.password === "") {
        toast.warn("Please Enter your Password");
      }
    }
  };

  return (
    <div className='logincontainer'>
      <div className='login'>

        <div className="ltop">
          <div className="limageContainer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/330px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
          </div>
        </div>

        <div className='lmainContainer'>
          <div className='lform'>
            <h1>Login</h1>
            <input type="email" placeholder='Email-Addres' name='email' value={lformValues.email} onChange={handleChange} autoComplete='off' />
            <input type="password" placeholder='Password' name='password' value={lformValues.password} onChange={handleChange} />
            <button onClick={handleLogIn} className="loginButton">Login</button>
            <div className='remember'><input type="checkbox" className='checkbox' defaultChecked /><p>Remember me</p></div>
            <span>New to Netflix? <b onClick={() => Navigate('/')}>Sign up now.</b></span>
            <small>This page is protected by Google reCAPTCHA to ensure you're not a bot. <b><Link to='https://www.google.com/recaptcha/about/'>Learn more.</Link></b></small>
          </div>
        </div>
        <Footer isBottom={true} />
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default Login;