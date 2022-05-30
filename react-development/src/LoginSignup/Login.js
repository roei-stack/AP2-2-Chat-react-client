import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputTextBox from './InputTextBox';
import DividerText from './DividerText/DividerText.js'
import SubmitBtn from './SubmitBtn/SubmitBtn';
import * as U from '../data/data'

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate());
  };

  useEffect(() => {
    if (status === 0) {
      return;
    }
    if (status === 200) {
      navigate('/chat', { state: { username: username, password: password } });
    } else {
      setErrors({password: 'sorry, wrong username/password'})
      setStatus(0)
    }
  }, [status]);


  const loginRemote = async () => {
    const response = await fetch(U.API_URL + '/api/Users/Login', {
      method: 'POST',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).catch((e) => console.log(e))
    setStatus(response.status)
  }

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
      loginRemote();
    }
    return errors;
  }

  return (
    <form id="loginform" className="row g-3 box" onSubmit={handleSubmit}>
      <DividerText text="Welcome to BorisChats" />
      <InputTextBox type="text" id="username" placeholder="Username" possibleError={errors.username} setValue={setUsername} />
      <InputTextBox type="password" id="pasword" placeholder="Password" possibleError={errors.password} setValue={setPassword} />
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