import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputTextBox from './InputTextBox';
import DividerText from './DividerText/DividerText.js'
import SubmitBtn from './SubmitBtn/SubmitBtn';
import { auth } from '../data/data'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const loginRemote = async () => {
    const response = await fetch('https://localhost:7007/api/Users/Login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        nickname: ''
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    const data = await response.json();
    return data.statusCode === 200;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      navigate('/chat', { state: { username: username} });
    }
  }, [errors])

  const validate = () => {
    var regexNumber = /\d/g;
    var regexLetter = /[a-zA-Z]/g;
    const errors = {};
    if (!username) {
      errors.username = "Username is reuired!";
    }
    if (!password || !regexNumber.test(password) || !regexLetter.test(password)) {
      errors.password = "Password must be non empty and contain a character and a letter!";
    }
    if (Object.keys(errors).length === 0) {
      if (!loginRemote() || !auth(username, password)) {
        errors.password = "Sorry, username and/or password do not exist!";
      }
    }
    return errors;
  }

  return (
    <form id="loginform" className="row g-3 box" onSubmit={handleSubmit}>
      <DividerText text="Welcome to BorisChats"/>
      <InputTextBox type="text" id="username" placeholder="Username" possibleError={errors.username} setValue={setUsername}/>
      <InputTextBox type="password" id="pasword" placeholder="Password" possibleError={errors.password} setValue={setPassword}/>
        <SubmitBtn text="LOGIN"></SubmitBtn>
      <br></br>
      <div
        className="d-flex justify-content-center"
        id="switchBtn">
        Don't have an account?&nbsp;
        <Link
          className="link-danger"
          to="/signup">
          Register
        </Link>
      </div>
    </form>
  );
}


export default Login;